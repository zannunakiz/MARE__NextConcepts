"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

const links = [
  { label: "Email", href: "richky.abednego@gmail.com", icon: Mail, copyable: true },
  { label: "GitHub", href: "https://github.com/zannunakiz/MARE__NextConcepts", icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/richky_4srg", icon: FaInstagram },
];

export function SiteFooter() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      toast.success("Email copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy email");
    });
  };

  return (
    <footer className="border-t border-primary/15 bg-secondary/35">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-medium tracking-tight transition-colors hover:text-primary"
          >
            Richky Abednego
          </Link>
          <span className="text-xs text-muted-foreground">
            MARE Practice · Built for understanding the details · Originally made for personal practice, might as well share it LOL ~!
          </span>
        </div>

        <nav aria-label="Footer navigation" className="flex items-center gap-1">
          {links.map(({ label, href, icon: Icon, copyable }) => {
            const isEmail = copyable;

            return (
              <a
                key={label}
                href={isEmail ? "#" : href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                aria-label={isEmail ? `Copy ${label} to clipboard` : `Open ${label} in a new tab`}
                onClick={isEmail ? (e) => handleEmailClick(e, href) : undefined}
                className="group inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon
                  className="size-4 transition-transform group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="sr-only">{label}</span>
              </a>
            );
          })}

          <span className="ml-3 border-l border-border pl-4 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()}
          </span>
        </nav>
      </div>
    </footer>
  );
}