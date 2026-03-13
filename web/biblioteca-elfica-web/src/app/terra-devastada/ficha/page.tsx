"use client";

import { useState } from "react";
import { SheetHeader } from "@/components/sheets/terra-devastada/SheetHeader";
import {
  SheetCharacteristics,
  type Caracteristica,
} from "@/components/sheets/terra-devastada/SheetCharacteristics";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const caracteristicasIniciais: Caracteristica[] = [
  { id: "1", nome: "Força", valor: "" },
  { id: "2", nome: "Agilidade", valor: "" },
  { id: "3", nome: "Vigor", valor: "" },
  { id: "4", nome: "Percepção", valor: "" },
  { id: "5", nome: "Intelecto", valor: "" },
  { id: "6", nome: "Presença", valor: "" },
];

export default function FichaPage() {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [idade, setIdade] = useState("");
  const [caracteristicas, setCaracteristicas] = useState<Caracteristica[]>(
    caracteristicasIniciais
  );

  function handleHeaderChange(
    field: "nome" | "apelido" | "idade",
    value: string
  ) {
    if (field === "nome") setNome(value);
    else if (field === "apelido") setApelido(value);
    else setIdade(value);
  }

  function handleCaracteristicaChange(
    id: string,
    field: "nome" | "valor",
    value: string
  ) {
    setCaracteristicas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function handleAddCaracteristica() {
    setCaracteristicas((prev) => [
      ...prev,
      { id: crypto.randomUUID(), nome: "", valor: "" },
    ]);
  }

  function handleRemoveCaracteristica(id: string) {
    setCaracteristicas((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/terra-devastada"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            Terra Devastada
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white">
            Ficha do Personagem
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <SheetHeader
            nome={nome}
            apelido={apelido}
            idade={idade}
            onChange={handleHeaderChange}
          />
          <SheetCharacteristics
            caracteristicas={caracteristicas}
            onChange={handleCaracteristicaChange}
            onAdd={handleAddCaracteristica}
            onRemove={handleRemoveCaracteristica}
          />
        </div>
      </div>
    </main>
  );
}
