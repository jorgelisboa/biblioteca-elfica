"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm font-medium tracking-[0.3em] uppercase text-emerald-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Sua biblioteca pessoal de RPG
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Biblioteca <span className="text-emerald-400">Élfica</span>
        </motion.h1>

        <motion.p
          className="max-w-md text-lg text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Guarde, organize e acesse seus livros, VTTs e materiais de RPG em um
          só lugar.
        </motion.p>

        <motion.div
          className="flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/entrar"
            className="rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-500 hover:scale-105"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg border border-zinc-700 px-8 py-3 font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white hover:scale-105"
          >
            Criar Conta
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
