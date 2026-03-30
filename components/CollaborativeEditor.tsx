"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLiveblocksExtension, FloatingComposer, FloatingThreads, AnchoredThreads } from "@liveblocks/react-tiptap";
import { useThreads } from "@liveblocks/react/suspense";

export function CollaborativeEditor() {
  const liveblocks = useLiveblocksExtension();
  const { threads } = useThreads();

  const editor = useEditor({
    extensions: [
      StarterKit,
      liveblocks,
    ],
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  return (
    <div className="relative flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <EditorContent editor={editor} />
          <FloatingComposer editor={editor} />
          <FloatingThreads editor={editor} threads={threads} />
        </div>
      </div>
      <div className="hidden lg:block w-[300px] shrink-0">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
    </div>
  );
}
