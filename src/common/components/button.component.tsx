import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"button">>) {
  return (
    <button
      className={twMerge(
        "cursor-pointer border-2 border-black bg-yellow-400 px-2 py-1 font-bold text-black shadow-[3px_3px_0_0_#000] transition-transform hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] md:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
