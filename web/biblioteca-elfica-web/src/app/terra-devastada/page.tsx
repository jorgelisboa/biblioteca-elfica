"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ScrollText, UserRound } from "lucide-react";

type Aba = "introducao" | "criacao";

export default function TerraDevastadaPage() {
  const [aba, setAba] = useState<Aba>("introducao");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 px-6 py-5 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-4 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            Sistema
          </p>
          <h1 className="mt-1 text-3xl font-bold">Terra Devastada</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-4xl gap-1 px-6">
          <button
            onClick={() => setAba("introducao")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              aba === "introducao"
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <ScrollText size={16} />
            Introdução
          </button>
          <button
            onClick={() => setAba("criacao")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              aba === "criacao"
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <UserRound size={16} />
            Criação de Personagem
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <AnimatePresence mode="wait">
          {aba === "introducao" && (
            <motion.div
              key="introducao"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-8 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold text-red-400">
                  O Fim do Mundo Que Conhecíamos
                </h2>
                <div className="flex flex-col gap-4 leading-relaxed text-zinc-300">
                  <p>
                    O mundo acabou. Não de uma vez — foi lento, doloroso, como
                    uma ferida que apodrece em silêncio. As cidades viraram
                    cinzas. Os governos desmoronaram. E o que sobrou foi isso:
                    poeira, desespero e a pergunta que não sai da cabeça.
                  </p>
                  <p className="italic text-zinc-400">
                    "Vale a pena continuar?"
                  </p>
                  <p>
                    Terra Devastada é um RPG pós-apocalíptico brasileiro onde
                    você interpreta sobreviventes tentando reconstruir algum
                    sentido em meio ao caos. Cada decisão tem peso. Cada aliado
                    pode ser a diferença entre viver mais um dia ou virar mais
                    um esqueleto no deserto.
                  </p>
                  <p>
                    Não existem heróis aqui. Só pessoas — com medos, cicatrizes
                    e a teimosia de ainda estarem de pé.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    titulo: "Ambientação",
                    descricao: "Brasil pós-colapso, décadas após o fim da civilização moderna.",
                  },
                  {
                    titulo: "Tom",
                    descricao: "Sombrio, humano e cheio de escolhas sem resposta certa.",
                  },
                  {
                    titulo: "Foco",
                    descricao: "Sobrevivência, moralidade e os laços entre os personagens.",
                  },
                ].map((item) => (
                  <div
                    key={item.titulo}
                    className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-5"
                  >
                    <h3 className="mb-2 text-sm font-semibold text-red-400">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-zinc-400">{item.descricao}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {aba === "criacao" && (
            <motion.div
              key="criacao"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6 py-8 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                <UserRound size={36} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Crie seu Sobrevivente
                </h2>
                <p className="mt-2 max-w-md text-zinc-400">
                  Preencha a ficha do seu personagem com nome, apelido, idade e
                  suas características únicas no mundo devastado.
                </p>
              </div>
              <Link
                href="/terra-devastada/ficha"
                className="rounded-lg bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-600 hover:scale-105"
              >
                Abrir Ficha
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
