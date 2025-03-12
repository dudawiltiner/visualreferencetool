import { NextResponse } from 'next/server';

// Chaves de API para Google Custom Search
const API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Verificar se as chaves de API estão disponíveis
    if (!API_KEY || !SEARCH_ENGINE_ID) {
      return NextResponse.json(
        {
          error: 'Google API credentials are missing',
          message:
            'Add GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID to environment variables to use this feature.',
        },
        { status: 400 }
      );
    }

    // Expandir a consulta para incluir termos relevantes para empresas
    const expandedQueries = [
      `${query} logo`,
      `${query} brand`,
      `${query} product`,
      `${query} website`,
    ];

    // Resultados combinados de todas as consultas
    const allResults = [];

    // Limitar o número de consultas paralelas para evitar sobrecarga
    for (const expandedQuery of expandedQueries) {
      try {
        // Construir URL da API do Google Custom Search
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
          expandedQuery
        )}&searchType=image&num=3&safe=active&imgSize=medium`;

        const response = await fetch(searchUrl);

        if (!response.ok) {
          console.warn(
            `Error searching for "${expandedQuery}": ${response.statusText}`
          );
          continue;
        }

        const data = await response.json();

        // Extrair apenas as informações necessárias das imagens
        if (data.items && data.items.length > 0) {
          const images = data.items.map((item: any) => ({
            url: item.link,
            title: item.title || expandedQuery,
            thumbnail: item.image?.thumbnailLink || item.link,
            isValid: true,
          }));

          allResults.push({
            query: expandedQuery,
            images,
          });
        }
      } catch (error) {
        console.error(`Error fetching results for "${expandedQuery}":`, error);
        // Continuar com as outras consultas mesmo se uma falhar
      }

      // Pequena pausa entre as requisições para evitar limitações de taxa
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    return NextResponse.json({
      results: allResults,
      query,
    });
  } catch (error) {
    console.error('Error searching for images:', error);
    return NextResponse.json(
      {
        error: 'Failed to search for images',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
