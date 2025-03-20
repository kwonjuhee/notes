"use client";

import {
  drag,
  extent,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  select,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
  zoom,
  zoomIdentity,
} from "d3";
import { useEffect, useRef } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import styles from "./LinksGraph.module.css";

export interface LinksGraphProps {
  width?: number;
  height?: number;
  data: {
    nodes: Node[];
    links: Link[];
  };
}

interface Node extends SimulationNodeDatum {
  id: string;
  label?: string;
}

interface Link extends SimulationLinkDatum<Node> {}

export const LinksGraph = ({ width, height, data }: LinksGraphProps) => {
  const container = useRef<SVGSVGElement>(null); // SVGElement ???
  const simulationRef = useRef<Simulation<Node, undefined>>();

  useResizeObserver<SVGSVGElement>({
    ref: container,
    onResize: (size) => {
      if (simulationRef.current && size.width && size.height) {
        simulationRef.current
          .force("center", forceCenter(size.width / 2, size.height / 2))
          .restart();
      }
    },
  });

  useEffect(
    function initializeLinksGraph() {
      if (container.current) {
        const nodes = data.nodes.map((d) => ({ ...d }));

        const links = data.links.map((d) => ({
          source: nodes.find((n) => n.id === d.source)!,
          target: nodes.find((n) => n.id === d.target)!,
        }));

        const svg = select<SVGSVGElement, null>(container.current)
          .attr("width", width ?? "100%")
          .attr("height", height ?? "100%");

        const link = svg
          .append("g")
          .selectAll<SVGLineElement, Link>("line")
          .data(links)
          .join("line")
          .attr("data-source-id", (d) => d.source.id)
          .attr("data-target-id", (d) => d.target.id)
          .attr("data-id", (d) => `${d.source.id}-${d.target.id}`)
          .attr("class", styles.link);

        const nodeGroup = svg //
          .append("g")
          .selectAll("g")
          .data(nodes)
          .enter()
          .append("g")
          .attr("data-id", (d) => d.id)
          .attr("class", styles.node);

        const circle = nodeGroup.append("circle").attr("r", 5).attr("class", styles.circle);

        const label = nodeGroup
          .append("text")
          .text((d) => d.label ?? d.id)
          .attr("dy", 15)
          .attr("class", styles.label);

        const size = container.current.getBoundingClientRect();
        const simulation = forceSimulation<Node>(nodes)
          .force(
            "link",
            forceLink<Node, Link>(links).id((d) => d.id)
          )
          .force("charge", forceManyBody().strength(-100))
          .force("center", forceCenter((width ?? size.width) / 2, (height ?? size.height) / 2))
          .force("collide", forceCollide().radius(40))
          .force("x", forceX())
          .force("y", forceY())
          .on("tick", () => {
            link
              .attr("x1", (d) => d.source.x ?? null)
              .attr("y1", (d) => d.source.y ?? null)
              .attr("x2", (d) => d.target.x ?? null)
              .attr("y2", (d) => d.target.y ?? null);
            circle.attr("cx", (d) => d.x ?? null).attr("cy", (d) => d.y ?? null);
            label.attr("x", (d) => d.x ?? null).attr("y", (d) => d.y ?? null);
          });
        simulationRef.current = simulation;

        /** zoom */
        const zoomer = zoom<SVGSVGElement, null>()
          .scaleExtent([0.1, 10])
          .on("zoom", ({ transform }) => {
            link.attr("transform", transform);
            nodeGroup.attr("transform", transform);
          });

        svg.call(zoomer);

        simulation.tick(100);

        const xExtent = extent(nodeGroup.data(), (d) => d.x);
        const yExtent = extent(nodeGroup.data(), (d) => d.y);

        const xScale = (width ?? size.width) / ((xExtent[1]! - xExtent[0]!) / 0.8);
        const yScale = (height ?? size.height) / ((yExtent[1]! - yExtent[0]!) / 0.8);
        const minScale = Math.min(xScale, yScale);

        svg.call(
          zoomer.transform,
          zoomIdentity
            .translate((width ?? size.width) / 2, (height ?? size.height) / 2)
            .scale(Math.max(0.1, minScale))
            .translate(-(xExtent[0]! + xExtent[1]!) / 2, -(yExtent[0]! + yExtent[1]!) / 2)
        );

        /** node drag */
        nodeGroup.call(
          drag<SVGGElement, Node>()
            .on("start", (event) => {
              svg.attr("cursor", "grabbing");
              if (!event.active) simulation.alphaTarget(0.3).restart();
              event.subject.fx = event.subject.x;
              event.subject.fy = event.subject.y;
            })
            .on("drag", (event) => {
              event.subject.fx = event.x;
              event.subject.fy = event.y;
            })
            .on("end", (event) => {
              svg.attr("cursor", "auto");
              if (!event.active) simulation.alphaTarget(0);
              event.subject.fx = null;
              event.subject.fy = null;
            })
        );

        /** node mouseover/out */
        const nodeIdsMap = new Map<string, string[]>();

        link.each(({ source, target }) => {
          nodeIdsMap.set(source.id, [...(nodeIdsMap.get(source.id) ?? []), target.id]);
          nodeIdsMap.set(target.id, [...(nodeIdsMap.get(target.id) ?? []), source.id]);
        });

        nodeGroup
          .on("mouseover", function (_, d) {
            svg.attr("cursor", "pointer");

            const activeNodeIds = [d.id, ...(nodeIdsMap.get(d.id) ?? [])];
            svg
              .selectAll(
                activeNodeIds
                  .reduce((acc, id) => [...acc, `g[data-id="${id}"]`], [] as string[])
                  .join(", ")
              )
              .classed(styles.active, true);

            svg
              .selectAll(`line[data-source-id="${d.id}"], line[data-target-id="${d.id}"]`)
              .classed(styles.active, true);

            svg.selectAll(`g[data-id]:not(.${styles.active})`).classed(styles.inactive, true);
          })
          .on("mouseout", function () {
            svg.attr("cursor", "auto");

            nodeGroup.classed(styles.active, false);
            nodeGroup.classed(styles.inactive, false);

            link.classed(styles.active, false);
          });

        return () => {
          simulation.stop();
        };
      }
    },
    [data.links, data.nodes, height, width]
  );

  return <svg ref={container}></svg>;
};
