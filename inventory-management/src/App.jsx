import { BrowserRouter, Routes, Route } from "react-router-dom";
import DispatchEntry from "./DispatchEntry";
import ReturnEntry from "./ReturnEntry";
import LocationTracker from "./LocationTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DispatchEntry />} />
        <Route path="/return" element={<ReturnEntry />} />
        <Route path="/tracker" element={<LocationTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;