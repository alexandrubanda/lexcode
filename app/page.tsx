import { redirect } from "next/navigation";

// Middleware handles the real redirect — this is only a safety fallback.
export default function RootPage() {
  redirect("/en");
}
