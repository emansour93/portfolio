"use client";

import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type HeroImage = { id: number; src: string; altText: string; order: number };

// ── Sortable row ──────────────────────────────────────────────────────────────
function SortableItem({
  item,
  onEdit,
  onDelete,
}: {
  item: HeroImage;
  onEdit: (item: HeroImage) => void;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 select-none text-xl px-1"
        title="Drag to reorder"
      >
        ⠿
      </span>

      <img
        src={item.src}
        alt={item.altText}
        className="w-32 h-20 object-cover rounded"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/128x80?text=Error";
        }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">{item.src}</p>
        <p className="text-xs text-gray-400">{item.altText || "No alt text"}</p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1 text-sm bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// ── Upload zone ───────────────────────────────────────────────────────────────
function UploadZone({ onUploaded }: { onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [draggingOver, setDraggingOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return setUploadErr("Only image files are allowed.");
    }
    setUploading(true);
    setUploadErr("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error(await res.text());
      const { url } = await res.json();
      onUploaded(url);
    } catch (e: any) {
      setUploadErr(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-1">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingOver(true);
        }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition
          ${draggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />
        {uploading ? (
          <p className="text-sm text-blue-600 font-medium">Uploading…</p>
        ) : (
          <>
            <span className="text-3xl">🖼️</span>
            <p className="text-sm text-gray-600 font-medium">
              Drag & drop an image, or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
          </>
        )}
      </div>
      {uploadErr && <p className="text-xs text-red-500">{uploadErr}</p>}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({
  initial,
  onSave,
  onClose,
}: {
  initial?: HeroImage | null;
  onSave: (src: string, altText: string) => Promise<void>;
  onClose: () => void;
}) {
  const [src, setSrc] = useState(initial?.src ?? "");
  const [altText, setAltText] = useState(initial?.altText ?? "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    if (!src.trim()) return setErr("An image is required.");
    setSaving(true);
    setErr("");
    try {
      await onSave(src.trim(), altText.trim());
      onClose();
    } catch (e: any) {
      setErr(e.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {initial ? "Edit Image" : "Add Image"}
        </h2>

        {/* Only show upload zone when adding, not editing */}
        {!initial && <UploadZone onUploaded={(url) => setSrc(url)} />}

        {/* Preview */}
        {src && (
          <img
            src={src}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg border"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/400x160?text=Invalid+URL";
            }}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe the image for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>

        {err && <p className="text-sm text-red-500">{err}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !src}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HeroCMS() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<HeroImage | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const fetchHeroImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hero");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setImages(data.heroImages ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const handleAdd = async (src: string, altText: string) => {
    const res = await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src, altText, order: images.length }),
    });
    if (!res.ok) throw new Error(await res.text());
    await fetchHeroImages();
  };

  const handleEdit = async (src: string, altText: string) => {
    if (!editing) return;
    const res = await fetch("/api/hero", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, src, altText }),
    });
    if (!res.ok) throw new Error(await res.text());
    setImages((prev) =>
      prev.map((img) =>
        img.id === editing.id ? { ...img, src, altText } : img,
      ),
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch("/api/hero", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(await res.text());
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    const updatedImages = arrayMove(images, oldIndex, newIndex).map(
      (img, i) => ({ ...img, order: i }),
    );

    const previous = images;
    setImages(updatedImages);

    try {
      await Promise.all(
        updatedImages.map((img) =>
          fetch("/api/hero", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: img.id, newOrder: img.order }),
          }),
        ),
      );
    } catch {
      setImages(previous);
      setError("Failed to save new order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hero Slider CMS</h1>
        <button
          onClick={() => setModal("add")}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Add Image
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading images…</p>}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      {!loading && images.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          No images yet. Click <strong>+ Add Image</strong> to get started.
        </p>
      )}

      {!loading && images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {images.map((img) => (
                <SortableItem
                  key={img.id}
                  item={img}
                  onEdit={(item) => {
                    setEditing(item);
                    setModal("edit");
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      {modal === "add" && (
        <Modal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editing && (
        <Modal
          initial={editing}
          onSave={handleEdit}
          onClose={() => {
            setModal(null);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
