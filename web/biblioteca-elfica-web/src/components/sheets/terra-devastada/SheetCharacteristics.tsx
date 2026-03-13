"use client";

import { Plus } from "lucide-react";
import { SheetCharacteristicItem } from "./SheetCharacteristicItem";

export interface Caracteristica {
  id: string;
  nome: string;
  valor: string;
}

interface SheetCharacteristicsProps {
  caracteristicas: Caracteristica[];
  onChange: (id: string, field: "nome" | "valor", value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const MAX = 12;
const MIN = 6;

export function SheetCharacteristics({
  caracteristicas,
  onChange,
  onAdd,
  onRemove,
}: SheetCharacteristicsProps) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-red-500">
          Características
        </h2>
        <span className="text-xs text-zinc-500">
          {caracteristicas.length}/{MAX}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {caracteristicas.map((c) => (
          <SheetCharacteristicItem
            key={c.id}
            {...c}
            canRemove={caracteristicas.length > MIN}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {caracteristicas.length < MAX && (
        <button
          onClick={onAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 py-2.5 text-sm text-zinc-500 transition hover:border-red-700/50 hover:text-red-400"
        >
          <Plus size={16} />
          Adicionar característica
        </button>
      )}
    </div>
  );
}
