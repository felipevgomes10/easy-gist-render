import { twMerge } from "tailwind-merge";

export function Card({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"div">>) {
  return (
    <div
      className={twMerge(
        "w-full max-w-md space-y-6 border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_#000]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
