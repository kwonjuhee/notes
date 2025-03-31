import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { Post } from "@/domains/post/post.types";
import styles from "./PostItem.module.css";

export const PostItem = ({ title, description, created }: Partial<Post>) => {
  return (
    <Flex direction="column" width="100%" className={styles.PostItem}>
      <Text variant="heading20" className={styles.title}>
        {title}
      </Text>
      <Text variant="body14" className={styles.description}>
        {description}
      </Text>
      <Text variant="caption12" className={styles.date}>
        {created}
      </Text>
    </Flex>
  );
};
