import { useState } from "react";
import NoteToolbar from "../components/NoteToolbar";
import type { Note } from "../types/Note";
import NoteList from "../components/NoteList";

export default function NotesPage() {
  const handleNew = () => { // temporary until we implement crud in the frontend
    console.log("new");
    refreshNotes();
  };
  const handleSave = () => console.log("save");
  const handleDelete = () => console.log("delete");
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshNotes = () => setRefreshKey((k) => k+1)

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <NoteToolbar
            onNew={handleNew}
            onSave={handleSave}
            onDelete={handleDelete}
            saveDisabled={!selectedNote}
            deleteDisabled={!selectedNote}
            statusText="Saved"
          />
        </div>
      </div>

      {/* Content Layout */}
      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-6xl gap-4 px-4 py-4">
        {/* LEFT SIDE — Note List */}
        <NoteList
          selectedId={selectedNote?.id ?? null}
          onSelect={setSelectedNote}
          refreshKey={refreshKey}
        />

        {/* RIGHT SIDE — Editor */}
        <main className="flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl p-6">
              {!selectedNote ? (
                <div className="text-gray-500">
                  Select a note to start editing.
                </div>
              ) : (
                <>
                  <input
                    value={selectedNote.title}
                    placeholder="Title"
                    className="w-full border-b pb-3 text-3xl font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                    readOnly
                  />

                  <textarea
                    value={selectedNote.content}
                    placeholder="Write your note..."
                    className="mt-5 w-full min-h-[65vh] resize-none text-base leading-7 text-gray-800 outline-none placeholder:text-gray-400"
                    readOnly
                  />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
