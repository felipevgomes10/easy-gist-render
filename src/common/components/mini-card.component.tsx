import { twMerge } from "tailwind-merge";

export function MiniCard({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"div">>) {
  return (
    <div
      className={twMerge(
        "w-full cursor-pointer border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] transition-transform hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
