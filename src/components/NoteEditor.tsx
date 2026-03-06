import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Note } from "../types/Note";
import { EMPTY_TIPTAP_DOC } from "../editor/emptyDoc";
import ButtonRow from "./ButtonRow";

type NoteEditorProps = {
  title: string;
  contentJson: string;

  onChangeTitle?: (value: string) => void;
  onChangeContent?: (value: string) => void;

  selectedNote: Note | null;
};

export default function NoteEditor({
  title,
  contentJson,
  onChangeTitle,
  onChangeContent,
  selectedNote,
}: NoteEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: EMPTY_TIPTAP_DOC,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChangeContent?.(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class:
          "mt-5 min-h-[65vh] outline-none text-base leading-7 text-gray-800",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (!selectedNote) {
      editor.commands.setContent(EMPTY_TIPTAP_DOC, { emitUpdate: false });
      return;
    }

    try {
      const parsed = contentJson ? JSON.parse(contentJson) : EMPTY_TIPTAP_DOC;

      editor.commands.setContent(parsed, { emitUpdate: false });
    } catch {
      editor.commands.setContent(EMPTY_TIPTAP_DOC, { emitUpdate: false });
    }
  }, [editor, selectedNote, contentJson]);

  return (
    <main className="flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-3xl p-6">
          {!selectedNote ? (
            <div className="text-gray-500">Select a note to start editing.</div>
          ) : (
            <>
              <input
                value={title}
                placeholder="Write your title"
                className="w-full border-b pb-3 text-3xl font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                onChange={(e) => onChangeTitle?.(e.target.value)}
              />
              <ButtonRow editor={editor} />
              <EditorContent editor={editor} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
