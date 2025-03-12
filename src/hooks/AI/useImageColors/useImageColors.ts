import { useCallback, useState } from 'react';

import { FastAverageColor } from 'fast-average-color';

import { UseImageColorsOptions } from './types';

// Lista de proxies alternativos
const PROXY_URLS = [
  (url: string) =>
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://cors-anywhere.herokuapp.com/${url}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${url}`,
];

const PROXY_DOMAINS = [
  'allorigins.win',
  'cors-anywhere.herokuapp.com',
  'codetabs.com',
];

const addCorsProxy = (url: string) => {
  // Retorna o primeiro proxy da lista
  return PROXY_URLS[0](url);
};

// Lista de extensões suportadas
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Função para verificar se a URL é de uma imagem suportada
const isSupportedImageType = (url: string): boolean => {
  const lowercaseUrl = url.toLowerCase();
  return SUPPORTED_EXTENSIONS.some((ext) => lowercaseUrl.endsWith(ext));
};

// Função para extrair a extensão da URL
const getFileExtension = (url: string): string => {
  const match = url.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
};

// Função para determinar se uma cor é próxima do preto
const isNearBlack = (r: number, g: number, b: number) => {
  // Média dos componentes RGB
  const average = (r + g + b) / 3;
  // Desvio padrão dos componentes (para verificar se são similares)
  const stdDev = Math.sqrt(
    ((r - average) ** 2 + (g - average) ** 2 + (b - average) ** 2) / 3
  );

  // É preto se a média for baixa e os componentes forem similares
  return average < 30 && stdDev < 10;
};

// Função para determinar se uma cor é próxima do branco
const isNearWhite = (r: number, g: number, b: number) => {
  return r > 240 && g > 240 && b > 240;
};

// Função para converter hex para RGB
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const loadImageWithProxy = async (
  imageUrl: string
): Promise<HTMLImageElement> => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = () => {
      const currentProxy = img.src;
      const proxyIndex = PROXY_DOMAINS.findIndex((proxy) =>
        currentProxy.includes(proxy)
      );

      if (proxyIndex >= 0 && proxyIndex < PROXY_URLS.length - 1) {
        // Tenta o próximo proxy
        const nextProxyUrl = PROXY_URLS[proxyIndex + 1](imageUrl);
        img.src = nextProxyUrl;
      } else {
        // Se todos os proxies falharem, tenta sem proxy
        img.src = imageUrl;
      }
    };
    // Começa com o primeiro proxy
    img.src = PROXY_URLS[0](imageUrl);
  });
};

export function useImageColors(
  imageUrl: string | null,
  options: UseImageColorsOptions = {}
) {
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  const extractColors = useCallback(async () => {
    if (!imageUrl) {
      setColors([]);
      setError(null);
      return [];
    }

    // Verificar se o tipo de imagem é suportado
    if (!isSupportedImageType(imageUrl)) {
      const extension = getFileExtension(imageUrl);
      const errorMessage = `Formato de imagem não suportado: ${extension}. Por favor, use imagens nos formatos: ${SUPPORTED_EXTENSIONS.join(', ')}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      setIsLoading(true);
      setError(null);

      const fac = new FastAverageColor();
      const img = await loadImageWithProxy(imageUrl);

      // Analisar diferentes regiões da imagem
      const regions = [
        // Imagem inteira
        { left: 0, top: 0, width: img.width, height: img.height },
        // Centro da imagem
        {
          left: Math.floor(img.width * 0.25),
          top: Math.floor(img.height * 0.25),
          width: Math.floor(img.width * 0.5),
          height: Math.floor(img.height * 0.5),
        },
        // Quadrante superior esquerdo
        {
          left: 0,
          top: 0,
          width: Math.floor(img.width * 0.5),
          height: Math.floor(img.height * 0.5),
        },
        // Quadrante inferior direito
        {
          left: Math.floor(img.width * 0.5),
          top: Math.floor(img.height * 0.5),
          width: Math.floor(img.width * 0.5),
          height: Math.floor(img.height * 0.5),
        },
      ];

      const extractedColors = await Promise.all(
        regions.flatMap(async (region) => {
          const results = await Promise.all([
            fac
              .getColorAsync(img, {
                ...region,
                algorithm: 'dominant',
                mode: 'precision',
                step: 1,
              })
              .catch(() => ({ hex: '' })), // Tratamento de erro para cada região
            fac
              .getColorAsync(img, {
                ...region,
                algorithm: 'simple',
                mode: 'precision',
                step: 1,
              })
              .catch(() => ({ hex: '' })), // Tratamento de erro para cada região
          ]);

          return results
            .map((result) => {
              if (!result.hex) return null;
              const { r, g, b } = hexToRgb(result.hex);
              if (isNearBlack(r, g, b)) return '#000000';
              if (isNearWhite(r, g, b)) return '#FFFFFF';
              return result.hex;
            })
            .filter(Boolean) as string[]; // Remove resultados nulos
        })
      );

      // Achatar o array e remover duplicatas
      const uniqueColors = Array.from(new Set(extractedColors.flat())).sort(
        (a, b) => {
          if (a === '#000000') return -1;
          if (b === '#000000') return 1;
          if (a === '#FFFFFF') return -1;
          if (b === '#FFFFFF') return 1;
          return a.localeCompare(b);
        }
      );

      if (uniqueColors.length === 0) {
        throw new Error(
          'Não foi possível extrair cores desta imagem. Tente uma imagem diferente.'
        );
      }

      // Se a URL mudou, adiciona as novas cores no topo
      if (imageUrl !== previousUrl) {
        setPreviousUrl(imageUrl);
        setColors((prevColors) => {
          // Remove as cores que já existem para evitar duplicatas
          const existingColors = new Set(prevColors);
          const newColors = uniqueColors.filter(
            (color) => !existingColors.has(color)
          );
          return [...newColors, ...prevColors];
        });
      } else {
        setColors(uniqueColors);
      }

      return uniqueColors;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao extrair as cores. Por favor, tente novamente com uma imagem diferente.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [imageUrl, previousUrl]);

  // Se não for manual, extrair cores automaticamente quando a URL mudar
  if (!options.manual) {
    extractColors().catch(() => {});
  }

  return { colors, isLoading, error, extractColors };
}
