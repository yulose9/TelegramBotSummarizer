import { NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';
import { GoogleGenAI } from '@google/genai';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || 'dummy_token');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Escape special HTML characters so Telegram doesn't choke
function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

bot.start((ctx) => {
  ctx.reply(
    "👋 <b>Welcome to the AI Article Summarizer!</b>\n\n" +
    "I'm an AI-powered automation bot that saves you time.\n\n" +
    "🔗 <b>Send me any article link</b> and I'll read it for you\n" +
    "📝 Get a <b>3-bullet summary</b> powered by Gemini AI\n" +
    "⚡ Instant results — no sign-up needed\n\n" +
    "Just paste a URL below to get started!",
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🌐 Open Dashboard', web_app: { url: 'https://bot-app-psi.vercel.app/miniapp.html' } }],
          [{ text: '📖 How to Use', callback_data: 'how_to_use' }]
        ]
      }
    }
  );
});

bot.action('how_to_use', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    "📖 <b>How to Use This Bot</b>\n\n" +
    "1️⃣ Copy a link to any article, blog post, or news story\n" +
    "2️⃣ Paste the URL right here in this chat\n" +
    "3️⃣ Wait a few seconds while Gemini AI reads and summarizes it\n" +
    "4️⃣ Get your 3-bullet summary instantly!\n\n" +
    "💡 <i>Tip: Works best with news articles, blog posts, and documentation pages.</i>",
    { parse_mode: 'HTML' }
  );
});

bot.help((ctx) => {
  ctx.reply("Send me any URL and I'll summarize it for you!");
});

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);

  if (!urls) {
    return ctx.reply('Send me a link to an article, and I will summarize it for you in 3 bullet points!');
  }

  const url = urls[0];
  const processingMessage = await ctx.reply('⏳ Fetching and reading the article...');

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TelegramBotSummarizer/1.0)' }
    });
    if (!response.ok) throw new Error('Failed to fetch the URL');
    const html = await response.text();

    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      throw new Error('Could not extract readable text from this page.');
    }

    await ctx.telegram.editMessageText(
      ctx.chat.id, 
      processingMessage.message_id, 
      undefined, 
      '🧠 Article extracted! Generating summary with Gemini AI...'
    );

    const prompt = `You are a professional article summarizer. Summarize the following article in exactly 3 key takeaways.

Rules:
- Each takeaway should be 1-2 sentences max
- Use plain text only, no markdown, no asterisks, no special formatting
- Do NOT include bullet characters — just return each takeaway on its own line
- Separate each takeaway with a blank line
- Be insightful, not generic

Title: ${article.title}

Content:
${article.textContent.slice(0, 20000)}`;
    
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-05-20',
      contents: prompt,
    });

    const rawSummary = (aiResponse.text || 'No summary generated.').trim();
    const title = escapeHTML(article.title || 'Untitled');

    const bullets = rawSummary
      .split(/\n+/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 3);

    const formatted = bullets.map((b, i) => {
      const emoji = ['💡', '🔍', '⚡'][i] || '•';
      return `${emoji}  ${escapeHTML(b)}`;
    }).join('\n\n');

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      processingMessage.message_id,
      undefined,
      `📰  <b>${title}</b>\n\n━━━━━━━━━━━━━━━━━━━━\n\n${formatted}\n\n━━━━━━━━━━━━━━━━━━━━\n\n🤖 <i>Summarized by Gemini AI</i>`,
      { parse_mode: 'HTML' }
    );

  } catch (error: any) {
    console.error(error);
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      processingMessage.message_id,
      undefined,
      `❌ Sorry, I encountered an error: ${escapeHTML(error.message)}`
    );
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error handling update', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
