import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { CaretUpDown } from "@/assets/icon";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Flex } from "@/components/Flex";
import { LoginForm } from "@/components/LoginForm";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { checkAuthentication } from "@/domains/auth/auth.actions";
import { Category } from "@/domains/note/note.types";
import styles from "./CategorySelector.module.css";

export interface CategorySelectorProps {
  options: Category[];
}

export const CategorySelector = ({ options }: CategorySelectorProps) => {
  const params = useParams();
  const selectedCategory = params.category;
  const router = useRouter();

  const handleClickPrivateCategory = async (categoryPath: string) => {
    const { isLoggedIn } = await checkAuthentication();

    if (isLoggedIn) {
      router.push(categoryPath);
      return;
    }

    const loginSuccess = await overlay.openAsync(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={() => close(false)}>
        <LoginForm onLoginSuccess={() => close(true)} />
      </Modal>
    ));

    if (loginSuccess) {
      router.push(categoryPath);
    }
  };

  return (
    <Dropdown.Root className={styles.CategorySelector}>
      <Dropdown.Trigger className={styles.trigger}>
        <Text variant="label14">{selectedCategory}</Text>
        <CaretUpDown className={styles.icon} width={14} height={14} />
      </Dropdown.Trigger>
      <Dropdown.Content className={styles.content} side="top" align="start">
        <Flex direction="column" align="stretch">
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
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
