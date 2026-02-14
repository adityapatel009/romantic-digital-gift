"use client";
import { useState } from "react";
import DemoLock from "./DemoLock";
import DemoEnvelope from "./DemoEnvelope";
import DemoMessage from "./DemoMessage";

type Step = "lock" | "envelope" | "message";

export default function DemoReveal() {
  const [step, setStep] = useState<Step>("lock");

  return (
    <div className="max-w-md mx-auto mt-24">
      {step === "lock" && <DemoLock onUnlock={() => setStep("envelope")} />}
      {step === "envelope" && <DemoEnvelope onOpen={() => setStep("message")} />}
      {step === "message" && <DemoMessage />}
    </div>
  );
}
