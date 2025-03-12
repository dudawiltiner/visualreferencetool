"use client";

import { GroupDialog } from "@organisms/Groups/GroupDialog/GroupDialog";
import { Button } from "@ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddGroupButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Group
      </Button>

      <GroupDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
