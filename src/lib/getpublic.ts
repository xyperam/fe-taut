export async function getPublic(username: string) {
  const res = await fetch(`http://localhost:8080/api/public/${username}`, {
    cache: "no-store", // ⛔️ SSR full fresh
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
