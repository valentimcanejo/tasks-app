"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/tasks");
  }, [router]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
