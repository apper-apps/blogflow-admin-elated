import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;