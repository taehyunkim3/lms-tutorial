import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        defalut: "bg-sky-100",
        success: "bg-green-100",
      },
      // iconVariant:{
      //     defalut:'text-sky-700',
      //     success:'text-green-700',
      // },
      size: {
        defalut: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "defalut",
      // iconVariant:'defalut',
      size: "defalut",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      defalut: "text-sky-700",
      success: "text-green-700",
    },
    size: {
      defalut: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "defalut",
    size: "defalut",
  },
});

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
