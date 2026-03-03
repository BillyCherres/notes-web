let tokenGetter: null | (() => Promise<string>) = null;

export function setTokenGetter(fn: () => Promise<string>) {
  tokenGetter = fn;
}

export async function getToken(): Promise<string> {
  if (!tokenGetter) {
    throw new Error("Token getter not set. Did you mount <AuthBridge /> inside Auth0Provider?");
  }
  return tokenGetter();
}