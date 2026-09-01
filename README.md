# TelegramBotSummarizer

> Drop any article link in the Telegram chat and get 3 crisp bullet points back — powered by Gemini AI. No reading required.

**🤖 Try the Bot:** [@TGTxtSummProjAutomationBot](https://t.me/TGTxtSummProjAutomationBot)  
**🌐 Live Web Dashboard:** [bot-app-psi.vercel.app](https://bot-app-psi.vercel.app)

---

## ⚡ How the Compute Works (Vercel Serverless + Webhooks)

When you deploy this project to Vercel, it isn't just hosting a static website — **Vercel acts as the full compute engine for the Telegram bot.**

Instead of keeping a computer running 24/7 (polling), this bot uses **Serverless Webhooks**:
1. When a user sends a message on Telegram, Telegram makes a `POST` request to our live Vercel API endpoint (`/api/webhook`).
2. Vercel instantly spins up a secure, temporary compute container (a Serverless Function).
3. The function reads the article, talks to the Gemini API, formats the summary, and replies to Telegram.
4. The compute container shuts down immediately.

Because Vercel Serverless Functions scale automatically from zero to millions, the bot can handle hundreds of users at the exact same time without ever crashing, and you don't pay for idle server time.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **AI Model**: Google Gemini 2.5 Flash (`@google/genai`)
- **Bot Engine**: Telegraf
- **Content Extraction**: Mozilla Readability + JSDOM
- **UI / Animations**: Tailwind CSS, shadcn/ui, Framer Motion
- **Infrastructure**: Vercel Serverless Edge/Node

## 🚀 Local Development

Create a `.env.local` file with your keys:
```env
BOT_TOKEN=your_telegram_bot_token
GEMINI_API_KEY=your_gemini_api_key
```

Run the local polling script to test without deploying:
```bash
node local-test.js
```

Or run the Next.js dev server to view the web dashboard:
```bash
npm run dev
```
