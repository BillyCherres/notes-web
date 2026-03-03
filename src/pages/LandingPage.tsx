import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    // Wake backend (fire and forget)
    fetch(import.meta.env.VITE_API_URL + "/health").catch(() => {});

    await loginWithRedirect({
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="p-4 border-b flex justify-between">
        <h1 className="text-xl font-semibold">Notes</h1>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Sign In
        </button>
      </nav>

      <div className="flex flex-1">
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-4">
            A fast, minimal notes app.
          </h2>
          <p className="text-gray-600">
            Sign in to create, edit, and manage your notes.
          </p>
        </div>

        <div className="w-1/2 p-10">
          <textarea
            placeholder="Start typing..."
            className="w-full h-96 border p-4 rounded"
          />
          <p className="text-sm text-gray-500 mt-2">
            Sign in to save your work.
          </p>
        </div>
      </div>
    </div>
  );
}
