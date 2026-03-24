import { getToken } from "../auth/token";


const BASE_URL = import.meta.env.VITE_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function request<T>(
  path: string,
  options: { method?: HttpMethod; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  // Get Auth0 access token
  const token = await getToken();

  const mergedHeaders: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  // Only set JSON content-type when sending a body
  if (body !== undefined) {
    mergedHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: mergedHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  // Helpful errors
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status} ${res.statusText}): ${text}`);
  }

  // 204 No Content (common for DELETE)
  if (res.status === 204) return undefined as T;

  // Some servers return 200 with empty body
  const raw = await res.text().catch(() => "");
  if (!raw) return undefined as T;

  return JSON.parse(raw) as T;
}

export function isServiceUnavailable(err: unknown): boolean {
  if (typeof err === "string") return err.includes("(500 ")
  return err instanceof Error && err.message.includes("(500 ")
}