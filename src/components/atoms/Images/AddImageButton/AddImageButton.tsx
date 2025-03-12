"use client";

import { ImageDialog } from "@organisms/Images/ImageDialog/ImageDialog";
import { Button } from "@ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddImageButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Image
      </Button>

      <ImageDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
