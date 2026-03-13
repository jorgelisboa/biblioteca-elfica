"use client";

interface SheetHeaderProps {
  nome: string;
  apelido: string;
  idade: string;
  onChange: (field: "nome" | "apelido" | "idade", value: string) => void;
}

export function SheetHeader({ nome, apelido, idade, onChange }: SheetHeaderProps) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-500">
        Identificação
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => onChange("nome", e.target.value)}
            placeholder="Nome completo"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Apelido
          </label>
          <input
            type="text"
            value={apelido}
            onChange={(e) => onChange("apelido", e.target.value)}
            placeholder="Apelido"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Idade
          </label>
          <input
            type="number"
            min={0}
            value={idade}
            onChange={(e) => onChange("idade", e.target.value)}
            placeholder="Idade"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30"
          />
        </div>
      </div>
    </div>
  );
}
