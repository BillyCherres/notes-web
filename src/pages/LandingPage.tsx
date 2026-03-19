import { useAuth0 } from "@auth0/auth0-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ButtonRow from "../components/ButtonRow";

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  const editor = useEditor({
    extensions: [StarterKit],
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "My Notes" }] },
        { type: "paragraph", content: [{ type: "text", text: "Try bold, italic, bullet lists, and more — right here." }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Fast and minimal" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Rich text formatting" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Sign in to save your work" }] }] },
        ]},
      ],
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none text-base leading-7 text-gray-800 min-h-[220px]",
      },
    },
  });

  const handleLogin = async () => {
    fetch(import.meta.env.VITE_API_URL + "/health").catch(() => {});
    await loginWithRedirect({ authorizationParams: { prompt: "login" } });
  };

  const stack = [
    { name: "React + TypeScript", desc: "Component-driven UI with full type safety.", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { name: "Java + Spring Boot", desc: "RESTful backend with paginated note storage.", color: "bg-orange-50 border-orange-200 text-orange-700" },
    { name: "Tiptap", desc: "Rich text editor built on ProseMirror.", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { name: "Auth0", desc: "Secure authentication with JWT tokens.", color: "bg-green-50 border-green-200 text-green-700" },
    { name: "PostgreSQL + Neon", desc: "Serverless Postgres with instant branching.", color: "bg-teal-50 border-teal-200 text-teal-700" },
    { name: "Tailwind CSS", desc: "Utility-first styling with zero runtime overhead.", color: "bg-sky-50 border-sky-200 text-sky-700" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur px-8 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight">Notes</span>
        <button
          onClick={handleLogin}
          className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-8 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/2">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Personal project</span>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight">
            A fast, minimal<br />notes app.
          </h1>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed">
            Rich text editing, instant saves, and a clean interface — built for the way I actually take notes.
          </p>
          <button
            onClick={handleLogin}
            className="mt-8 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Get Started →
          </button>
        </div>

        {/* Live Editor Demo */}
        <div className="md:w-1/2 w-full rounded-2xl border bg-white shadow-lg overflow-hidden">
          <div className="border-b px-4 py-3 flex items-center gap-2 bg-gray-50">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 font-mono">notes — editor</span>
          </div>
          <div className="p-5">
            <ButtonRow editor={editor} />
            <EditorContent editor={editor} className="mt-3" />
          </div>
          <div className="border-t px-5 py-3 bg-gray-50 text-xs text-gray-400">
            This is a live demo — sign in to save your notes.
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-50 border-y">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <h2 className="text-3xl font-bold mb-2">Built with modern tools</h2>
          <p className="text-gray-500 mb-10">
            A full-stack project spanning frontend, backend, auth, and database — all wired together from scratch.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stack.map((item) => (
              <div key={item.name} className={`rounded-xl border p-5 ${item.color}`}>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="mt-1 text-xs opacity-80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <h2 className="text-3xl font-bold mb-2">Hosted entirely on free tiers</h2>
        <p className="text-gray-500 mb-8 max-w-2xl leading-relaxed">
          The frontend is deployed on <strong>Vercel</strong>, the backend on <strong>Render</strong>, and the database on <strong>Neon</strong> — all free tier.
          Render spins down inactive services after inactivity, so I set up an uptime monitor that regularly pings the backend to keep it warm.
          It's a small hack, but it means the app stays snappy without paying for always-on hosting.
          Solutions like these are exactly why I love programming.
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "Vercel", role: "Frontend hosting" },
            { name: "Render", role: "Backend (Spring Boot)" },
            { name: "Neon", role: "Serverless PostgreSQL" },
          ].map((host) => (
            <div key={host.name} className="border rounded-xl px-6 py-4 bg-white shadow-sm min-w-[160px]">
              <p className="font-semibold">{host.name}</p>
              <p className="text-xs text-gray-500 mt-1">{host.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-8 py-20 flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-2/3">
            <span className="text-sm font-medium text-indigo-400 bg-indigo-900/40 px-3 py-1 rounded-full">About the developer</span>
            <h2 className="mt-4 text-3xl font-bold">William Cherres</h2>
            <p className="mt-2 text-indigo-300 text-sm">Computer Science @ Grinnell College</p>
            <p className="mt-5 text-gray-300 leading-relaxed">
              I built this notes app as a tool I actually use — and as a playground for experimenting with modern full-stack development.
              It started as a simple textarea and has evolved into a rich text editor backed by a Java REST API, Auth0 authentication, and a serverless Postgres database.
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed">
              The whole stack — React, TypeScript, Spring Boot, Tiptap, Tailwind — was chosen deliberately to push myself into unfamiliar territory and learn by building something real.
              Every feature on this page is something I ran into, debugged, and figured out myself.
            </p>
            <a
              href="https://billycherres.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-6 py-3 border border-white/20 text-white text-sm rounded-lg hover:bg-white hover:text-gray-900 transition"
            >
              See my other projects →
            </a>
          </div>
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Currently exploring</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>→ Rich text editing with Tiptap + ProseMirror</li>
                <li>→ REST API design with Spring Boot</li>
                <li>→ Auth flows with Auth0 + JWT</li>
                <li>→ Free-tier deployment strategies</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Stack at a glance</p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Java", "Spring Boot", "Tiptap", "Auth0", "PostgreSQL", "Tailwind"].map((t) => (
                  <span key={t} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-6 text-center text-xs text-gray-400">
        Built by William Cherres ·{" "}
        <a href="https://billycherres.github.io/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          billycherres.github.io
        </a>
      </footer>
    </div>
  );
}
