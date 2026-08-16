"use client";

import { ActivityCard } from "@/components/cards/card-activity";
import { BillingToggleCard } from "@/components/cards/card-billing-toggle";
import { ChatCard } from "@/components/cards/card-chat";
import { ChecklistCard } from "@/components/cards/card-checklist";
import { CodeCard } from "@/components/cards/card-code";
import { EmptyStateCard } from "@/components/cards/card-empty-state";
import { EventCard } from "@/components/cards/card-event";
import { ForecastCard } from "@/components/cards/card-forecast";
import { GoalCard } from "@/components/cards/card-goal";
import { OnboardingCard } from "@/components/cards/card-onboarding";
import { PricingCard } from "@/components/cards/card-pricing";
import { ProductCard } from "@/components/cards/card-product";
import { ProfileCard } from "@/components/cards/card-profile";
import { ReferralCard } from "@/components/cards/card-referral";
import { SocialCard } from "@/components/cards/card-social";
import { StatCard } from "@/components/cards/card-stat";
import { StatusCard } from "@/components/cards/card-status";
import { TableCard } from "@/components/cards/card-table";
import { TaskCard } from "@/components/cards/card-task";
import { TeamCard } from "@/components/cards/card-team";
import { TestimonialCard } from "@/components/cards/card-testimonial";
import { UploadCard } from "@/components/cards/card-upload";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

const cards: { component: ComponentType; span?: string }[] = [
  { component: StatCard },
  { component: ProfileCard },
  { component: PricingCard, span: "sm:col-span-2" },
  { component: TeamCard },
  { component: ActivityCard },
  { component: TaskCard },
  { component: EventCard, span: "sm:col-span-2" },
  { component: UploadCard },
  { component: ChatCard },
  { component: ProductCard },
  { component: BillingToggleCard },
  { component: ChecklistCard },
  { component: GoalCard },
  { component: StatusCard, span: "sm:col-span-2" },
  { component: TableCard },
  { component: CodeCard },
  { component: SocialCard },
  { component: OnboardingCard },
  { component: EmptyStateCard },
  { component: TestimonialCard, span: "sm:col-span-2" },
  { component: ForecastCard },
  { component: ReferralCard },
]

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map(({ component: Card, span }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
          className={span}
        >
          <Card />
        </motion.div>
      ))}
    </div>
  )
}