'use client';

import { useData } from '@providers/DataProvider/DataProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import {
  FolderOpen,
  Image as ImageIcon,
  Palette,
  TagIcon,
  TrendingUp,
} from 'lucide-react';

import { GroupDistributionChart } from '../GroupDistributionChart/GroupDistributionChart';
import { TagUsageChart } from '../TagUsageChart/TagUsageChart';

export function DashboardStats() {
  const { groups, tags, images, palettes } = useData();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{images.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Color Palettes
            </CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{palettes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Groups</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <TagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="groups">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="groups">Group Distribution</TabsTrigger>
              <TabsTrigger value="tags">Tag Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="groups" className="pt-4">
              <GroupDistributionChart
                images={images}
                palettes={palettes}
                groups={groups}
              />
            </TabsContent>
            <TabsContent value="tags" className="pt-4">
              <TagUsageChart images={images} palettes={palettes} tags={tags} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
