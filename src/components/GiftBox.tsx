// GiftBox.tsx - Basic structure
import React from "react";

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
  const [open, setOpen] = React.useState(isOpened);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      onOpen?.();
    }
    else {
    setOpen(false);
  }
  };

  return (
    <div className="board" onClick={handleClick}>
      <div className={`box ${open ? "open" : ""}`}>
        <div className="lid">
          <span className="ribbon"></span>
        </div>
        <div className="body"></div>
        <div className="contents">{rewardText}</div>
      </div>
    </div>
  );
};

export default GiftBox;