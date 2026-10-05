import { useEffect, useState } from "react";
import { Hud } from "./components/hud";
import { defaultHudData, type HudData, type NuiMessage } from "./types";

const isBrowserPreview = import.meta.env.DEV;

function App() {
  // In-game: hidden until client reports the player is in a vehicle.
  // Browser preview: start visible with mock data.
  const [visible, setVisible] = useState(isBrowserPreview);
  const [data, setData] = useState<HudData>(defaultHudData);

  useEffect(() => {
    const onMessage = (event: MessageEvent<NuiMessage>) => {
      const message = event.data;
      if (!message || typeof message !== "object" || !("action" in message)) {
        return;
      }

      if (message.action === "setVisible") {
        setVisible(message.visible);
        return;
      }

      if (message.action === "update") {
        if (typeof message.visible === "boolean") {
          setVisible(message.visible);
        }
        setData(message.data);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <main className="stage">
      <Hud data={data} />
    </main>
  );
}

export default App;
