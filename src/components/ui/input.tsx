import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
const InputWithPrefix = ({
  prefix,
  ...props
}: { prefix: string } & React.ComponentProps<"input">) => {
  return (
    <div className="flex items-center w-full h-9 border border-input rounded-md shadow-sm overflow-hidden">
      <span className="px-1 font-medium text-foreground whitespace-nowrap">
        {prefix}
      </span>
      <input
        {...props}
        className={cn(
          "flex-1 h-full bg-transparent py-1 text-base focus:outline-none placeholder:text-muted-foreground md:text-sm",
          props.className
        )}
      />
    </div>
  );
};

InputWithPrefix.displayName = "InputWithPrefix";

export { Input, InputWithPrefix };
