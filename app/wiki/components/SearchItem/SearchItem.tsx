import { Text } from "@/components/Text";
import styles from "./SearchItem.module.css";

export interface SearchItemProps {
  title: string;
  category: string;
  highlightKeyword?: string;
}

export const SearchItem = ({ title, category, highlightKeyword }: SearchItemProps) => {
  const parts = title.split(new RegExp(`(${highlightKeyword})`, "gi"));

  return (
    <div className={styles.SearchItem}>
      <Text variant="body16" className={styles.title}>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightKeyword?.toLowerCase() ? (
            <em key={i} className={styles.highlight}>
              {part}
            </em>
          ) : (
            part
          )
        )}
      </Text>
      <Text variant="caption12" className={styles.category}>
        {category}
      </Text>
    </div>
  );
};
