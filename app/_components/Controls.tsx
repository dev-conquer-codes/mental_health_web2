"use client";
import { useVoice } from "@humeai/voice-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";

// ✅ Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ✅ Import the animation JSON file
import loadingAnimation from "@/public/Animation.json";

export default function Controls() {
  const { connect, disconnect, isPlaying, playerQueueLength } = useVoice();
  const [isStarted, setIsStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Correct Type for useRef
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // ✅ Track AI speech using `playerQueueLength`
  useEffect(() => {
    if (playerQueueLength > 0 || isPlaying) {
      setIsSpeaking(true);
      lottieRef.current?.play(); // ✅ Play animation when AI is responding
    } else {
      setIsSpeaking(false);
      lottieRef.current?.pause(); // ✅ Pause animation when AI stops
    }
  }, [playerQueueLength, isPlaying]);

  // ✅ Request microphone permission + connect
  const handleStart = async () => {
    setIsStarted(true);
    try {
      // ✅ Request permission explicitly before using getUserMedia
      const permissionStatus = await navigator.permissions.query({ name: "microphone" as any });
  
      if (permissionStatus.state === "denied") {
        alert("Microphone access is denied. Please enable it in browser settings.");
        setIsStarted(false);
        return;
      }
  
      if (permissionStatus.state === "prompt") {
        console.log("Requesting microphone permission...");
      }
  
      const getUserMedia =
        navigator.mediaDevices?.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia ||
        (navigator as any).msGetUserMedia;
  
      if (!getUserMedia) {
        alert("getUserMedia is not supported on this browser.");
        setIsStarted(false);
        return;
      }
  
      // ✅ If permission granted, open mic stream
      const stream = await getUserMedia.call(navigator, { audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop stream after permission check
  
      await connect();
      lottieRef.current?.pause(); // ✅ Pause animation after connecting
    } catch (error:any) {
      console.error("Connection failed:", error);
      alert(`Microphone access error: ${error.message}`);
      setIsStarted(false);
    }
  };
  

  // ✅ End session and stop animation
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
          {/* ✅ Correctly pass lottieRef */}
          <Lottie
            animationData={loadingAnimation}
            lottieRef={lottieRef}
            loop
            autoPlay // ✅ Attempt autoplay
            playsInline // ✅ Allow playback in mobile browsers
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
