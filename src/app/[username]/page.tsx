import PublicPage from "@/components/public/publicPage";
export default function Page({ params }: { params: { username: string } }) {
  return <PublicPage username={params.username} />;
}
