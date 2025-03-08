
"use client";
import { VoiceProvider } from "@humeai/voice-react";

import Controls from "./Controls";



export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
    
      <Controls />
    </VoiceProvider>
  );
}
