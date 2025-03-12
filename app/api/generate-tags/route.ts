import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

interface RequestBody {
  imageUrl: string;
}

interface GeneratedTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GeneratedTagResponse {
  tags: GeneratedTag[];
}

export async function POST(request: Request) {
  try {
    const { imageUrl } = (await request.json()) as RequestBody;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
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

    // Generate tags using OpenAI
    const { text } = await generateText({
      model: openai('gpt-4'),
      prompt: `
        Analyze this image: ${imageUrl} and generate relevant tags.
        Return ONLY a JSON array of tag names, like this: ["tag1", "tag2"]
        Generate 5-8 tags that describe the image content, style, and mood.
        Do not include any other text or explanation in your response.
      `,
    });

    try {
      // eslint-disable-next-line sonarjs/slow-regex
      const jsonMatch = text.match(/\[.*?\]/m);
      if (!jsonMatch) {
        throw new Error('Failed to parse tags from response');
      }

      const tagNames = JSON.parse(jsonMatch[0]) as string[];
      const now = new Date().toISOString();

      // Create new tags with IDs
      const newTags: GeneratedTag[] = tagNames.map((name: string) => ({
        id: uuidv4(),
        name,
        createdAt: now,
        updatedAt: now,
      }));

      const response: GeneratedTagResponse = {
        tags: newTags,
      };

      return NextResponse.json(response);
    } catch (error) {
      console.error('Error parsing tags:', error);
      return NextResponse.json(
        {
          error: 'Failed to generate tags',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating tags:', error);
    return NextResponse.json(
      {
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
