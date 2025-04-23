import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants with class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-black border-none",  // No background color or hover effect
        destructive: "bg-destructive text-destructive-foreground",  // Remove hover effect from destructive variant
        outline: "border border-input bg-background",  // No hover color or background change for outline
        secondary: "bg-secondary text-secondary-foreground",  // Remove hover effect from secondary variant
        ghost: "hover:bg-transparent hover:text-accent-foreground", // Remove any hover effect from ghost variant
        link: "text-primary underline-offset-4 hover:underline", // Keep link hover, but no background color change
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default", // No hover/active color change
      size: "default",
    },
  }
);

// Button component using forwarded refs
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))} // No hover/active states
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
