import { v4 as uuidv4 } from 'uuid';

import { GeneratedContent } from './types';

// Função auxiliar para gerar números aleatórios seguros
function getSecureRandom() {
  // Usar crypto.getRandomValues() do navegador
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / 0xffffffff;
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
    (map: Record<string, string>, tag: { id: string; name: string }) => {
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
    // Assign to a random group using crypto
    const randomGroupIndex = Math.floor(
      getSecureRandom() * processedGroups.length
    );
    const groupId = processedGroups[randomGroupIndex].id;

    // Assign random tags (2-4) using crypto
    const tagIds = [];
    const numTags = Math.floor(getSecureRandom() * 3) + 2; // 2-4 tags
    const shuffledTags = [...processedTags].sort(() => getSecureRandom() - 0.5);

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
