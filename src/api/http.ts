const BASE_URL = import.meta.env.VITE_API_URL

// dev only user id for testing
const DEV_USER_ID = import.meta.env.VITE_USER_ID

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export async function request<T>(
  path: string,
  options: { method?: HttpMethod; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": DEV_USER_ID, 
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

    // 204 No Content (for DELETE)
  if (res.status === 204) return undefined as T;

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed (${res.status} ${res.statusText}): ${text}`)
  }

  return (await res.json()) as T
}