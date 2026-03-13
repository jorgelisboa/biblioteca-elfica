"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

interface SystemCardProps {
  name: string;
  description: string;
  href: string;
  locked: boolean;
  gradient: string;
  index: number;
}

export function SystemCard({
  name,
  description,
  href,
  locked,
  gradient,
  index,
}: SystemCardProps) {
  const content = (
    <motion.div
      className={`relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all ${
        locked
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:border-emerald-500/50 hover:brightness-110 hover:scale-[1.03]"
      }`}
      style={{ background: gradient }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {locked && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-sm">
          <Lock size={12} />
          Em breve
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-sm text-zinc-300">{description}</p>
      </div>
    </motion.div>
  );

  if (locked) return content;

  return <Link href={href}>{content}</Link>;
}
