type NoteToolbarProps = {
  onNew: () => void
  onSave: () => void
  onDelete: () => void
  saveDisabled?: boolean
  deleteDisabled?: boolean
  statusText?: string
}

export default function NoteToolbar({
  onNew,
  onSave,
  onDelete,
  saveDisabled = false,
  deleteDisabled = false,
  statusText,
}: NoteToolbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      
      {/* Left Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onNew}
          className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
        >
          New
        </button>

        <button
          onClick={onSave}
          disabled={saveDisabled}
          className={`px-4 py-2 rounded-lg border transition
            ${
              saveDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Save
        </button>

        <button
          onClick={onDelete}
          disabled={deleteDisabled}
          className={`px-4 py-2 rounded-lg border transition
            ${
              deleteDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          Delete
        </button>
      </div>

      {/* Right Status */}
      <div className="text-sm text-gray-500">
        {statusText}
      </div>
    </div>
  )
}