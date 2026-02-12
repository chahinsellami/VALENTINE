"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ValentineCard() {
  const [count, setCount] = useState(2);
  const [gif, setGif] = useState("/resources/cat-heart.gif");
  const [text, setText] = useState("will you be (name) valentine?❤️😘");
  const [yesScale, setYesScale] = useState({ height: "60%", width: "40%" });
  const [noStyle, setNoStyle] = useState({
    width: "40%",
    fontSize: "7vh",
    display: "block",
  });
  const [showVideo, setShowVideo] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);
  const [celebrations, setCelebrations] = useState<
    { id: number; x: number; y: number; text: string }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sparkleIdRef = useRef(0);
  const confettiIdRef = useRef(0);
  const celebrationIdRef = useRef(0);

  const gifs = [
    "/resources/cat-heart.gif",
    "/resources/rusure.gif",
    "/resources/3shocked-1.gif",
    "/resources/4.crying.gif",
    "/resources/5.crying.gif",
    "/resources/idc.gif",
  ];

  const celebrationMessages = [
    "YES! 💕",
    "❤️❤️❤️",
    "YESSS!",
    "omggg 😍",
    "I KNEW IT! 💋",
  ];

  // Create sparkle effects on button click
  const createSparkles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: sparkleIdRef.current++,
      x: centerX + (Math.random() - 0.5) * rect.width * 2,
      y: centerY + (Math.random() - 0.5) * rect.height * 2,
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);

    setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)),
      );
    }, 800);
  };

  // Create floating hearts
  const createFloatingHearts = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = document.createElement("div");
    container.className = "sparkle-container";

    for (let i = 0; i < 7; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = ["❤️", "💕", "💖", "💗", "💝"][
        Math.floor(Math.random() * 5)
      ];
      heart.style.left = rect.left + rect.width / 2 + "px";
      heart.style.top = rect.top + rect.height / 2 + "px";
      heart.style.setProperty("--tx", (Math.random() - 0.5) * 150 + "px");
      heart.style.setProperty("--ty", -Math.random() * 150 + "px");
      container.appendChild(heart);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1500);
  };

  // Create confetti on YES
  const createConfetti = () => {
    const emojis = ["🎉", "✨", "💕", "❤️", "💖", "🎊", "💝", "😍"];
    const container = document.createElement("div");
    container.className = "sparkle-container";

    for (let i = 0; i < 30; i++) {
      const confettiPiece = document.createElement("div");
      confettiPiece.className = "confetti";
      confettiPiece.innerHTML =
        emojis[Math.floor(Math.random() * emojis.length)];
      confettiPiece.style.left = Math.random() * window.innerWidth + "px";
      confettiPiece.style.top = "-30px";
      confettiPiece.style.setProperty(
        "--tx",
        (Math.random() - 0.5) * 300 + "px",
      );
      container.appendChild(confettiPiece);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 3000);
  };

  // Create celebration text
  const createCelebrationText = () => {
    const msg =
      celebrationMessages[
        Math.floor(Math.random() * celebrationMessages.length)
      ];
    const newCeleb = {
      id: celebrationIdRef.current++,
      x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2,
      y: window.innerHeight * 0.3,
      text: msg,
    };
    setCelebrations((prev) => [...prev, newCeleb]);
    setTimeout(() => {
      setCelebrations((prev) => prev.filter((c) => c.id !== newCeleb.id));
    }, 2000);
  };

  const playSound = (type: "click" | "success") => {
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      if (type === "click") {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1,
        );
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.1);
      } else if (type === "success") {
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + i * 0.1 + 0.2,
          );
          osc.start(audioContext.currentTime + i * 0.1);
          osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
        });
      }
    } catch (e) {
      // Audio context not available
    }
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    setIsAnimating(true);

    playSound("click");
    createSparkles(e);
    createFloatingHearts(e);

    setTimeout(() => setIsAnimating(false), 200);

    if (count === 2) {
      setGif("/resources/rusure.gif");
      setText("You meant to press YES right?🤨");
      setYesScale({ height: "65%", width: "60%" });
      setNoStyle({ width: "30%", fontSize: "7vh", display: "block" });
      setCount(3);
    } else if (count === 3) {
      setGif("/resources/3shocked-1.gif");
      setText("Your hand must have slipped right?🥹");
      setYesScale({ height: "70%", width: "70%" });
      setNoStyle({ width: "20%", fontSize: "7vh", display: "block" });
      setCount(4);
    } else if (count === 4) {
      setGif("/resources/4.crying.gif");
      setText("I'm gonna cry😭");
      setYesScale({ height: "80%", width: "80%" });
      setNoStyle({ width: "10%", fontSize: "4vh", display: "block" });
      setCount(5);
    } else if (count === 5) {
      setGif("/resources/5.crying.gif");
      setText("Pretty Please🥺😘");
      setYesScale({ height: "90%", width: "96%" });
      setNoStyle({ width: "0%", fontSize: "7vh", display: "none" });
    }
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    setIsAnimating(true);

    playSound("success");
    createSparkles(e);
    createFloatingHearts(e);
    createConfetti();
    createCelebrationText();

    setShowVideo(true);
    setGif("/resources/idc.gif");
    setText("Knew it babe 😘");
    setYesScale({ height: "90%", width: "96%" });
    setNoStyle({ width: "0%", fontSize: "7vh", display: "none" });
    setCount(6);

    // Create more celebration text
    setTimeout(() => createCelebrationText(), 300);
    setTimeout(() => createCelebrationText(), 600);

    setTimeout(() => {
      setShowVideo(false);
      setIsAnimating(false);
    }, 9000);
  };

  // Interactive heart decorations
  const handleHeartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    playSound("click");
    const rect = e.currentTarget.getBoundingClientRect();
    const container = document.createElement("div");
    container.className = "sparkle-container";

    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "💕";
      heart.style.left = rect.left + rect.width / 2 + "px";
      heart.style.top = rect.top + rect.height / 2 + "px";
      heart.style.setProperty("--tx", (Math.random() - 0.5) * 100 + "px");
      heart.style.setProperty("--ty", -Math.random() * 100 + "px");
      container.appendChild(heart);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1500);
  };

  return (
    <section className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/resources/heart.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={
            {
              left: sparkle.x,
              top: sparkle.y,
              "--tx": `${(Math.random() - 0.5) * 100}px`,
              "--ty": `${-Math.random() * 100}px`,
            } as any
          }
        >
          ✨
        </div>
      ))}

      {/* Celebration Text */}
      {celebrations.map((celeb) => (
        <div
          key={celeb.id}
          className="celebration-text"
          style={{
            left: celeb.x,
            top: celeb.y,
          }}
        >
          {celeb.text}
        </div>
      ))}

      {/* Floating decorative hearts - Interactive */}
      <div
        className="absolute top-20 left-[15%] text-4xl animate-float heart-decoration animate-glow-pulse"
        onClick={handleHeartClick}
      >
        ❤️
      </div>
      <div
        className="absolute top-32 right-[10%] text-3xl animate-float heart-decoration animate-glow-pulse"
        style={{ animationDelay: "0.5s" }}
        onClick={handleHeartClick}
      >
        💕
      </div>
      <div
        className="absolute bottom-32 left-[5%] text-3xl animate-float heart-decoration animate-glow-pulse"
        style={{ animationDelay: "1s" }}
        onClick={handleHeartClick}
      >
        💖
      </div>
      <div
        className="absolute top-40 left-[50%] text-2xl animate-heart-bounce heart-decoration"
        onClick={handleHeartClick}
      >
        💗
      </div>

      {/* Container - Pixelated Theme */}
      <div className="h-[70%] border-8 border-black w-full md:w-1/3 flex flex-col bg-white shadow-pixel rounded-pixel container-card animate-bounce-gentle state-transition">
        {/* Image Box */}
        <div className="h-[70%] w-full flex flex-col border-b-8 border-black">
          {/* Actual Image */}
          <div className="h-[80%] w-full flex items-center justify-center bg-gradient-to-b from-white to-pink-light overflow-hidden">
            <img
              src={gif}
              alt="Valentine gif"
              className="h-[90%] w-[64%] md:w-[80%] pixel-image animate-scale-pop"
              loading="lazy"
            />
          </div>

          {/* Text - Pixelated */}
          <div className="h-[20%] w-full flex items-center justify-center border-t-4 border-black bg-pink-light p-2 animate-slide-up state-transition">
            <p
              className="text-center font-pixel text-xs md:text-sm px-2 text-black leading-tight"
              style={{
                textShadow:
                  "2px 2px 0px rgba(255, 20, 147, 0.5), 3px 3px 0px rgba(0,0,0,0.1)",
                wordSpacing: "2px",
              }}
            >
              {text}
            </p>
          </div>
        </div>

        {/* Yes/No Buttons - Pixelated */}
        <div className="h-[30%] w-full flex items-center justify-evenly gap-3 px-4 bg-pink-light">
          <button
            onClick={handleYesClick}
            disabled={isAnimating}
            style={{
              height: yesScale.height,
              width: yesScale.width,
              transition: "all 0.05s ease-in",
            }}
            className="font-pixel text-xs md:text-sm font-bold bg-pink-button text-white border-4 border-black cursor-pointer z-50 shadow-pixel hover:shadow-pixel-hover hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 rounded-pixel flex items-center justify-center flex-wrap animate-pulse-glow button-glow disabled:opacity-75"
          >
            <span className="button-text">
              {count === 6 ? (
                <a
                  href="https://www.instagram.com/p/DQxSpDGjTxT/?img_index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  I LOVE YOU
                </a>
              ) : (
                "YES"
              )}
            </span>
          </button>

          {noStyle.display !== "none" && (
            <button
              onClick={handleNoClick}
              disabled={isAnimating}
              style={{
                width: noStyle.width,
                transition: "all 0.05s ease-in",
                minWidth: noStyle.width === "10%" ? "50px" : "auto",
              }}
              className="font-pixel text-xs md:text-sm font-bold bg-pink-button text-white border-4 border-black cursor-pointer z-50 shadow-pixel hover:shadow-pixel-hover hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 rounded-pixel h-[60%] flex items-center justify-center active:scale-95 button-glow disabled:opacity-75"
            >
              <span className="button-text">NO</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
