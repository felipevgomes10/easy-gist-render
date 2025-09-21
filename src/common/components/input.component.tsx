import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full border-2 border-black bg-white px-4 py-3 text-lg text-black placeholder-gray-500 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
