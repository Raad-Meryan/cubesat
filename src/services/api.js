const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.1.164:5000";

export async function fetchSensors() {
  const res = await fetch(`${BASE_URL}/sensors`);
  if (!res.ok) throw new Error("Failed to fetch sensor data");
  return res.json();
}

export async function fetchMemory() {
  const res = await fetch(`${BASE_URL}/storage`);
  if (!res.ok) throw new Error("Failed to fetch memory data");
  return res.json();
}

export async function fetchSnapshots() {
  const res = await fetch(`${BASE_URL}/snapshots`);
  if (!res.ok) throw new Error("Failed to fetch snapshots");
  return res.json();
}

export async function fetchLatestSnapshot() {
  const res = await fetch(`${BASE_URL}/snapshots/latest`);
  if (!res.ok) throw new Error("Failed to fetch latest snapshot");
  return res.json();
}