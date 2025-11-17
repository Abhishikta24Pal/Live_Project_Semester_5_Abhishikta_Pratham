// frontend/src/pages/MainDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import DarkModeToggle from "../components/DarkModeToggle";
import LanguageToggle from "../components/LanguageToggle";
import AIBuddyToggle from "../components/AIBuddyToggle";

import JournalIcon from "../assets/icons/journal.svg";
import AnxietyIcon from "../assets/icons/anxiety.svg";
import MeditationIcon from "../assets/icons/meditation.svg";
import SleepIcon from "../assets/icons/sleep.svg";
import StoriesIcon from "../assets/icons/stories.svg";
import DailyLifeIcon from "../assets/icons/dailylife.svg";
import YouNowBackThenIcon from "../assets/icons/you_now.svg";
import ProfHelpIcon from "../assets/icons/profhelp.svg";

// 👇 import from your AuthContext
export default function MainDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const friendlyName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0].replace(/[._-]/g, " ") : "User");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Could not logout. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#6C9BCF] text-ink dark:text-inkD p-6 md:p-10">
      {/* USER INFO SECTION */}
      <section className="bg-white dark:bg-[#1C1F2A] rounded-2xl p-6 md:p-8 shadow-md mb-10 flex flex-col md:flex-row justify-between items-center">
        {/* LEFT: name/email + logout (takes remaining space) */}
        <div className="flex items-center gap-6 w-full md:w-auto flex-1">
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-ssNavy dark:text-white">
              {friendlyName}
            </div>
            <div className="text-sm opacity-75 mt-1">{user?.email || "No email"}</div>

            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-ssPrimary hover:bg-ssPrimaryH text-white shadow-sm transition"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Check-in and Toggles */}
        <div className="mt-6 md:mt-0 text-right flex flex-col gap-2">
          <div
            onClick={() => navigate("/ai-buddy-history")}
            className="bg-[#F490B1] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition cursor-pointer col-span-1 row-span-1"
          >
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="font-semibold text-center text-ink">
              AI Buddy Memories →
            </h3>
          </div>
          <DarkModeToggle />
          <LanguageToggle />
        </div>
      </section>

      {/* FEATURE GRID SECTION */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                   auto-rows-[180px] gap-6"
      >
        {/* JOURNAL */}
        <div
          onClick={() => navigate("/journal")}
          className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center hover:shadow-lg transition col-span-1 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={JournalIcon}
              alt="Journal"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-ink">Journal →</h3>
        </div>

        {/* ANXIETY SUPPORT */}
        <div
          onClick={() => navigate("/anxiety")}
          className="bg-[#F490B1] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-1 md:col-span-2 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={AnxietyIcon}
              alt="Anxiety"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-white text-lg">
            Anxiety Support →
          </h3>
        </div>

        {/* YOU NOW / YOU BACK THEN */}
        <div
          onClick={() => navigate("/you-now")}
          className="bg-[#F490B1] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-1 md:col-span-2 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={YouNowBackThenIcon}
              alt="You-Now-Back-Then"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-white text-lg">
            You Now / You Back Then →
          </h3>
        </div>

        {/* USUAL DAILY LIFE */}
        <div
          onClick={() => navigate("/anon/daily-life")}
          className="bg-[#00A7C6] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-1 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={DailyLifeIcon}
              alt="Daily-Life"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-white text-lg">
            Usual Daily Life →
          </h3>
        </div>

        {/* MEDITATION */}
        <div
          onClick={() => navigate("/meditation")}
          className="bg-[#ffffff] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-1 row-span-2 row-start-1 col-start-4"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={MeditationIcon}
              alt="Meditation"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-black text-lg">
            Meditation →
          </h3>
        </div>

        {/* THE SLEEP YOU NEED */}
        <div
          onClick={() => navigate("/sleep")}
          className="bg-[#00A7C6] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg cursor-pointer transition col-span-1 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={SleepIcon}
              alt="Sleep"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-white text-lg">
            The Sleep You Need →
          </h3>
        </div>

        {/* STORIES OF OTHERS */}
        <div
          onClick={() => navigate("/anon/stories")}
          className="bg-[#ffffff] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-1 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={StoriesIcon}
              alt="Stories"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-black text-lg">
            Stories of Others →
          </h3>
        </div>

        {/* PROFESSIONAL HELP */}
        <div
          onClick={() => navigate("/anon/pro-help")}
          className="bg-[#F490B1] rounded-2xl p-6 shadow-md flex flex-col justify-center hover:shadow-lg transition col-span-2 row-span-1"
        >
          <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={ProfHelpIcon}
              alt="Professional Help"
              className="h-24 w-24 object-contain"
            />
          </div>
          <h3 className="font-semibold text-center text-white text-lg">
            Professional Help Section →
          </h3>
          <AIBuddyToggle />
        </div>
      </section>
    </main>
  );
}
