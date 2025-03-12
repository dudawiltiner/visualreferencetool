import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

interface RequestBody {
  imageUrl: string;
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

    // Generate color palette using OpenAI
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `
        Analyze this image: ${imageUrl} and extract a color palette that represents its key colors.
        Return ONLY a JSON array of 4-6 hex color codes, like this: ["#FFFFFF", "#000000"]
        The colors should be sorted from most dominant to least dominant.
        Do not include any other text or explanation in your response.
      `,
    });

    // Parse the response to get the colors array
    try {
      // eslint-disable-next-line sonarjs/slow-regex
      const jsonMatch = text.match(/\[.*?\]/m);
      if (jsonMatch) {
        const colors = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ colors });
      } else {
        throw new Error('Failed to parse colors from response');
      }
    } catch (error) {
      console.error('Error parsing colors:', error);
      return NextResponse.json(
        {
          error: 'Failed to extract colors',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error extracting colors:', error);
    return NextResponse.json(
      {
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
