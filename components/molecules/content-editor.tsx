"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ContentEditorProps {
  content: string;
  onChange: (html: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
}

export default function ContentEditor({ content, onChange, onUploadImage }: ContentEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL du lien:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const handleImageButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor || !onUploadImage) return;
      setIsUploadingImage(true);
      try {
        const imageUrl = await onUploadImage(file);
        editor.chain().focus().setImage({ src: imageUrl }).run();
      } finally {
        setIsUploadingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [editor, onUploadImage]
  );

  if (!editor) return null;

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        >
          Paragraphe
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          Titre secondaire
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          Sous-titre
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          Gras
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          Italique
        </ToolbarButton>
        <ToolbarButton onClick={setLink} active={editor.isActive("link")}>
          Lien
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          Liste à puces
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          Liste numérotée
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          active={editor.isActive("table")}
        >
          Tableau
        </ToolbarButton>
        {editor.isActive("table") && (
          <>
            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              active={false}
            >
              + Colonne
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteColumn().run()}
              active={false}
            >
              - Colonne
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowAfter().run()}
              active={false}
            >
              + Ligne
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteRow().run()}
              active={false}
            >
              - Ligne
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
              active={false}
            >
              Supprimer tableau
            </ToolbarButton>
          </>
        )}
        {onUploadImage && (
          <ToolbarButton
            onClick={handleImageButtonClick}
            active={false}
            disabled={isUploadingImage}
          >
            {isUploadingImage ? "Chargement..." : "Image"}
          </ToolbarButton>
        )}
      </div>
      <div className="p-4 min-h-[200px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 [&_.tiptap]:outline-none [&_.tiptap]:min-h-[180px] [&_.tiptap_h2]:text-2xl [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:mt-6 [&_.tiptap_h2]:mb-3 [&_.tiptap_h3]:text-xl [&_.tiptap_h3]:font-semibold [&_.tiptap_h3]:mt-4 [&_.tiptap_h3]:mb-2 [&_.tiptap_p]:mb-3 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:ml-6 [&_.tiptap_ul]:mb-3 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:ml-6 [&_.tiptap_ol]:mb-3 [&_.tiptap_a]:text-teal-600 [&_.tiptap_a]:underline [&_.tiptap_table]:w-full [&_.tiptap_table]:border-collapse [&_.tiptap_table]:mb-4 [&_.tiptap_th]:border [&_.tiptap_th]:border-gray-300 [&_.tiptap_th]:bg-gray-100 [&_.tiptap_th]:px-3 [&_.tiptap_th]:py-2 [&_.tiptap_th]:text-left [&_.tiptap_th]:font-semibold dark:[&_.tiptap_th]:border-gray-600 dark:[&_.tiptap_th]:bg-gray-800 [&_.tiptap_td]:border [&_.tiptap_td]:border-gray-300 [&_.tiptap_td]:px-3 [&_.tiptap_td]:py-2 dark:[&_.tiptap_td]:border-gray-600 [&_.tiptap_img]:max-w-full [&_.tiptap_img]:h-auto [&_.tiptap_img]:rounded-lg [&_.tiptap_img]:my-4">
        <EditorContent editor={editor} />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelected}
          className="hidden"
        />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  children,
  disabled = false,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer px-3 py-1 rounded text-sm font-medium transition ${
        disabled
          ? "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          : active
            ? "bg-teal-600 text-white"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      {children}
    </button>
  );
}
