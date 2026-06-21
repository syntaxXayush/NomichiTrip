import { GoogleGenerativeAI } from '@google/generative-ai';

const BRAND_VOICE = `You write WhatsApp messages for Nomichi, a premium community-led
travel company that runs slow, offbeat, small-group journeys.

Voice: warm, human, calm, unhurried, never salesy. Write like a thoughtful friend who
happens to plan beautiful trips. Short sentences. No emojis spam (one, at most, only if
it fits). No corporate filler. No exclamation overload. Indian English is fine.

Rules:
- Keep it under 90 words.
- Open with the traveller's first name.
- Reference their trip and context naturally.
- End with a single, gentle next step or question.
- Never invent prices, dates, or promises not given in the context.
- Plain text only. No markdown.`;

const INTENTS: Record<string, string> = {
  intro: 'A warm first hello after they enquired. Acknowledge their interest and open a conversation.',
  follow_up: 'A gentle follow-up since we haven\'t heard back. Stay light, no pressure.',
  vibe_check: 'Share a few honest details so they can feel whether this trip is right for them — the "vibe check".',
  nudge: 'A soft nudge to help them decide, with a clear easy next step.',
};

export type Intent = keyof typeof INTENTS;

export type LeadContext = {
  name: string;
  tripName?: string | null;
  destination?: string | null;
  dates?: string | null;
  groupType?: string | null;
  preferredMonth?: string | null;
  expectations?: string | null;
  lastNote?: string | null;
};

export async function generateWhatsAppMessage(
  intent: Intent,
  ctx: LeadContext
): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not configured');

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: BRAND_VOICE,
  });

  const prompt = `Goal of this message: ${INTENTS[intent] ?? INTENTS.intro}

Traveller context:
- Name: ${ctx.name}
- Trip: ${ctx.tripName ?? 'not selected yet'}
- Destination: ${ctx.destination ?? '—'}
- Trip dates: ${ctx.dates ?? '—'}
- Travelling as: ${ctx.groupType ?? '—'}
- Preferred month: ${ctx.preferredMonth ?? '—'}
- What they're hoping for: ${ctx.expectations ?? '—'}
- Most recent call note: ${ctx.lastNote ?? 'none yet'}

Write the WhatsApp message now.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
