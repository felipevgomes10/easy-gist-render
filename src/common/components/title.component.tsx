import { twMerge } from "tailwind-merge";

export function Title({
  children,
  className,
}: Readonly<React.PropsWithChildren & React.ComponentProps<"h1">>) {
  return (
    <h1
      className={twMerge(
        "text-center text-xl font-bold text-black md:text-3xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
