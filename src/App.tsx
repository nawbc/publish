import { useEffect } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <div className="container"></div>;
}

export default App;
