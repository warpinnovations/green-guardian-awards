"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";

export default function RegistrationPage() {
  const [invitees, setInvitees] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<null | "idle" | "saving" | "done">("idle");

  useEffect(() => {
    fetch("/files/invitees.json")
      .then((r) => r.json())
      .then((data) => setInvitees(Array.isArray(data) ? data : []))
      .catch(() => setInvitees([]));
  }, []);

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return invitees.filter((n) => n.toLowerCase().includes(q)).slice(0, 8);
  }, [query, invitees]);

  async function confirmRegistration(name: string) {
    setStatus("saving");
    try {
      await fetch("/api/registration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setStatus("done");
      setSelected(name);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("Registration failed");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (matches.length > 0) {
        setSelected(matches[0]);
        setQuery(matches[0]);
      } else if (query.trim()) {
        setSelected(query.trim());
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#052e2b] via-[#063a36] to-[#031f1d]">
      <Header />
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 lg:p-12">
          <h1 className="font-alviona text-3xl lg:text-4xl text-neutral-900 mb-2">Registration</h1>
          <p className="text-sm text-neutral-600 mb-6">Type your name to find your invitation and confirm your attendance.</p>

          <label className="block relative">
            <input
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:shadow-md focus:ring-2 focus:ring-[#8FC73F]/40"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setStatus("idle");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your name..."
              aria-label="Search invitees"
            />

            {matches.length > 0 && !selected && (
              <ul className="absolute left-0 right-0 bg-white border border-t-0 border-neutral-200 rounded-b-xl mt-0 shadow-lg z-20 max-h-48 overflow-auto">
                {matches.map((name) => (
                  <li key={name}>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-neutral-50"
                      onClick={() => {
                        setQuery(name);
                        setSelected(name);
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <div className="mt-6">
            {selected ? (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Selected</p>
                  <p className="text-lg font-semibold text-neutral-900">{selected}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-5 py-2 rounded-2xl bg-linear-to-r from-[#D4AF37] to-[#f1d77a] text-neutral-900 font-bold hover:shadow-lg"
                    onClick={() => confirmRegistration(selected)}
                    disabled={status === "saving"}
                  >
                    {status === "saving" ? "Registering..." : `Register as ${selected}`}
                  </button>
                  <button
                    className="px-4 py-2 rounded-2xl border border-neutral-200 text-neutral-700"
                    onClick={() => {
                      setSelected(null);
                      setQuery("");
                      setStatus("idle");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="px-5 py-2 rounded-2xl bg-linear-to-r from-[#8FC73F] to-[#b5d443] text-neutral-900 font-bold hover:shadow-lg disabled:opacity-50"
                  onClick={() => confirmRegistration(query)}
                  disabled={!query || status === "saving"}
                >
                  {status === "saving" ? "Registering..." : `Register as ${query || "______"}`}
                </button>
                <p className="text-sm text-neutral-500">Or pick your name from the list above.</p>
              </div>
            )}
          </div>

          {status === "done" && (
            <p className="mt-6 text-sm text-green-700">Thanks — you are registered as <strong>{selected}</strong>.</p>
          )}
        </div>
      </div>
    </main>
  );
}