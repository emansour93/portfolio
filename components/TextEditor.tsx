"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

function MenuBar({ editor }: { editor: any }) {
  if (!editor) return null;

  return (
    <div className="flex gap-2 mb-2 border-b pb-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm border rounded ${
          editor.isActive("bold") ? "bg-black text-white" : ""
        }`}
      >
        Bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm border rounded ${
          editor.isActive("italic") ? "bg-black text-white" : ""
        }`}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 text-sm border rounded ${
          editor.isActive("bulletList") ? "bg-black text-white" : ""
        }`}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm border rounded ${
          editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : ""
        }`}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className="px-2 py-1 text-sm border rounded"
      >
        P
      </button>
    </div>
  );
}
export default function TextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // ✅ FIX HERE
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  return (
    <div className="border rounded-lg p-3 bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
