export interface SearchBarProps
  extends React.PropsWithChildren,
    Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSearch: (search: string) => void;
  placeholder?: string;
}
