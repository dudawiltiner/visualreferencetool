'use client';

import { ImageCard } from '@molecules/Images/ImageCard/ImageCard';
import { PaletteCard } from '@molecules/Palettes/PaletteCard/PaletteCard';
import { useData } from '@providers/DataProvider/DataProvider';
import { Card, CardContent } from '@ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';

export function RecentItems() {
  const { palettes, images } = useData();

  const recentImages = [...images]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const recentPalettes = [...palettes]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="images">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Items</h2>
            <TabsList>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="palettes">Palettes</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="images">
            {recentImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-1">
                {recentImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No images added yet
              </p>
            )}
          </TabsContent>
          <TabsContent value="palettes">
            {recentPalettes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-1">
                {recentPalettes.map((palette) => (
                  <PaletteCard key={palette.id} palette={palette} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No palettes added yet
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
