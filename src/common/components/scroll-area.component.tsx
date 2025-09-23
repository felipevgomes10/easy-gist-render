import { twMerge } from "tailwind-merge";

export function ScrollArea({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"div">>) {
  return (
    <div
      className={twMerge(
        "neobrutalist-scrollbar overflow-auto pr-2 pb-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
