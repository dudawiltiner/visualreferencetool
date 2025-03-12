'use client';

import type React from 'react';
import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';
import { useSearchImages } from '@hooks/Images/useSearchImages';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Skeleton } from '@ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { AlertTriangle, LucideImage, Search } from 'lucide-react';

interface ImageSearchProps {
  onSelectImage: (url: string) => void;
  initialQuery?: string;
}

export function ImageSearch({
  onSelectImage,
  initialQuery = '',
}: ImageSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const { toast } = useToast();
  const { mutate: searchImages, isPending: isLoading } = useSearchImages();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!query.trim()) {
      toast({
        title: 'Search query required',
        description: 'Please enter a search term',
        variant: 'destructive',
      });
      return;
    }

    setResults([]);

    searchImages(
      { query: query.trim() },
      {
        onSuccess: (data) => {
          setResults(data.results);

          if (data.results.length === 0) {
            toast({
              title: 'No images found',
              description: 'Try a different search term',
              variant: 'default',
            });
          }
        },
        onError: (error) => {
          toast({
            title: 'Error searching for images',
            description:
              error.message || 'There was a problem searching for images',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for brand images..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      {results.length > 0 && (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto">
            <TabsList className="w-full flex-nowrap justify-start">
              <TabsTrigger value="all">All ({results?.length})</TabsTrigger>
              {results?.map((result, index) => (
                <TabsTrigger key={index} value={result.query}>
                  {result.query.split(' ').slice(-1)[0]} ({result.images.length}
                  )
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
              {results?.map((result, index: number) =>
                result.images.map((image: any, imgIndex: number) => (
                  <ImageThumbnail
                    key={`${index}-${imgIndex}`}
                    image={image}
                    onSelect={() => onSelectImage(image.url)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {results.map((result, index) => (
            <TabsContent key={index} value={result.query} className="pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
                {result.images.map((image: any, imgIndex: number) => (
                  <ImageThumbnail
                    key={imgIndex}
                    image={image}
                    onSelect={() => onSelectImage(image.url)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="aspect-square relative">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && query && (
        <div className="text-center py-8 border rounded-md">
          <LucideImage className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-muted-foreground">
            No images found for "{query}"
          </p>
          <p className="text-xs text-muted-foreground">
            Try a different search term
          </p>
        </div>
      )}

      {!isLoading && !query && (
        <div className="text-center py-8 border rounded-md">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-muted-foreground">
            Search for images related to a brand or company
          </p>
          <p className="text-xs text-muted-foreground">
            Example: "Spotify", "Nike", "Apple"
          </p>
        </div>
      )}
    </div>
  );
}

function ImageThumbnail({
  image,
  onSelect,
}: {
  image: any;
  onSelect: () => void;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className="aspect-square relative overflow-hidden rounded-md border cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onSelect}
    >
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
      ) : (
        <img
          src={image.thumbnail || image.url || '/placeholder.svg'}
          alt={image.title || 'Image'}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
        <p className="text-white text-xs truncate">
          {image.title || image.category}
        </p>
      </div>
    </div>
  );
}
