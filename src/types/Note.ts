export interface Note{
  id: number
  title: string
  contentJson: string
  createdAt: string
  updatedAt: string
}

export type CreateNoteRequest = {
  title: string
  contentJson: string
}

// similar for now but we will use patching later maybe?
export type UpdateNoteRequest = {
  title: string
  contentJson: string
}