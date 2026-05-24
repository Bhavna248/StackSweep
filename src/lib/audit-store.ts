import type { AuditResult } from "./types";

const memory = new Map<string, AuditResult>();

export function memorySave(a: AuditResult): void {
  memory.set(a.id, a);
}

export function memoryGet(id: string): AuditResult | undefined {
  return memory.get(id);
}
