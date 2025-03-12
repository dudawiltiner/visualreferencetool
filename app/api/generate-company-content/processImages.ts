import { v4 as uuidv4 } from 'uuid';

interface GoogleSearchImage {
  link: string;
  title: string;
  image?: {
    thumbnailLink: string;
  };
}

interface ImageContent {
  title: string;
  comment: string;
  suggestedTags: string[];
}

interface GeneratedContent {
  images: ImageContent[];
}

interface SearchImage {
  url: string;
  title: string;
  thumbnail: string;
}

interface SearchResult {
  term: string;
  images: SearchImage[];
}

export async function processImages(
  companyName: string,
  content: GeneratedContent,
  tagNameToId: Record<string, string>
) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

  // Verificar se as chaves de API estão disponíveis
  if (!API_KEY || !SEARCH_ENGINE_ID) {
    throw new Error(
      'Add GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID to environment variables to use this feature.'
    );
  }

  // Expandir a consulta para incluir termos relevantes para empresas
  const searchTerms = [
    `${companyName} logo`,
    `${companyName} brand`,
    `${companyName} product`,
    `${companyName} website`,
    `${companyName} marketing`,
  ];

  // Buscar imagens para cada termo de pesquisa
  const imagePromises = searchTerms.map(async (term) => {
    try {
      // Construir URL da API do Google Custom Search
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(term)}&searchType=image&num=3&safe=active&imgSize=medium`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        console.warn(`Error searching for "${term}": ${response.statusText}`);
        return {
          term,
          images: [],
        };
      }

      const data = await response.json();

      // Extrair apenas as informações necessárias das imagens
      if (data.items && data.items.length > 0) {
        return {
          term,
          images: data.items.map((item: GoogleSearchImage) => ({
            url: item.link,
            title: item.title || term,
            thumbnail: item.image?.thumbnailLink || item.link,
          })),
        };
      }

      return {
        term,
        images: [],
      };
    } catch (error) {
      console.error(`Error fetching results for "${term}":`, error);
      return {
        term,
        images: [],
      };
    }
  });

  // Aguardar todas as buscas de imagens
  const imageResults = await Promise.all(imagePromises);

  // Aplanar os resultados para facilitar o uso
  const flattenedImages = imageResults.flatMap((result: SearchResult) =>
    result.images.map((img: SearchImage) => ({
      term: result.term,
      url: img.url,
      title: img.title,
    }))
  );

  const now = new Date().toISOString();

  // Process images
  return content.images.map((image, index) => {
    // Get matching image from search results if available
    const searchImage = flattenedImages[index] || null;

    // Convert suggested tags to tag IDs
    const tagIds = image.suggestedTags
      .map((tag) => tagNameToId[tag.toLowerCase()])
      .filter(Boolean);

    return {
      id: uuidv4(),
      title: image.title,
      url: searchImage?.url || '',
      thumbnail: searchImage?.url || '',
      comment: image.comment,
      tagIds,
      createdAt: now,
      updatedAt: now,
    };
  });
}
