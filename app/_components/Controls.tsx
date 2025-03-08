"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";
// ✅ Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ✅ Import the animation JSON file
import loadingAnimation from "@/public/Animation.json";

export default function Controls() {
  const { connect, disconnect, readyState, isPlaying, playerQueueLength } = useVoice();
  const [isStarted, setIsStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Create a reference for the Lottie animation
  const lottieRef = useRef<LottieRefCurrentProps>(null);


  // ✅ Track AI speech using `playerQueueLength`
  useEffect(() => {
    if (playerQueueLength > 0 || isPlaying) {
      setIsSpeaking(true);
      lottieRef.current?.play(); // ✅ Play animation only when AI is responding
    } else {
      setIsSpeaking(false);
      lottieRef.current?.pause(); // ✅ Pause animation when AI stops
    }
  }, [playerQueueLength, isPlaying]);

  const handleStart = async () => {
    setIsStarted(true);
    try {
      await connect();
      lottieRef.current?.pause(); // ✅ Pause animation immediately after "Start" is clicked
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleEnd = () => {
    disconnect();
    setIsStarted(false);
    setIsSpeaking(false);
    lottieRef.current?.pause(); // ✅ Ensure animation stops when session ends
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {!isStarted ? (
        <button
          onClick={handleStart}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Start
        </button>
      ) : (
        <div className="flex flex-col items-center">
          {/* ✅ Lottie animation is visible but stays paused initially */}
          <Lottie
            animationData={loadingAnimation}
            lottieRef={lottieRef}
            loop
            className="w-36 h-36"
          />
          <button
            onClick={handleEnd}
            className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            End Session
          </button>
        </div>
      )}
    </div>
  );
}
