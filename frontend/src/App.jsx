import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnonChat from "./pages/AnonChat";
import AnonDailyLife from "./pages/AnonDailyLife";
import AnonProHelp from "./pages/AnonProHelp";
import AnonStories from "./pages/AnonStories";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Anonymous features */}
        <Route path="/anon/chat" element={<AnonChat />} />
        <Route path="/anon/daily-life" element={<AnonDailyLife />} />
        <Route path="/anon/pro-help" element={<AnonProHelp />} />
        <Route path="/anon/stories" element={<AnonStories />} />

        {/* Auth pages (placeholders for now) */}
        <Route path="/login" element={<div className="p-6">Login page</div>} />
        <Route path="/signup" element={<div className="p-6">Signup page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
