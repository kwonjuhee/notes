import React from "react";
import { CaretRight } from "@/assets/icon";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  items: Array<{ label: string }>;
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className={styles.Breadcrumb}>
      <ol className={styles.list}>
        {items.map(({ label }, i) => (
          <React.Fragment key={i}>
            <li className={styles.item}>{label}</li>
            {i < items.length - 1 && (
              <li className={styles.seperator}>
                <CaretRight width={14} height={14} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
