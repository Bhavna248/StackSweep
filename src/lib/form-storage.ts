import type { AuditInput } from "./types";

const KEY = "stacksweep-form-v1";

export function loadForm(): Partial<AuditInput> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<AuditInput>) : null;
  } catch {
    return null;
  }
}

export function saveForm(data: Partial<AuditInput>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* quota */
  }
}
