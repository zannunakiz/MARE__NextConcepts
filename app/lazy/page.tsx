"use client";

import { PageIntro } from "@/components/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { lazyItems } from "@/lib/lazy-items";
import { motion } from "framer-motion";
import { ArrowDown, Eye } from "lucide-react";
import * as React from "react";

export default function LazyPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <PageIntro
        eyebrow="Lazy rendering"
        title="Render work when it is needed."
        description="These twenty image cards use Intersection Observer. The shell appears immediately, while the content is mounted only after it enters the viewport. Scroll slowly and watch the render counter."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lazyItems.map((item, index) => (
          <LazyCard key={item.image_url} item={item} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function LazyCard({
  item,
  index,
}: {
  item: (typeof lazyItems)[number];
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(node);
        observer.disconnect();
      },
      { root: null, rootMargin: "160px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card ref={ref} className="overflow-hidden">
        <CardContent className="flex flex-col gap-4 p-4">
          {visible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 rounded-b-xl bg-background/80 p-3 text-xs text-foreground backdrop-blur-sm">
                  <span className="font-mono uppercase tracking-[0.16em]">
                    Image {String(index).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Badge variant="secondary">{item.tag}</Badge>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Eye className="size-3.5" />
                Rendered on intersection
              </div>
            </motion.div>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-center text-muted-foreground">
              <ArrowDown />
              <span className="text-sm">Scroll to render card {index}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}