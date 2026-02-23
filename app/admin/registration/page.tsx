"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";

interface Registration {
  id: string;
  name: string;
  created_at: string;
}

export default function AdminRegistrationPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const res = await fetch("/api/registration");
        const data = await res.json();

        if (!data.ok) throw new Error(data.error || "Failed to fetch registrations");
        setRegistrations(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          console.error("Unknown error", err);
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <Header variant="minimal" />
      <div className="max-w-4xl mx-auto mt-25 bg-white shadow rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Registrations</h1>

          {loading && <p>Loading registrations...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && registrations.length === 0 && <p>No registrations yet.</p>}

          {!loading && registrations.length > 0 && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-neutral-100 hover:bg-gray-50">
                    <td className="p-2">{reg.name}</td>
                    <td className="p-2">
                      {new Date(reg.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}