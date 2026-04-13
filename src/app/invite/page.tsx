// app/wedding-invitation/page.tsx
import { WeddingInvitation } from "@/components/wedding-invitation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <WeddingInvitation />
    </main>
  );
}

