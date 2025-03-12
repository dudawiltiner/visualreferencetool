import type { Group } from "@lib/types";

export interface GroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: Group;
}
