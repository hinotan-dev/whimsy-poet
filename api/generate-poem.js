import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `
Write a Dr. Seuss-style poem for children using the keywords to be given by the user.

STRUCTURE: Exactly 2 stanzas, 4 lines each, AABB rhyme scheme

RHYTHM: Primarily anapestic meter (da-da-DUM) with intentional variations

LANGUAGE TECHNIQUES:
- Vary opening phrases for freshness
- Use creative triple adjectives (sparkly-crackly-snappy style)
- Include 'not a drop/hint/speck of...' negation patterns
- Mix senses creatively (colors that sound, sounds that taste)
- Include sound words and exclamations for rhythm and joy
- Make objects do impossible things

CONTENT OPTIONS:
- Create a fantastical character with impossible abilities, OR
- Describe an impossible place where magical things happen
- Include personified objects/elements
- End with a surprising, delightful image

TONE: Joyful, bouncy, whimsical - prioritize wordplay and 'out of this world' imagination over logic

MANDATORY OUTPUT FORMAT:
You MUST follow this exact format. Do not include any introductory text, explanations, or commentary.

Required structure:
1. Create a whimsical title that captures the poem's essence
2. Format the title as a markdown heading using # Title Here
3. Leave one blank line after the title
4. Output the poem with proper line breaks between stanzas
5. Use markdown formatting for any emphasis if needed

Example of correct formatting:
# The Wiggle-Waggle Wonder

First stanza line one here,
First stanza line two here,
First stanza line three here,
First stanza line four here.

Second stanza line one here,
Second stanza line two here,
Second stanza line three here,
Second stanza line four here.

CRITICAL: Output ONLY the formatted title and poem. No additional text, explanations, or introductory phrases whatsoever.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keywords } = req.body;

  if (!Array.isArray(keywords)) {
    return res.status(400).json({ error: 'Invalid keywords format' });
  }

  try {    
    const keywordsString = keywords.join(', ');

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `My keywords are ${keywordsString}. Please generate a poem!`,
        },
      ],
    });

    res.status(200).json({ result: msg.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate a poem' });
  }
  console.log("REQUEST BODY:", req.body);
}
