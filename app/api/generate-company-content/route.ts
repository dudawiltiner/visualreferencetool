import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

import { processContent } from './processContent';
import { processImages } from './processImages';

interface RequestBody {
  companyName: string;
}

interface GeneratedContent {
  tags: { name: string }[];
  groups: { name: string; description: string }[];
  palettes: { name: string; colors: string[]; comment: string }[];
  images: { title: string; comment: string; suggestedTags: string[] }[];
}

interface ProcessedImage {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  comment: string;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
}

export async function POST(request: Request) {
  try {
    const { companyName } = (await request.json()) as RequestBody;

    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OpenAI API key is missing',
          message:
            'Add OPENAI_API_KEY to environment variables to use this feature.',
        },
        { status: 400 }
      );
    }

    // Generate company content using OpenAI
    const { text } = await generateText({
      model: openai('gpt-4'),
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
      // Extract the JSON object from the response
      // eslint-disable-next-line sonarjs/slow-regex
      const jsonMatch = text.match(/\{[\s\S]*\}/m);
      if (jsonMatch) {
        content = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse JSON from response');
      }
    } catch (error) {
      console.error('Error parsing content:', error);
      return NextResponse.json(
        { error: 'Failed to parse generated content' },
        { status: 500 }
      );
    }

    // Process content (tags, groups, palettes)
    const { tags, groups, palettes, tagNameToId } = processContent(content);

    // Process images
    let images: ProcessedImage[] = [];
    try {
      images = await processImages(companyName, content, tagNameToId);
    } catch (error: any) {
      console.warn('Error processing images:', error.message);
    }

    return NextResponse.json({
      tags,
      groups,
      palettes,
      images,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
