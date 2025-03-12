'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { ImageDialog } from '@organisms/Images/ImageDialog/ImageDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter } from '@ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@ui/hover-card';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  TagIcon,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';

import { ImageCardProps } from './ImageCard.types';

export function ImageCard({ image }: ImageCardProps) {
  const { groups, tags, images, setImages } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  const group = groups.find((g) => g.id === image.groupId);
  const imageTags = tags.filter((tag) => image.tagIds.includes(tag.id));

  const handleDelete = () => {
    const updatedImages = images.filter((i) => i.id !== image.id);
    setImages(updatedImages);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Image deleted',
      description: 'The image has been removed from your collection',
    });
  };

  // Format the date
  const lastUpdated = formatDistanceToNow(new Date(image.updatedAt), {
    addSuffix: true,
  });

  // Função para gerar um placeholder com o título da imagem
  const getPlaceholderUrl = () => {
    return `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(
      image.title
    )}`;
  };

  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 relative">
          <div className="aspect-square relative overflow-hidden">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="text-center p-4">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <p className="text-sm text-muted-foreground">
                    Image not available
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={image.url || getPlaceholderUrl()}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  aria-label="more"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 flex-1">
          <div className="w-full flex justify-between items-start mb-2">
            <h3 className="font-medium truncate">{image.title}</h3>
            {image.comment && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="message-square"
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>{image.comment}</HoverCardContent>
              </HoverCard>
            )}
          </div>
          {group && (
            <Badge variant="outline" className="mb-2">
              {group.name}
            </Badge>
          )}
          {imageTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {imageTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <TagIcon className="h-3 w-3" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center text-xs text-muted-foreground w-full mt-auto">
            <Clock className="h-3 w-3 mr-1" />
            <span>Updated {lastUpdated}</span>
          </div>
        </CardFooter>
      </Card>

      <ImageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        image={image}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
      />
    </>
  );
}
