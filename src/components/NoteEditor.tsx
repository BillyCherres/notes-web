import type { Note } from "../types/Note";

type NoteEditorProps = {
  title: string;
  content: string;
  
  onChangeTitle?: (value: string) => void;
  onChangeContent?: (value: string) => void;

  selectedNote: Note | null;
};

export default function NoteEditor({
  title,
  content,
  onChangeTitle, 
  onChangeContent,
  selectedNote
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
                value={title}
                placeholder="write your content"
                className="w-full border-b pb-3 text-3xl font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                onChange={(e) => onChangeTitle?.(e.target.value)}
              />

              <textarea
                value={content}
                placeholder="Write your note..."
                className="mt-5 w-full min-h-[65vh] resize-none text-base leading-7 text-gray-800 outline-none placeholder:text-gray-400"
                onChange={(e) => onChangeContent?.(e.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}