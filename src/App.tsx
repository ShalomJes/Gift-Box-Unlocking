// App.tsx - Initial version
import { useState } from "react";
import "./App.css";
import GiftBox from "./components/GiftBox";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const onOpen = (): void => {
    setIsOpened(true);
  };

  return (
    <main className="galaxy-sparkle w-full">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-white">
            Unlock Your Gift Box
          </h1>
        </div>
        <GiftBox isOpened={isOpened} onOpen={onOpen} />
      </div>
    </main>
  );
}

export default App;
