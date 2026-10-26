import { Database, PenTool, ShoppingBag, GitBranch, BarChart3, Send, Triangle, CreditCard } from "lucide-react";

const stack = [
  { name: "Supabase", icon: Database },
  { name: "Figma", icon: PenTool },
  { name: "Shopify", icon: ShoppingBag },
  { name: "GitHub", icon: GitBranch },
  { name: "PostHog", icon: BarChart3 },
  { name: "Resend", icon: Send },
  { name: "Vercel", icon: Triangle },
  { name: "Stripe", icon: CreditCard },
];

export default function Partners() {
  return (
    <section className="py-5 bg-[#0c1a3a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center gap-10 overflow-x-auto scrollbar-hide">
          <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.2em] whitespace-nowrap shrink-0">
            Onze Stack
          </span>

          <div className="flex items-center gap-8 md:gap-12">
            {stack.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors shrink-0"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
