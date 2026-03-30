"use client";

import { useCallback, useRef, useState } from "react";
import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage, useSelf } from "@liveblocks/react/suspense";
import type { Card } from "@/lib/liveblocks";

const CARD_COLORS = [
  { bg: "#FF4F30", label: "Rojo" },
  { bg: "#3B82F6", label: "Azul" },
  { bg: "#22C55E", label: "Verde" },
  { bg: "#EAB308", label: "Amarillo" },
  { bg: "#A855F7", label: "Morado" },
  { bg: "#EC4899", label: "Rosa" },
];

function StickyNote({
  card,
  index,
  onMove,
  onUpdateText,
  onDelete,
}: {
  card: Card;
  index: number;
  onMove: (index: number, x: number, y: number) => void;
  onUpdateText: (index: number, text: string) => void;
  onDelete: (index: number) => void;
}) {
  const dragRef = useRef<{ startX: number; startY: number; cardX: number; cardY: number } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        cardX: card.x,
        cardY: card.y,
      };
    },
    [card.x, card.y]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onMove(index, dragRef.current.cardX + dx, dragRef.current.cardY + dy);
    },
    [index, onMove]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      className="absolute w-52 rounded-lg shadow-lg cursor-grab active:cursor-grabbing select-none"
      style={{
        left: card.x,
        top: card.y,
        backgroundColor: card.color,
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="flex items-center justify-between px-3 pt-2">
        <span className="text-xs font-medium text-white/70 truncate">
          {card.author}
        </span>
        <button
          onClick={() => onDelete(index)}
          className="text-white/50 hover:text-white text-sm leading-none"
        >
          ×
        </button>
      </div>
      <textarea
        className="w-full bg-transparent text-white placeholder-white/50 text-sm p-3 pt-1 resize-none outline-none min-h-[80px]"
        value={card.text}
        placeholder="Escribe tu idea…"
        onChange={(e) => onUpdateText(index, e.target.value)}
        rows={3}
      />
    </div>
  );
}

export function CollaborativeBoard() {
  const cards = useStorage((root) => root.cards);
  const self = useSelf();
  const [selectedColor, setSelectedColor] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const addCard = useMutation(
    ({ storage }) => {
      const list = storage.get("cards");
      const offsetX = Math.random() * 400 + 40;
      const offsetY = Math.random() * 300 + 40;
      list.push(
        new LiveObject<Card>({
          id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          text: "",
          x: offsetX,
          y: offsetY,
          color: CARD_COLORS[selectedColor].bg,
          author: self?.info.name ?? "Anónimo",
        })
      );
    },
    [selectedColor, self]
  );

  const moveCard = useMutation(
    ({ storage }, index: number, x: number, y: number) => {
      const card = storage.get("cards").get(index);
      if (card) {
        card.set("x", x);
        card.set("y", y);
      }
    },
    []
  );

  const updateCardText = useMutation(
    ({ storage }, index: number, text: string) => {
      const card = storage.get("cards").get(index);
      if (card) {
        card.set("text", text);
      }
    },
    []
  );

  const deleteCard = useMutation(
    ({ storage }, index: number) => {
      storage.get("cards").delete(index);
    },
    []
  );

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-t-lg">
        <button
          onClick={addCard}
          className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-150"
        >
          + Añadir tarjeta
        </button>
        <div className="flex items-center gap-1.5">
          {CARD_COLORS.map((c, i) => (
            <button
              key={c.bg}
              onClick={() => setSelectedColor(i)}
              className="w-6 h-6 rounded-full border-2 transition-transform duration-150"
              style={{
                backgroundColor: c.bg,
                borderColor: i === selectedColor ? "#F0F0F0" : "transparent",
                transform: i === selectedColor ? "scale(1.2)" : "scale(1)",
              }}
              title={c.label}
            />
          ))}
        </div>
        <span className="text-text-muted text-xs ml-auto">
          {cards?.length ?? 0} tarjeta{cards?.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div
        ref={boardRef}
        className="flex-1 relative bg-surface-elevated border border-t-0 border-border rounded-b-lg overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2E2E2E 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {cards?.map((card, index) => (
          <StickyNote
            key={card.id}
            card={card}
            index={index}
            onMove={moveCard}
            onUpdateText={updateCardText}
            onDelete={deleteCard}
          />
        ))}
        {(!cards || cards.length === 0) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-text-muted text-sm">
              Pulsa &quot;+ Añadir tarjeta&quot; para empezar a colaborar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
