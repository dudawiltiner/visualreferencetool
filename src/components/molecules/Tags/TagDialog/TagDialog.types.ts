import type { Tag } from "@lib/types";

export interface TagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag?: Tag;
}
