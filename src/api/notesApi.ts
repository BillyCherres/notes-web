import { request } from "./http"
import type { Note, CreateNoteRequest, UpdateNoteRequest } from "../types/Note"
import type { Page } from "../types/Page"

export async function createNote(req: CreateNoteRequest): Promise<Note> {
  return request<Note>("/notes", { method: "POST", body: req })
}


export async function getNotes(page = 0, size = 20): Promise<Page<Note>> {
  return request<Page<Note>>(`/notes?page=${page}&size=${size}`)
}

export async function deleteNote(id: number): Promise<void> {
  return request<void>(`/notes/${id}`, {
    method: "DELETE",
  });
}

export async function updateNote(id: number, req: UpdateNoteRequest): Promise<Note> {
  return request<Note>(`/notes/${id}`, {
    method: "PUT",
    body: req
  });
}



