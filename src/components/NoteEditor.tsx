// src/components/NoteEditor.tsx
import type { Note } from "../types/Note";

type NoteEditorProps = {
  selectedNote: Note | null;
  // for now pass readOnly={true} from NotesPage we wire CRUD
  readOnly?: boolean;
  // later: wire these up when you implement editing
  onTitleChange?: (value: string) => void;
  onContentChange?: (value: string) => void;
};

export default function NoteEditor({
  selectedNote,
  readOnly = true,
  onTitleChange,
  onContentChange,
}: NoteEditorProps) {
  return (
    <main className="flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-3xl p-6">
          {!selectedNote ? (
            <div className="text-gray-500">Select a note to start editing.</div>
          ) : (
            <>
              <input
                value={selectedNote.title}
                placeholder="Title"
                className="w-full border-b pb-3 text-3xl font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                readOnly={readOnly}
                onChange={(e) => onTitleChange?.(e.target.value)}
              />

              <textarea
                value={selectedNote.content}
                placeholder="Write your note..."
                className="mt-5 w-full min-h-[65vh] resize-none text-base leading-7 text-gray-800 outline-none placeholder:text-gray-400"
                readOnly={readOnly}
                onChange={(e) => onContentChange?.(e.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}