import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnonChat from "./pages/AnonChat";
import AnonDailyLife from "./pages/AnonDailyLife";
import ProHelp from "./pages/ProHelp";
import Stories from "./pages/Stories";
import StoryPlayer from "./pages/StoryPlayer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard.jsx";
import SleepYouNeed from "./pages/SleepYouNeed";
import CuratedStory from "./pages/CuratedStory";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MainDashboard" element={<MainDashboard />} />

        {/* Anonymous */}
        <Route path="/anon/chat" element={<AnonChat />} />
        <Route path="/anon/daily-life" element={<AnonDailyLife />} />
        <Route path="/anon/pro-help" element={<ProHelp />} />
        <Route path="/anon/stories" element={<Stories />} />
        <Route path="/anon/stories/:id" element={<StoryPlayer />} />
        <Route path="/anon/stories/generate" element={<StoryPlayer generate />} />
        <Route path="/sleep" element={<SleepYouNeed />} />
        <Route path="/anon/stories/curated/:id" element={<CuratedStory />} />

        {/* Auth */}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
