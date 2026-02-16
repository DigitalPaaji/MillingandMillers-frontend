"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Simple Button Component for the Toolbar
const ToolbarButton = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-stone-800 text-white" // Active state (Dark)
        : "text-stone-600 hover:bg-stone-200" // Inactive state
    }`}
    type="button" 
  >
    {children}
  </button>
);

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-stone-200 bg-stone-50 rounded-t-lg">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        Bold
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        Italic
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        Strike
      </ToolbarButton>
      
      {/* Divider */}
      <div className="w-[1px] bg-stone-300 mx-1 my-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
      >
        H3
      </ToolbarButton>

      {/* Divider */}
      <div className="w-[1px] bg-stone-300 mx-1 my-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        Bullet List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        Ordered List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        Quote
      </ToolbarButton>
    </div>
  );
};

export default function RichEditor({ onChange, value }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3], // Only allow H2 and H3
        },
      }),
    ],
    content: value || "", 
    editorProps: {
      attributes: {
    
        class: "prose prose-stone max-w-none p-4  outline-none", 
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-stone-200 rounded-lg shadow-sm bg-white overflow-hidden w-full min-h-40 " >
      <Toolbar editor={editor} />
      <EditorContent editor={editor}  classNamw="richeditor"/>

    </div>
  );
}