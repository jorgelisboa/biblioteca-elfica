import { Hero } from "@/components/landing/Hero";
import { SystemCard } from "@/components/landing/SystemCard";

const sistemas = [
  {
    name: "Terra Devastada",
    description: "Sobreviva em um mundo pós-apocalíptico repleto de perigos.",
    href: "/terra-devastada",
    locked: false,
    gradient:
      "linear-gradient(135deg, #7c2d12 0%, #431407 50%, #1c0a00 100%)",
  },
  {
    name: "Ordem Paranormal",
    description: "Enfrente o desconhecido em investigações sobrenaturais.",
    href: "/ordem-paranormal",
    locked: true,
    gradient:
      "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f0a1e 100%)",
  },
  {
    name: "D&D 5e",
    description: "Explore masmorras e conquiste reinos na edição clássica.",
    href: "/dnd-5e",
    locked: true,
    gradient:
      "linear-gradient(135deg, #14532d 0%, #166534 40%, #052e16 100%)",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Hero />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-2xl font-bold text-white">Sistemas</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {sistemas.map((sistema, i) => (
            <SystemCard key={sistema.href} {...sistema} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
