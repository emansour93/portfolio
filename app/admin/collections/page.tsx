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

type CollectionImage = {
  id: number;
  src: string;
  altText: string;
  order: number;
};
type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  hero: string;
  order: number;
  images: CollectionImage[];
};

// ── Upload helper ─────────────────────────────────────────────────────────────
async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error(await res.text());
  const { url } = await res.json();
  return url;
}

// ── Upload zone ───────────────────────────────────────────────────────────────
function UploadZone({
  onUploaded,
  label = "Upload image",
}: {
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const handle = async (file: File) => {
    if (!file.type.startsWith("image/")) return setErr("Images only.");
    setUploading(true);
    setErr("");
    try {
      onUploaded(await uploadFile(file));
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handle(f);
        }}
        className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-xl p-6 cursor-pointer transition text-sm
          ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handle(f);
          }}
        />
        {uploading ? (
          <p className="text-blue-600">Uploading…</p>
        ) : (
          <>
            <span className="text-2xl">🖼️</span>
            <p className="text-gray-500">
              {label} — drag & drop or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
          </>
        )}
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
    </div>
  );
}

// ── Sortable gallery image ────────────────────────────────────────────────────
function SortableImage({
  img,
  onDelete,
}: {
  img: CollectionImage;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-lg"
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 text-lg px-1"
      >
        ⠿
      </span>
      <img
        src={img.src}
        alt={img.altText}
        className="w-20 h-14 object-cover rounded"
      />
      <p className="flex-1 text-xs text-gray-500 truncate">{img.src}</p>
      <button
        onClick={() => onDelete(img.id)}
        className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
      >
        Remove
      </button>
    </li>
  );
}

// ── Collection modal ──────────────────────────────────────────────────────────
function CollectionModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Collection | null;
  onSave: (data: Partial<Collection>) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [hero, setHero] = useState(initial?.hero ?? "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // Auto-generate slug from name
  const handleNameChange = (v: string) => {
    setName(v);
    if (!initial)
      setSlug(
        v
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
  };

  const handleSubmit = async () => {
    if (!name || !slug || !hero)
      return setErr("Name, slug and hero image are required.");
    setSaving(true);
    setErr("");
    try {
      await onSave({ name, slug, description, hero });
      onClose();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold">
          {initial ? "Edit Collection" : "New Collection"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Spring 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="spring-2026"
            />
            <p className="text-xs text-gray-400 mt-1">
              URL: /collections/{slug || "..."}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image *
            </label>
            {!hero && (
              <UploadZone onUploaded={setHero} label="Upload hero image" />
            )}
            {hero && (
              <div className="relative">
                <img
                  src={hero}
                  alt="hero preview"
                  className="w-full h-40 object-cover rounded-lg border"
                />
                <button
                  onClick={() => setHero("")}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                >
                  Change
                </button>
              </div>
            )}
          </div>
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
            disabled={saving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Images panel (expanded per collection) ────────────────────────────────────
function ImagesPanel({
  collection,
  onChange,
}: {
  collection: Collection;
  onChange: () => void;
}) {
  const [images, setImages] = useState<CollectionImage[]>(collection.images);
  const [err, setErr] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));

  const handleUpload = async (url: string) => {
    const res = await fetch("/api/collections/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId: collection.id,
        src: url,
        order: images.length,
      }),
    });
    if (!res.ok) return setErr("Failed to add image");
    const newImg = await res.json();
    setImages((prev) => [...prev, newImg]);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this image?")) return;
    const res = await fetch("/api/collections/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) return setErr("Failed to delete");
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    const updated = arrayMove(images, oldIndex, newIndex).map((img, i) => ({
      ...img,
      order: i,
    }));
    const previous = images;
    setImages(updated);
    try {
      await Promise.all(
        updated.map((img) =>
          fetch("/api/collections/images", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: img.id, order: img.order }),
          }),
        ),
      );
    } catch {
      setImages(previous);
      setErr("Failed to save order");
    }
  };

  return (
    <div className="mt-3 space-y-3 pl-4 border-l-2 border-blue-100">
      <UploadZone onUploaded={handleUpload} label="Add gallery image" />
      {err && <p className="text-xs text-red-500">{err}</p>}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {images.map((img) => (
                <SortableImage key={img.id} img={img} onDelete={handleDelete} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
      {images.length === 0 && (
        <p className="text-xs text-gray-400">No gallery images yet.</p>
      )}
    </div>
  );
}

// ── Sortable collection row ───────────────────────────────────────────────────
function SortableCollection({
  col,
  onEdit,
  onDelete,
}: {
  col: Collection;
  onEdit: (col: Collection) => void;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: col.id });
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-4 p-3">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 text-xl px-1"
        >
          ⠿
        </span>
        <img
          src={col.hero}
          alt={col.name}
          className="w-24 h-16 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800">{col.name}</p>
          <p className="text-xs text-gray-400">/collections/{col.slug}</p>
          <p className="text-xs text-gray-400">
            {col.images.length} image{col.images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="px-3 py-1 text-sm bg-gray-50 text-gray-600 border border-gray-200 rounded hover:bg-gray-100"
          >
            {expanded ? "Hide images" : "Edit images"}
          </button>
          <button
            onClick={() => onEdit(col)}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(col.id)}
            className="px-3 py-1 text-sm bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4">
          <ImagesPanel collection={col} onChange={() => {}} />
        </div>
      )}
    </li>
  );
}

// ── Main CMS page ─────────────────────────────────────────────────────────────
export default function CollectionsCMS() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Collection | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const fetchCollections = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/collections");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCollections(data.collections ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAdd = async (data: Partial<Collection>) => {
    const res = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, order: collections.length }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchCollections();
  };

  const handleEdit = async (data: Partial<Collection>) => {
    if (!editing) return;
    const res = await fetch("/api/collections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, ...data }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchCollections();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this collection and all its images?")) return;
    try {
      const res = await fetch("/api/collections", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setCollections((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete collection");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = collections.findIndex((c) => c.id === active.id);
    const newIndex = collections.findIndex((c) => c.id === over.id);
    const updated = arrayMove(collections, oldIndex, newIndex).map((c, i) => ({
      ...c,
      order: i,
    }));
    const previous = collections;
    setCollections(updated);
    try {
      await Promise.all(
        updated.map((c) =>
          fetch("/api/collections", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: c.id, order: c.order }),
          }),
        ),
      );
    } catch {
      setCollections(previous);
      setError("Failed to save order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Collections CMS</h1>
        <button
          onClick={() => setModal("add")}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + New Collection
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading…</p>}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      {!loading && collections.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          No collections yet. Click <strong>+ New Collection</strong> to start.
        </p>
      )}

      {!loading && collections.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={collections.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {collections.map((col) => (
                <SortableCollection
                  key={col.id}
                  col={col}
                  onEdit={(c) => {
                    setEditing(c);
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
        <CollectionModal onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editing && (
        <CollectionModal
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
