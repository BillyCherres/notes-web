import type { Editor } from "@tiptap/react";

type ButtonRowProps = {
  editor: Editor | null;
};

export default function ButtonRow({ editor }: ButtonRowProps) {
  if (!editor) return null;

  const btn = "rounded border px-3 py-1 text-sm";
  const active = "bg-gray-900 text-white";

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-b pb-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
      >
        Bullet List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`${btn} ${
          editor.isActive("heading", { level: 1 }) ? active : ""
        }`}
      >
        H1
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={btn}
      >
        Undo
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={btn}
      >
        Redo
      </button>
    </div>
  );
}