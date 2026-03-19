import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

type ButtonRowProps = {
  editor: Editor | null;
};

export default function ButtonRow({ editor }: ButtonRowProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isH1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
    }),
  });

  if (!editor) return null;

  const btn = "rounded border px-3 py-1 text-sm";
  const active = "bg-gray-900 text-white";

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-b pb-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editorState?.isBold ? active : ""}`}
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editorState?.isItalic ? active : ""}`}
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editorState?.isBulletList ? active : ""}`}
      >
        Bullet List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`${btn} ${editorState?.isH1 ? active : ""}`}
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