const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080"

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
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })


  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed (${res.status} ${res.statusText}): ${text}`)
  }


  return (await res.json()) as T
}