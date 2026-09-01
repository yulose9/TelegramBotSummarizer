# AI Article Summarizer (Telegram Bot)

An AI-powered Telegram bot built as a Serverless Next.js application. 
It receives a URL from a user, fetches and parses the article, and uses Google's Gemini AI to return a concise 3-bullet-point summary.

## Architecture

- **Framework**: Next.js (App Router)
- **UI**: Tailwind CSS + shadcn/ui for the landing page
- **Bot Engine**: `telegraf` handling incoming Telegram Webhooks
- **Content Extraction**: `@mozilla/readability` + `jsdom`
- **AI**: `@google/genai` (Gemini 2.5 Flash model)
- **Deployment**: Designed to be deployed on Vercel as a serverless function

## How It Works

1. **User sends URL**: The bot receives a message containing a link via Telegram Webhook (handled by `src/app/api/webhook/route.ts`).
2. **Bot grabs content**: The Next.js API route fetches the HTML and cleans it up using Mozilla Readability.
3. **Prompt asks for bullets**: The cleaned article text is sent to Gemini AI with a strict prompt to summarize.
4. **Response goes back**: The AI response is sent back to the Telegram chat.

## What I'd Add Next

- **Caching**: Store previously summarized URLs in a database (like Supabase or Redis) to save AI tokens and respond instantly.
- **Support for Paywalls/PDFs**: Adding Playwright or a specialized extraction API (like Firecrawl) to handle dynamic content or PDFs.
- **Audio Summaries**: Integrate TTS (Text-to-Speech) so the bot sends voice notes instead of text.
