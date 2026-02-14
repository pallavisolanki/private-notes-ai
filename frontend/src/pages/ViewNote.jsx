//frontend\src\pages\ViewNote.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../api";

export default function ViewNote() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [note, setNote] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const unlockNote = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post(`/notes/${id}/unlock`, { password });
      setNote(res.data.data.content);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to unlock note");
    } finally {
      setLoading(false);
    }
  };

  const summarize = async () => {
    try {
      setAiLoading(true);
      setError("");

      const res = await api.post(`/notes/${id}/summarize`, {
        password,
      });

      setSummary(res.data.data.summary);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to summarize note");
    } finally {
      setAiLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">

        {!note ? (
          <>
            <h1 className="text-xl font-bold mb-4">Unlock Note</h1>

            <input
              type="password"
              className="w-full border rounded p-2 mb-3"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={unlockNote}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Unlocking..." : "Unlock"}
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Your Note</h2>
            <div className="border p-3 rounded bg-gray-50 mb-4">{note}</div>

            <button
              onClick={summarize}
              disabled={aiLoading}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              {aiLoading ? "Summarizing..." : "Summarize this note"}
            </button>

            {summary && (
              <div className="mt-4 bg-blue-50 p-3 rounded">
                <b>AI Summary:</b>
                <ul className="mt-2 list-disc list-inside">
                  {summary.split("\n").map((line, index) => (
                    <li key={index}>{line.replace("• ", "")}</li>
                  ))}
                </ul>
              </div>
            )}

            {error && <p className="text-red-500 mt-3">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}