// ./components/ClientComponent.tsx
"use client";
import { VoiceProvider } from "@humeai/voice-react";

import Controls from "./Controls";
import { useEffect } from "react";


export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  useEffect(()=>{
    console.log(accessToken)
  })
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      {/* <Messages /> */}
      <Controls />
    </VoiceProvider>
  );
}
