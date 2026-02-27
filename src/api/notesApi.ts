import { request } from "./http"
import type { Note } from "../types/Note"
import type { Page } from "../types/Page"

export type CreateNoteRequest = {
  title: string
  content: string
}

export async function createNote(req: CreateNoteRequest): Promise<Note> {
  return request<Note>("/notes", { method: "POST", body: req })
}


export async function getNotes(page = 0, size = 20): Promise<Page<Note>> {
  return request<Page<Note>>(`/notes?page=${page}&size=${size}`)
}



