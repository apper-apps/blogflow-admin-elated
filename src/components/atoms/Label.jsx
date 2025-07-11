import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <label
      className={cn(
        "text-sm font-medium text-gray-700 mb-1 block",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;