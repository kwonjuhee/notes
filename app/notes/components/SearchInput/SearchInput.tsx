import { MagnifyingGlass, X } from "@/assets/icon";
import { Flex } from "@/components/Flex";
import { Input, InputProps } from "@/components/Input";
import styles from "./SearchInput.module.css";

export interface SearchInputProps extends Omit<InputProps, "leftContent" | "rightContent"> {
  onClear?: () => void;
}

export const SearchInput = ({ onClear, ...props }: SearchInputProps) => {
  const showClearButton = Boolean(onClear) && Boolean(props.value);

  return (
    <Input
      className={styles.SearchInput}
      leftContent={
        <Flex align="center" justify="center">
          <MagnifyingGlass width={16} height={16} />
        </Flex>
      }
      rightContent={
        showClearButton && (
          <button className={styles.clearButton} onClick={onClear}>
            <X width={16} height={16} />
          </button>
        )
      }
      {...props}
    />
  );
};
