"use client";
import { useState } from "react";
import EnvelopeMock from "./EnvelopeMock";
import RevealMock from "./RevealMock";

export default function DemoPreview() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex justify-center mt-12">
      {!opened ? (
        <EnvelopeMock onOpen={() => setOpened(true)} />
      ) : (
        <RevealMock />
      )}
    </div>
  );
}
