"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="px-6 py-32 text-center relative z-20">
      <h2 className="text-4xl font-semibold mb-6 text-white">
        Create something they’ll never forget
      </h2>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => router.push("/demo")}
          className="relative z-30 pointer-events-auto"
        >
          See Live Demo
        </Button>
      </div>
    </section>
  );
}
