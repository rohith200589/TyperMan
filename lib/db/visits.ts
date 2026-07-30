"use server";

// Cached read
export async function getVisitCount() {
  return null; // Returning null prevents the component from rendering since there is no DB
}

// Server Action — called from client on mount
export async function recordVisit() {
  // No-op
}
