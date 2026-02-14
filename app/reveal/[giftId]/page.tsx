"use client";
import { useEffect, useState } from "react";
import LockScreen from "./LockScreen";
import EnvelopeReveal from "./EnvelopeReveal";
import MessageReveal from "./MessageReveal";
import { isFuture, formatDateTime } from "@/lib/time";
import { useParams } from "next/navigation";

type Step = "locked" | "unlock" | "envelope" | "message";

export default function RevealPage() {
  const { giftId } = useParams<{ giftId: string }>();
  const [step, setStep] = useState<Step>("locked");
  const [opensAt, setOpensAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/gift/${giftId}`);
      if (!res.ok) {
        setLoading(false);
        setStep("unlock");
        return;
      }
      const data = await res.json();

      if (data.scheduledAt) {
        const dt = new Date(data.scheduledAt);
        setOpensAt(dt);
        if (isFuture(dt)) {
          setLoading(false);
          setStep("locked");
          return;
        }
      }
      setLoading(false);
      setStep("unlock");
    };
    load();
  }, [giftId]);

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Preparing your surprise…</p>
      </main>
    );
  }

  if (step === "locked" && opensAt) {
    return (
      <LockScreen
        onUnlock={() => {}}
        message={`Opens at ${formatDateTime(opensAt)}`}
      />
    );
  }

  if (step === "unlock") {
    return <LockScreen onUnlock={() => setStep("envelope")} />;
  }

  if (step === "envelope") {
    return <EnvelopeReveal onOpen={() => setStep("message")} />;
  }

  return <MessageReveal />;
}
