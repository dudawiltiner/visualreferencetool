'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';
import {
  type SearchImage,
  useSearchImages,
} from '@hooks/Images/useSearchImages';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Search } from 'lucide-react';

import { ImageSearchProps } from './ImageSearch.types';

export function ImageSearch({ onSelectImage }: ImageSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchImage[]>([]);
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
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          data-testid="search-input"
        />
        <Button type="submit" disabled={isLoading} data-testid="search-button">
          {isLoading ? 'Searching...' : <Search className="h-4 w-4 mr-2" />}
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-4">
        {results.map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            className="relative aspect-video cursor-pointer group"
            onClick={() => onSelectImage(image?.url)}
          >
            <img
              src={image.thumbnail}
              alt={image.title}
              className="w-full h-full object-cover rounded-lg transition-opacity group-hover:opacity-75"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
