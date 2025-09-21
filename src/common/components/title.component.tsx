import { twMerge } from "tailwind-merge";

export function Title({
  children,
  className,
}: Readonly<React.PropsWithChildren & React.ComponentProps<"h1">>) {
  return (
    <h1
      className={twMerge(
        "text-center text-3xl font-bold text-black",
        className,
      )}
    >
      {children}
    </h1>
  );
}
