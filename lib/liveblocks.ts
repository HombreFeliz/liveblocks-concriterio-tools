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
  }
}

export {};
