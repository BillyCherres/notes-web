import { useState } from "react";
import NoteToolbar from "../components/NoteToolbar";
import type { Note } from "../types/Note";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { createNote, deleteNote } from "../api/notesApi";

export default function NotesPage() {
  const handleNew = async () => { 
    try {
      const created = await createNote({title:"New Note", content:"Enter your content here"});
      // imediately show in editor
      setSelectedNote(created);

      // tell NoteList to refetch so it appears in the left
      refreshNotes();
    } catch(err){
          console.log(err);
    }
  };

const handleDelete = async (id: number) => {
  try {
    console.log("before delete");
    await deleteNote(id);
    console.log("after delete (no throw)");
    setSelectedNote(null);
    refreshNotes();
    console.log("after refreshNotes");
  } catch (err) {
    console.log("DELETE threw:", err);
  }
};

  const handleDeleteToolbar = async () => {
    if (!selectedNote) return;
    await handleDelete(selectedNote.id)
  }


  const handleSave = () => console.log("save");
  
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
            onDelete={handleDeleteToolbar}
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
        <NoteEditor selectedNote={selectedNote} readOnly />
      </div>
    </div>
  );
}
