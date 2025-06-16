// app/[username]/page.tsx

import { getPublic } from "@/lib/getpublic";
import PublicPage from "@/components/public/publicPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const data = await getPublic(username);

  if (!data) return notFound();
  return <PublicPage data={data} />;
}
