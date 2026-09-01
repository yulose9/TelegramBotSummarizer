import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Globe,
  Cpu,
  Bot,
  FileText,
  Palette,
  Rocket,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift, TapScale } from "@/components/animations";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 font-[family-name:var(--font-geist-sans)]">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-base font-semibold tracking-tight text-stone-900">
            summarizer<span className="text-blue-600">.</span>bot
          </span>
          <TapScale>
            <a 
              href="https://t.me/TGTxtSummProjAutomationBot" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-stone-900 px-5 text-sm hover:bg-stone-800")}
            >
              Open in Telegram
            </a>
          </TapScale>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        <div className="grid gap-12 sm:grid-cols-2 sm:items-center">

          <div className="space-y-8">
            <div className="space-y-5">
              <FadeIn delay={0.1}>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium tracking-wide">
                  Gemini API · gemini-2.5-flash
                </Badge>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
                  Read less.
                  <br />
                  Know more.
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="max-w-md text-lg leading-relaxed text-stone-500" style={{ wordSpacing: "0.05em" }}>
                  Drop any article link into the Telegram bot
                  and get back three sharp bullet points —
                  in seconds, not minutes.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.4}>
              <div className="flex items-center gap-3">
                <TapScale>
                  <a 
                    href="https://t.me/TGTxtSummProjAutomationBot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg" }), "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-7 text-base font-medium hover:bg-blue-700")}
                  >
                    Try the Bot →
                  </a>
                </TapScale>
                <TapScale>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg", variant: "outline" }), "whitespace-nowrap rounded-full px-7 text-base font-medium border-stone-300 text-stone-700 hover:bg-stone-100 bg-white")}
                  >
                    View Source
                  </a>
                </TapScale>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} className="flex justify-center sm:justify-end">
            <img
              src="/hero.jpg"
              alt="Article summarization illustration"
              className="w-full max-w-sm rounded-2xl shadow-lg"
            />
          </FadeIn>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* How It Works */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <FadeIn className="mb-14 max-w-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">
            Three steps. Zero effort.
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Paste a link",
              desc: "Send any article URL to the bot in Telegram — news, blogs, docs, anything.",
            },
            {
              step: "02",
              title: "AI reads it",
              desc: "The bot fetches the page, strips out the noise, and sends clean text to the Gemini API.",
            },
            {
              step: "03",
              title: "Get your summary",
              desc: "Three crisp bullet points arrive right in the chat. Read in 10 seconds.",
            },
          ].map((item) => (
            <StaggerItem key={item.step}>
              <HoverLift>
                <Card className="border-stone-200 bg-white shadow-none hover:shadow-md transition-shadow duration-300 h-full">
                  <CardContent className="space-y-4 p-7">
                    <span className="text-3xl font-bold text-stone-200">{item.step}</span>
                    <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-500" style={{ wordSpacing: "0.04em", lineHeight: "1.7" }}>
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* Tech Stack */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <FadeIn className="mb-14 max-w-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Under the hood
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">
            Built with modern tools.
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Globe, label: "Framework", value: "Next.js · App Router", color: "text-stone-900" },
            { icon: Cpu, label: "Gemini API", value: "gemini-2.5-flash-preview-05-20", color: "text-blue-600" },
            { icon: Bot, label: "Bot Engine", value: "Telegraf · Webhooks", color: "text-violet-600" },
            { icon: FileText, label: "Content Extraction", value: "Mozilla Readability", color: "text-amber-600" },
            { icon: Palette, label: "UI", value: "Tailwind CSS · shadcn/ui", color: "text-cyan-600" },
            { icon: Rocket, label: "Deployment", value: "Vercel · Serverless", color: "text-emerald-600" },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <HoverLift>
                <div className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md h-full">
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-stone-700">
                      {item.value}
                    </p>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200 bg-stone-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <FadeIn delay={0.1}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stop reading entire articles.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-stone-400" style={{ wordSpacing: "0.05em" }}>
              Let the bot handle the reading.
              You handle the knowing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <TapScale className="inline-block">
              <a 
                href="https://t.me/TGTxtSummProjAutomationBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-8 text-base font-medium hover:bg-blue-700")}
              >
                Open in Telegram →
              </a>
            </TapScale>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="text-sm text-stone-400">
            Built as an AI automation project · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
