import NoteToolbar from "../components/NoteToolbar";

export default function NotesPage() {
  const handleNew = () => console.log("new");
  const handleSave = () => console.log("save");
  const handleDelete = () => console.log("delete");

  const notes = [
    { id: 1, title: "First Note", updatedAt: "Feb 26, 2026" },
    { id: 2, title: "Gym Plan", updatedAt: "Feb 24, 2026" },
    { id: 3, title: "Ideas", updatedAt: "Feb 20, 2026" },
  ];

  const selectedId = 1;

  return (
    <div className="h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <NoteToolbar
            onNew={handleNew}
            onSave={handleSave}
            onDelete={handleDelete}
            saveDisabled={false}
            deleteDisabled={false}
            statusText="Saved"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-6xl gap-4 px-4 py-4">
        {/* Left pane */}
        <aside className="w-80 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b px-4 py-3">
            <div className="text-sm font-semibold text-gray-900">My Notes</div>
            <div className="text-xs text-gray-500">{notes.length} notes</div>
          </div>

          <ul className="max-h-full overflow-y-auto p-2">
            {notes.map((n) => {
              const selected = n.id === selectedId;

              return (
                <li key={n.id} className="mb-1 last:mb-0">
                  <button
                    type="button"
                    onClick={() => console.log("select", n.id)}
                    className={[
                      "w-full rounded-lg px-3 py-3 text-left transition",
                      "hover:bg-gray-50",
                      selected ? "bg-blue-50 ring-1 ring-blue-200" : "",
                    ].join(" ")}
                  >
                    <div className="truncate text-sm font-medium text-gray-900">
                      {n.title}
                    </div>
                    <div className="truncate text-xs text-gray-500">
                      {n.updatedAt}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right pane */}
        <main className="flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl p-6">
              <input
                placeholder="Title"
                className="w-full border-b pb-3 text-3xl font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                defaultValue="First Note"
              />

              <textarea
                placeholder="Write your note..."
                className="mt-5 w-full min-h-[65vh] resize-none text-base leading-7 text-gray-800 outline-none placeholder:text-gray-400"
                defaultValue="This is the editor area. We'll wire it up later."
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}