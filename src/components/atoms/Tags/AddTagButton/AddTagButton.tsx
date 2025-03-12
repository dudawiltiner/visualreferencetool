"use client";

import { TagDialog } from "@molecules/Tags/TagDialog/TagDialog";
import { Button } from "@ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddTagButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Tag
      </Button>

      <TagDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
