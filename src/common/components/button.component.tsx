import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  ...props
}: Readonly<React.PropsWithChildren & React.ComponentProps<"button">>) {
  return (
    <button
      className={twMerge(
        "w-full cursor-pointer border-2 border-black bg-yellow-400 px-4 py-3 text-lg font-bold text-black shadow-[3px_3px_0_0_#000] transition-transform hover:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
