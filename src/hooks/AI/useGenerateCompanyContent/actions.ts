'use server';

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

import { processContent } from './processContent';
import { processImages } from './processImages';
import {
  GenerateCompanyContentResponse,
  GeneratedContent,
  Image,
} from './types';

export async function generateCompanyContentAction(
  companyName: string
): Promise<GenerateCompanyContentResponse> {
  try {
    // Generate company content using OpenAI
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `
        I need to create visual reference content for the company "${companyName}".
        
        Generate a comprehensive set of visual reference data including:
        
        1. Color Palettes: Create 3-5 color palettes that match the company's brand identity. Each palette should have 4-6 colors with hex codes.
        
        2. Tags: Generate 10-15 relevant tags that describe the company's visual identity, industry, and style.
        
        3. Groups: Create 3-5 logical groups to organize visual content (e.g., "Brand Assets", "Marketing Materials", "Website").
        
        4. Images: Suggest 5-8 types of images that would be relevant for this company (with descriptions and suggested tags).
        
        Return the data in the following JSON format:
        
        {
          "palettes": [
            {
              "name": "Palette Name",
              "colors": ["#HEXCODE1", "#HEXCODE2", ...],
              "comment": "Description of the palette"
            }
          ],
          "tags": [
            {
              "name": "Tag Name"
            }
          ],
          "groups": [
            {
              "name": "Group Name",
              "description": "Description of the group"
            }
          ],
          "images": [
            {
              "title": "Image Title",
              "comment": "Description of the image",
              "suggestedTags": ["tag1", "tag2"]
            }
          ]
        }
        
        Be creative but realistic, and ensure the content matches the company's likely brand identity based on their industry and name.
      `,
    });

    // Parse the response to get the content
    let content: GeneratedContent;
    try {
      // Extract the JSON object from the response using a safe regex pattern
      const jsonString = text.match(/\{(?:[^{}]|{[^{}]*})*\}/)?.[0];
      if (jsonString) {
        content = JSON.parse(jsonString);
      } else {
        throw new Error('Failed to parse JSON from response');
      }
    } catch (error) {
      console.error('Error parsing content:', error);
      throw new Error('Failed to parse generated content');
    }

    // Process content (tags, groups, palettes)
    const { tags, groups, palettes, tagNameToId } = processContent(content);

    // Process images
    let images: Image[] = [];
    try {
      images = await processImages(companyName, content, tagNameToId, groups);
    } catch (error: any) {
      console.warn('Error processing images:', error.message);
    }

    return {
      tags,
      groups,
      palettes,
      images,
    };
  } catch (error: any) {
    console.error('Error generating content:', error);
    throw new Error(error.message || 'Failed to generate content');
  }
}
