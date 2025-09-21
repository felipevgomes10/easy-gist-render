import { twMerge } from "tailwind-merge";

export function Container({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"div">>) {
  return (
    <div
      className={twMerge(
        "flex h-screen items-center justify-center bg-gray-100 p-2 font-mono",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
