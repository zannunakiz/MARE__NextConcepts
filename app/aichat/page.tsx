"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ChatMessage } from "@/types/chat";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to MARE Chat. Ask anything, explore an idea, or use this space to practice thinking through a problem.",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const storageKey = "mare-ai-chat-history";

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      toast.error("Could not restore chat history");
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      window.localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages]);

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([welcomeMessage]);
    setIsTyping(false);
    window.localStorage.removeItem(storageKey);
    toast("Conversation cleared");
  };

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsTyping(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/aichat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.id !== "welcome")
            .map(({ role, content: text }) => ({
              role,
              content: text,
            })),
        }),
        signal: controller.signal,
      });

      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(data.error ?? "The AI could not respond");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response as string,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error(
        error instanceof Error ? error.message : "Unable to connect to the AI"
      );
      setMessages((current) =>
        current.filter((message) => message.id !== userMessage.id)
      );
    } finally {
      if (abortRef.current === controller) {
        setIsTyping(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-3.5rem)] flex-col overflow-x-hidden px-3 py-4 sm:px-6 sm:py-5"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between py-10">
          <PageIntro
            eyebrow="Practice lab / chat"
            title="Talk through the problem."
            description="Ask questions, explore ideas, and practice thinking through a problem with a streamed AI conversation."
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              className="self-start sm:mb-1 p-4 bg-red-700"
              variant="default"
              size="sm"
              onClick={resetChat}
              disabled={isTyping}
            >
              <Trash2 />
              Clear history
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="flex h-[min(620px,calc(100vh-16rem))] min-h-[460px] flex-col overflow-hidden pb-0 my-2 sm:min-h-[500px]">
            <div className="flex items-center gap-2 border-b px-4 py-3 text-xs text-muted-foreground sm:px-6">
              <span>OpenRouter practice chat</span>
              <span className="ml-auto">openrouter/free</span>
            </div>

            <ChatMessageList messages={messages} isTyping={isTyping} />
            <ChatInput disabled={isTyping} onSend={sendMessage} />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
