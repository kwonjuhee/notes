import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { useCallback, useRef, useState } from "react";
import { CaretUpDown } from "@/assets/icon";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { LoginForm } from "@/components/LoginForm";
import { Modal } from "@/components/Modal";
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
  const router = useRouter();

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

  const handleClickPrivateCategory = async (categoryPath: string) => {
    // @TODO check authentication
    const authenticated = false;

    if (!authenticated) {
      const loginSuccess = await overlay.openAsync(({ isOpen, close }) => (
        <Modal isOpen={isOpen} onClose={() => close(false)}>
          <LoginForm onLoginSuccess={() => close(true)} />
        </Modal>
      ));

      if (loginSuccess) {
        router.push(categoryPath);
      }
    }
  };

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
          {options.map(({ slug, label, isPrivate }) => (
            <Button
              key={slug}
              className={clsx(styles.option, slug === selectedCategory && styles.selected)}
              variant="ghost"
              color="gray"
              href={isPrivate ? undefined : `/notes/${slug}`}
              onClick={isPrivate ? () => handleClickPrivateCategory(`/notes/${slug}`) : () => {}}
            >
              {isPrivate && <>🔒</>}
              <Text variant="caption14">{label}</Text>
            </Button>
          ))}
        </Flex>
      )}
    </div>
  );
};
