"use client";

import { X } from "lucide-react";

interface SheetCharacteristicItemProps {
  id: string;
  nome: string;
  valor: string;
  canRemove: boolean;
  onChange: (id: string, field: "nome" | "valor", value: string) => void;
  onRemove: (id: string) => void;
}

export function SheetCharacteristicItem({
  id,
  nome,
  valor,
  canRemove,
  onChange,
  onRemove,
}: SheetCharacteristicItemProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={nome}
        onChange={(e) => onChange(id, "nome", e.target.value)}
        placeholder="Característica"
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
      />
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(id, "valor", e.target.value)}
        placeholder="Valor"
        className="w-24 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-center text-white placeholder-zinc-600 outline-none transition focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
      />
      <button
        onClick={() => onRemove(id)}
        disabled={!canRemove}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-500 transition hover:border-red-700 hover:bg-red-950/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <X size={16} />
      </button>
    </div>
  );
}
