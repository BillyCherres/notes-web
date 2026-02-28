export interface Note{
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type CreateNoteRequest = {
  title: string
  content: string
}

// similar for now but we will use patching later maybe?
export type UpdateNoteRequest = {
  title: string
  content: string
}