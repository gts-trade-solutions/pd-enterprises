"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";

const EmailEditor = dynamic(
  () => import("react-email-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Page() {
  const router = useRouter();
  const unlayerRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [designName, setDesignName] = useState("");
  const [designs, setDesigns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchDesigns = async () => {
    const { data, error } = await supabase
      .from("email_designs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Error fetching designs");
      return;
    }

    setDesigns(data || []);
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const getEditor = () => {
    return unlayerRef.current;
  };

  const handleSave = () => {
    if (!designName.trim()) {
      alert("Enter Design Name");
      return;
    }

    const editor = getEditor();

    if (!editor) {
      alert("Editor not ready yet");
      console.log("unlayerRef.current:", unlayerRef.current);
      return;
    }

    editor.saveDesign(async (design) => {
      try {
        if (editingId) {
          const { error } = await supabase
            .from("email_designs")
            .update({
              name: designName.trim(),
              design,
            })
            .eq("id", editingId);

          if (error) throw error;

          alert("Updated!");
        } else {
          const { error } = await supabase
            .from("email_designs")
            .insert([
              {
                name: designName.trim(),
                design,
              },
            ]);

          if (error) throw error;

          alert("Saved!");
        }

        setDesignName("");
        setEditingId(null);
        fetchDesigns();
      } catch (err) {
        console.error(err);
        alert("Error saving design");
      }
    });
  };

  const handleEdit = (item) => {
    const editor = getEditor();

    if (!editor) {
      alert("Editor not ready yet");
      return;
    }

    setDesignName(item.name);
    setEditingId(item.id);
    editor.loadDesign(item.design);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this design?");
    if (!ok) return;

    const { error } = await supabase
      .from("email_designs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    if (editingId === id) {
      setEditingId(null);
      setDesignName("");
    }

    fetchDesigns();
  };

  const exportHtml = () => {
    const editor = getEditor();

    if (!editor) {
      alert("Editor not ready yet");
      return;
    }

    editor.exportHtml((data) => {
      console.log(data.html);
      alert("HTML logged in console");
    });
  };

  const handleEditorReady = (unlayer) => {
    console.log("Editor Ready");
    console.log("Unlayer instance:", unlayer);

    unlayerRef.current = unlayer;
    setEditorReady(true);
  };

  if (!mounted) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold">Email Builder (Unlayer)</h1>
          </div>
          <div className="bg-white border rounded p-6">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold">Email Builder (Unlayer)</h1>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            placeholder="Design Name"
            className="border px-4 py-2 rounded w-full bg-white"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 rounded"
          >
            {editingId ? "Update" : "Save"}
          </button>

          <button
            onClick={exportHtml}
            className="bg-green-600 text-white px-6 rounded"
          >
            Export HTML
          </button>
        </div>

        {!editorReady && (
          <div className="mb-3 text-sm text-gray-600">
            Initializing editor...
          </div>
        )}

        <div className="border rounded overflow-hidden mb-6 bg-white">
          <EmailEditor
            minHeight="700px"
            onReady={handleEditorReady}
            options={{ displayMode: "email" }}
          />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Saved Designs</h2>

          {designs.length === 0 ? (
            <p>No designs found</p>
          ) : (
            <div className="space-y-3">
              {designs.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <p className="font-semibold">{item.name}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}