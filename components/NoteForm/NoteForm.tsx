"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import {
  createNoteAction,
  type CreateNoteActionState,
} from "@/app/notes/action/create/actions";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const initialState: CreateNoteActionState = { ok: false };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={css.submitButton}
      disabled={disabled || pending}
    >
      {pending ? "Creating..." : "Create note"}
    </button>
  );
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [state, formAction] = useActionState(createNoteAction, initialState);
  const [clientError, setClientError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const title = draft.title.trim();
    if (title.length < 3 || title.length > 50) return false;
    if (draft.content.trim().length > 500) return false;
    if (!TAGS.includes(draft.tag)) return false;
    return true;
  }, [draft]);

  useEffect(() => {
    if (!state.ok) return;

    (async () => {
      clearDraft();
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });
      router.replace("/notes/filter/all");
      router.refresh();
    })();
  }, [state.ok, clearDraft, queryClient, router]);

  const handleFieldChange = (
    name: "title" | "content" | "tag",
    value: string,
  ) => {
    if (name === "tag" && TAGS.includes(value as NoteTag)) {
      setDraft({ tag: value as NoteTag });
      return;
    }
    if (name === "title") setDraft({ title: value });
    if (name === "content") setDraft({ content: value });
  };

  return (
    <form
      className={css.form}
      action={async (fd) => {
        setClientError(null);

        if (!canSubmit) {
          setClientError("Please fix the form fields before submitting.");
          return;
        }

        await formAction(fd);
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          type="text"
          value={draft.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={8}
          value={draft.content}
          onChange={(e) => handleFieldChange("content", e.target.value)}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => handleFieldChange("tag", e.target.value)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <SubmitButton disabled={!canSubmit} />
      </div>

      {(clientError || (!state.ok && state.message)) && (
        <p className={css.error}>{clientError ?? state.message}</p>
      )}
    </form>
  );
}
