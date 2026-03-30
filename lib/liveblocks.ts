import type { LiveList, LiveObject } from "@liveblocks/client";

export type Card = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  author: string;
};

declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
      name: string;
      color: string;
    };
    UserMeta: {
      id: string;
      info: {
        name: string;
        color: string;
      };
    };
    Storage: {
      cards: LiveList<LiveObject<Card>>;
    };
  }
}

export {};
