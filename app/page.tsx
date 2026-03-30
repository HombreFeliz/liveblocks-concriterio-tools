"use client";

import { useState } from "react";
import { LiveList } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { CollaborativeBoard } from "@/components/CollaborativeBoard";
import { PresencePanel } from "@/components/PresencePanel";
import { BannerConsultoria } from "@/components/BannerConsultoria";
import { BannerNewsletter } from "@/components/BannerNewsletter";
import { BannerRepositorio } from "@/components/BannerRepositorio";
import { StackSection } from "@/components/StackSection";

type View = "editor" | "board";

function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-text-muted text-sm">Conectando a la sala…</div>
    </div>
  );
}

function Room() {
  const [view, setView] = useState<View>("editor");

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Liveblocks Demo
              </h1>
              <p className="text-text-muted text-xs mt-0.5">
                Sala{" "}
                <code className="font-mono text-xs bg-surface-elevated px-1 py-0.5 rounded">
                  demo-concriterio
                </code>
              </p>
            </div>
            <nav className="flex gap-1 bg-surface rounded-lg p-1">
              <button
                onClick={() => setView("editor")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  view === "editor"
                    ? "bg-accent text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setView("board")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  view === "board"
                    ? "bg-accent text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Tablero
              </button>
            </nav>
          </div>
          <ClientSideSuspense fallback={<div className="text-text-muted text-sm">Cargando presencia…</div>}>
            <PresencePanel />
          </ClientSideSuspense>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 py-4">
          <ClientSideSuspense fallback={<Loading />}>
            {view === "editor" ? <CollaborativeEditor /> : <CollaborativeBoard />}
          </ClientSideSuspense>
        </div>
      </div>

      <div className="space-y-4 px-4 sm:px-6 py-10 max-w-5xl mx-auto">
        <BannerConsultoria />
        <BannerNewsletter />
        <BannerRepositorio />
        <StackSection />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id="demo-concriterio"
        initialPresence={{ cursor: null, name: "", color: "" }}
        initialStorage={{ cards: new LiveList([]) }}
      >
        <ClientSideSuspense fallback={<Loading />}>
          <Room />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
