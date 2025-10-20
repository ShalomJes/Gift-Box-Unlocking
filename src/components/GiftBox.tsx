// src/components/GiftBox/GiftBox.tsx
import React from "react";
import ReactConfetti from "react-confetti";

interface GiftBoxProps {
  isOpened?: boolean;
  onOpen?: () => void;
  rewardText?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({
  isOpened = false,
  onOpen,
  rewardText = "Red Sports Car!",
}) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(isOpened);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showGlitter, setShowGlitter] = React.useState(false);

  React.useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const createSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
      sparkles.push(
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      );
    }
    return sparkles;
  };

  const createGlitter = () => {
    if (!showGlitter) return null;

    const glitterPieces = [];
    for (let i = 0; i < 50; i++) {
      glitterPieces.push(
        <div
          key={i}
          className="glitter"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            background:
              i % 3 === 0
                ? "var(--sparkle-gold)"
                : i % 3 === 1
                ? "var(--sparkle-silver)"
                : "var(--butterfly-pink)",
          }}
        />
      );
    }
    return glitterPieces;
  };

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      setShowConfetti(true);
      setShowGlitter(true);
      onOpen?.();

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      setTimeout(() => {
        setShowGlitter(false);
      }, 3000);
    } else {
      setOpen(false);
      setShowConfetti(false);
      setShowGlitter(false);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [open]);

  const [dimensions, setDimensions] = React.useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  React.useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div className="board" onClick={handleClick}>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.4}
          initialVelocityY={15}
          colors={[
            "#8B5CF6",
            "#EC4899",
            "#FCD34D",
            "#A78BFA",
            "#C4B5FD",
            "#FFFFFF",
          ]}
          tweenDuration={8000}
        />
      )}

      <div className="sparkle-container">{createSparkles()}</div>

      <div className="glitter-container">{createGlitter()}</div>

      <div className={`box ${open ? "open" : ""}`} id="box" ref={boxRef}>
        <div
          className={`lid ${open ? "animate-lid-open" : "animate-lid-close"}`}
        >
          <span className="ribbon"></span>
        </div>
        <div className="body"></div>

        {/* Car that comes out of the box */}
        <div className="car-container">
          <div className="car-glow"></div>
          <div className="car-image">
            <div className="car-window"></div>
            <div className="car-details"></div>
            <div className="car-wheels">
              <div className="car-wheel"></div>
              <div className="car-wheel"></div>
            </div>
          </div>
        </div>

        <div className="contents">{rewardText}</div>
      </div>

      {!open && (
        <div className="instruction-text">
          Click the gift box or press SPACE/ENTER to reveal your reward!
        </div>
      )}

      {open && (
        <div className="instruction-text">
          Click the box or press SPACE/ENTER to close
        </div>
      )}

      {createSparkles()}
    </div>
  );
};

export default GiftBox;
