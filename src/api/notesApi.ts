import { request } from "./http"
import type { Note } from "../types/Note"

const NOTES_PATH = "/notes" 

export async function getNotes(): Promise<Note[]>{
    return request<Note[]>(NOTES_PATH)
}