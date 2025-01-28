import clsx from "clsx";
import { Text } from "../Text";
import styles from "./TableOfContents.module.css";

type TOCItem = {
  id: string;
  level: number;
  text: string;
};

type NestedTOCItem = TOCItem & { childItems: NestedTOCItem[] };

const buildTOCItems = (items: TOCItem[]) => {
  const root: NestedTOCItem[] = [];
  const stack: NestedTOCItem[] = [];

  items.forEach((item) => {
    const nestedItem = { ...item, childItems: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= nestedItem.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(nestedItem);
    } else {
      stack[stack.length - 1].childItems.push(nestedItem);
    }

    stack.push(nestedItem);
  });

  return root;
};

export interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const tocItems = buildTOCItems(items);

  return (
    <nav className={styles.TableOfContents}>
      <TOCItems tocItems={tocItems} />
    </nav>
  );
};

const TOCItems = ({ tocItems }: { tocItems: NestedTOCItem[] }) => {
  return tocItems.map(({ id, level, text, childItems }, i) =>
    childItems.length > 0 ? (
      <ol key={i} className={styles.list}>
        <TOCItem id={id} level={level} text={text} />
        {childItems.length > 0 && <TOCItems tocItems={childItems} />}
      </ol>
    ) : (
      <TOCItem key={i} id={id} level={level} text={text} />
    )
  );
};

const TOCItem = ({ id, level, text }: TOCItem) => (
  <li id={id} className={clsx(styles.item, styles[`heading${level}`])}>
    <a href={`#${id}`}>{<Text variant="body14">{text}</Text>}</a>
  </li>
);
