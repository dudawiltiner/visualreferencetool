/* eslint-disable sonarjs/pseudo-random */
import { v4 as uuidv4 } from 'uuid';

interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GeneratedTag {
  name: string;
}

interface GeneratedGroup {
  name: string;
  description: string;
}

interface GeneratedPalette {
  name: string;
  colors: string[];
  comment: string;
}

interface GeneratedContent {
  tags: GeneratedTag[];
  groups: GeneratedGroup[];
  palettes: GeneratedPalette[];
}

export function processContent(content: GeneratedContent) {
  const now = new Date().toISOString();

  // Process tags
  const processedTags = content?.tags?.map((tag) => ({
    id: uuidv4(),
    name: tag.name,
    createdAt: now,
    updatedAt: now,
  }));

  // Create a map of tag names to IDs for reference
  const tagNameToId = processedTags?.reduce(
    (map: Record<string, string>, tag: Tag) => {
      map[tag.name.toLowerCase()] = tag.id;
      return map;
    },
    {}
  );

  // Process groups
  const processedGroups = content.groups.map((group) => ({
    id: uuidv4(),
    name: group.name,
    description: group.description,
    createdAt: now,
    updatedAt: now,
  }));

  // Process palettes
  const processedPalettes = content.palettes.map((palette) => {
    // Assign to a random group
    const randomGroupIndex = Math.floor(Math.random() * processedGroups.length);
    const groupId = processedGroups[randomGroupIndex].id;

    // Assign random tags (2-4)
    const tagIds = [];
    const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 tags
    const shuffledTags = [...processedTags].sort(() => 0.5 - Math.random());

    for (let i = 0; i < Math.min(numTags, shuffledTags.length); i++) {
      tagIds.push(shuffledTags[i].id);
    }

    return {
      id: uuidv4(),
      name: palette.name,
      colors: palette.colors,
      groupId: groupId,
      tagIds: tagIds,
      comment: palette.comment,
      createdAt: now,
      updatedAt: now,
    };
  });

  return {
    tags: processedTags,
    groups: processedGroups,
    palettes: processedPalettes,
    tagNameToId,
  };
}
