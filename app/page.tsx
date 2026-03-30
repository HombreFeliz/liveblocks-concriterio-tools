"use client";

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { PresencePanel } from "@/components/PresencePanel";
import { BannerConsultoria } from "@/components/BannerConsultoria";
import { BannerNewsletter } from "@/components/BannerNewsletter";
import { BannerRepositorio } from "@/components/BannerRepositorio";
import { StackSection } from "@/components/StackSection";

function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-text-muted text-sm">Conectando a la sala…</div>
    </div>
  );
}

function Room() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Editor colaborativo
            </h1>
            <p className="text-text-muted text-sm mt-1">
              Sala{" "}
              <code className="font-mono text-xs bg-surface-elevated px-1.5 py-0.5 rounded">
                demo-concriterio
              </code>
            </p>
          </div>
          <ClientSideSuspense fallback={<div className="text-text-muted text-sm">Cargando presencia…</div>}>
            <PresencePanel />
          </ClientSideSuspense>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 py-4">
          <ClientSideSuspense fallback={<Loading />}>
            <CollaborativeEditor />
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
      <RoomProvider id="demo-concriterio" initialPresence={{ cursor: null, name: "", color: "" }}>
        <ClientSideSuspense fallback={<Loading />}>
          <Room />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
