"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import { cn } from "@/lib/utils";

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl border border-white/10 my-8 shadow-2xl",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary hover:underline cursor-pointer",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-xl bg-black border border-white/10 p-4 font-mono text-sm leading-relaxed my-6",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-xl max-w-none focus:outline-none min-h-[500px] py-12",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full bg-white/[0.01] border border-white/10 rounded-3xl overflow-hidden focus-within:border-primary/30 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-white/[0.03] border-b border-white/10 backdrop-blur-xl sticky top-0 z-10">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          active={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          active={editor.isActive("blockquote")}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
          active={editor.isActive("codeBlock")}
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 md:px-16 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({ 
  children, 
  onClick, 
  active = false 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-all hover:bg-white/10",
        active ? "text-primary bg-primary/10" : "text-white/40"
      )}
    >
      {children}
    </button>
  );
}
