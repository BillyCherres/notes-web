import { useEffect, useState } from "react"
import { getNotes } from "../api/notesApi" // adjust path
import type { Note } from "../types/Note"
import type { Page } from "../types/Page"

type NoteListProps = {
  selectedId: number | null
  onSelect: (note: Note) => void
}

export default function NoteList({ selectedId, onSelect }: NoteListProps) {
  const [page, setPage] = useState<Page<Note> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await getNotes(0, 20)
        if (!cancelled) setPage(result)
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load notes"
        if (!cancelled) setError(message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const notes = page?.content ?? []

  return (
    <aside className="w-80 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold text-gray-900">My Notes</div>
        <div className="text-xs text-gray-500">
          {loading ? "Loading..." : `${notes.length} notes`}
        </div>
      </div>

      <div className="max-h-full overflow-y-auto p-2">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && loading && (
          <div className="p-3 text-sm text-gray-500">Fetching notes…</div>
        )}

        {!error && !loading && notes.length === 0 && (
          <div className="p-3 text-sm text-gray-500">No notes yet.</div>
        )}

        <ul>
          {notes.map((n) => {
            const selected = n.id === selectedId

            return (
              <li key={n.id} className="mb-1 last:mb-0">
                <button
                  type="button"
                  onClick={() => onSelect(n)}
                  className={[
                    "w-full rounded-lg px-3 py-3 text-left transition",
                    "hover:bg-gray-50",
                    selected ? "bg-blue-50 ring-1 ring-blue-200" : "",
                  ].join(" ")}
                >
                  <div className="truncate text-sm font-medium text-gray-900">
                    {n.title || "(Untitled)"}
                  </div>
                  <div className="truncate text-xs text-gray-500">
                    {formatDate(n.updatedAt)}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"

  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}