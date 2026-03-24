import { useState } from "react";
import NoteToolbar from "../components/NoteToolbar";
import type { Note } from "../types/Note";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { createNote, deleteNote, updateNote } from "../api/notesApi";
import { isServiceUnavailable } from "../api/http";
import { EMPTY_TIPTAP_DOC_STRING } from "../editor/emptyDoc";

export default function NotesPage() {
  const [serviceDown, setServiceDown] = useState(false);

  const handleNew = async () => {
    try {
      const created = await createNote({
        title: "New Note",
        contentJson: EMPTY_TIPTAP_DOC_STRING,
      });
      handleSelect(created);
      refreshNotes();
    } catch (err) {
      if (isServiceUnavailable(err)) setServiceDown(true);
      else console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setSelectedNote(null);
      refreshNotes();
    } catch (err) {
      if (isServiceUnavailable(err)) setServiceDown(true);
      else console.log("DELETE threw:", err);
    }
  };

  const handleDeleteToolbar = async () => {
    if (!selectedNote) return;
    await handleDelete(selectedNote.id);
  };

  const [refreshKey, setRefreshKey] = useState(0);
  const refreshNotes = () => setRefreshKey((k) => k + 1);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContentJson, setDraftContentJson] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const handleSelect = (note: Note) => {
    setSelectedNote(note);
    setDraftTitle(note.title);
    setDraftContentJson(note.contentJson);
    setIsDirty(false);
  };

  const onChangeTitle = (v: string) => {
    setDraftTitle(v);
    setIsDirty(true);
  };

  const onChangeContent = (v: string) => {
    setDraftContentJson(v);
    setIsDirty(true);
  };

  const handleSave = async (id: number, title: string, contentJson: string) => {
    try {
      const updatedNote = await updateNote(id, { title, contentJson });
      setSelectedNote(updatedNote);
      setIsDirty(false);
      refreshNotes();
    } catch (err) {
      if (isServiceUnavailable(err)) setServiceDown(true);
      else console.log(err);
    }
  };

  const handleSaveToolbar = async () => {
    if (!selectedNote) return;
    await handleSave(selectedNote.id, draftTitle, draftContentJson);
  };

  if (serviceDown) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
        <div className="mb-4 text-6xl">🗄️</div>
        <div className="mb-2 text-lg font-semibold text-gray-700">Notes unavailable</div>
        <div className="max-w-sm text-sm text-gray-500">
          We've hit our monthly database limit. Notes will be back at the start of next month.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <NoteToolbar
            onNew={handleNew}
            onSave={handleSaveToolbar}
            onDelete={handleDeleteToolbar}
            saveDisabled={!selectedNote || !isDirty}
            deleteDisabled={!selectedNote}
          />
        </div>
      </div>

      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-6xl gap-4 px-4 py-4">
        <NoteList
          selectedId={selectedNote?.id ?? null}
          onSelect={handleSelect}
          refreshKey={refreshKey}
        />

        <NoteEditor
          title={draftTitle}
          contentJson={draftContentJson}
          onChangeTitle={onChangeTitle}
          onChangeContent={onChangeContent}
          selectedNote={selectedNote}
        />
      </div>
    </div>
  );
}