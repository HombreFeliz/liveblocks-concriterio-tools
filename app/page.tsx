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
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

      <ClientSideSuspense fallback={<Loading />}>
        <CollaborativeEditor />
      </ClientSideSuspense>

      <div className="space-y-4 pt-8">
        <BannerConsultoria />
        <BannerNewsletter />
        <BannerRepositorio />
        <StackSection />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id="demo-concriterio" initialPresence={{ cursor: null, name: "", color: "" }}>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <ClientSideSuspense fallback={<Loading />}>
            <Room />
          </ClientSideSuspense>
        </main>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
