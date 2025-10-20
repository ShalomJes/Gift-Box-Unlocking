// App.tsx - Initial version
import { useEffect, useState } from "react";
import "./App.css";
import GiftBox from "./components/GiftBox";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="galaxy-sparkle w-full">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-white">
            Here Is Your Reward
          </h1>
        </div>
        <GiftBox isOpened={isOpened} onOpen={() => setIsOpened(true)} />
      </div>
    </main>
  );
}

export default App;
