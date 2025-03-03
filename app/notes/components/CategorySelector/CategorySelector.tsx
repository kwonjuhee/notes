import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { CaretUpDown } from "@/assets/icon";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Category } from "@/types/category";
import styles from "./CategorySelector.module.css";

export interface CategorySelectorProps {
  options: Category[];
}

export const CategorySelector = ({ options }: CategorySelectorProps) => {
  const params = useParams();
  const selectedCategory = params.category;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  useClickOutside(
    dropdownRef,
    useCallback(() => {
      if (isOpenDropdown) {
        setIsOpenDropdown(false);
      }
    }, [isOpenDropdown])
  );

  return (
    <div className={styles.CategorySelector}>
      <Button className={styles.trigger} variant="ghost" color="gray" onClick={toggleDropdown}>
        <Text variant="label14">{selectedCategory}</Text>
        <CaretUpDown className={styles.icon} width={14} height={14} />
      </Button>
      {isOpenDropdown && (
        <Flex
          ref={dropdownRef}
          className={styles.dropdown}
          position="absolute"
          left="0"
          right="0"
          bottom="40px"
          direction="column"
          align="stretch"
          backgroundColor="floating"
          borderWidth="1px"
          borderColor="gray"
          borderRadius="medium"
          style={{ zIndex: "var(--dropdown)" }}
        >
          {options.map(({ slug, label }) => (
            <Button
              key={slug}
              href={`/notes/${slug}`}
              className={clsx(styles.option, slug === selectedCategory && styles.selected)}
              variant="ghost"
              color="gray"
            >
              <Text variant="caption14">{label}</Text>
            </Button>
          ))}
        </Flex>
      )}
    </div>
  );
};
