//frontend\src\pages\CreateNote.jsx
import { useState } from "react";
import { api } from "../api";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/notes", { content: note });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Create Private Note</h1>

        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={5}
          maxLength={500}
          placeholder="Write your private note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <p className="text-sm text-gray-500 mb-2">
          {note.length}/500 characters
        </p>

        <button
          onClick={createNote}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-4 p-3 bg-green-50 rounded">
            <div className="flex items-center gap-2">
              <p>
                <b>URL:</b>{" "}
                <a
                  href={result.url}
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  {result.url}
                </a>
              </p>

              <button
                onClick={() => navigator.clipboard.writeText(result.url)}
                className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
            <p><b>Password:</b> {result.password}</p>
          </div>
        )}
      </div>
    </div>
  );
}