"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

function Avatar({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white border-2 border-background shrink-0"
        style={{ backgroundColor: color }}
      >
        {initial}
      </div>
      <span className="text-sm text-text-primary truncate">{name}</span>
    </div>
  );
}

export function PresencePanel() {
  const self = useSelf();
  const others = useOthers();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {self && (
          <div className="flex items-center gap-2">
            <Avatar
              name={self.info.name}
              color={self.info.color}
            />
            <span className="text-xs text-text-muted">(tú)</span>
          </div>
        )}
        {others.map((user) => (
          <Avatar
            key={user.connectionId}
            name={user.info.name}
            color={user.info.color}
          />
        ))}
      </div>
      <span className="text-xs text-text-muted font-mono">
        {others.length + 1} online
      </span>
    </div>
  );
}
