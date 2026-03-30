"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  useLiveblocksExtension,
  FloatingComposer,
  FloatingThreads,
  AnchoredThreads,
  FloatingToolbar,
  Toolbar,
} from "@liveblocks/react-tiptap";
import { useThreads } from "@liveblocks/react/suspense";

export function CollaborativeEditor() {
  const liveblocks = useLiveblocksExtension();
  const { threads } = useThreads();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Empieza a escribir… Los demás verán tus cambios en tiempo real.",
      }),
      liveblocks,
    ],
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  return (
    <div className="relative flex gap-6 h-full">
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="bg-surface rounded-lg border border-border flex flex-col flex-1 min-h-0">
          <div className="shrink-0 border-b border-border">
            <Toolbar editor={editor} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <EditorContent editor={editor} />
          </div>
          <FloatingComposer editor={editor} />
          <FloatingToolbar editor={editor} />
          <FloatingThreads editor={editor} threads={threads} />
        </div>
      </div>
      <div className="hidden lg:block w-[300px] shrink-0 overflow-y-auto">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
    </div>
  );
}
