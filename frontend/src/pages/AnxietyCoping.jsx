// frontend/src/pages/AnxietyCoping.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { copingMap } from "../data/anxietyCopingMap";

export default function AnxietyCoping() {
  let { symptomId } = useParams();
  const navigate = useNavigate();

  // Convert dashes to underscores to match keys
  symptomId = symptomId.replace(/-/g, "_");

  const symptom = copingMap[symptomId];
  const items = symptom?.techniques || [];

  const [showQuick, setShowQuick] = useState(false);

  if (!symptom) {
    return (
      <main className="p-6 bg-[#6C9BCF] min-h-screen text-black dark:text-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Not Found</h2>
          <p className="mt-2">No coping steps found for this symptom.</p>

          <button
            onClick={() => navigate("/anxiety")}
            className="mt-4 px-4 py-2 bg-[#D36B8A] text-white rounded-xl shadow"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#6C9BCF] dark:bg-[#1C1F2A] p-6">
      <div className="max-w-2xl mx-auto animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          {symptom.label}
        </h2>

        {/* Reassurance */}
        <p className="opacity-90 text-sm mb-6 bg-white/40 dark:bg-white/10 p-3 rounded-xl">
          {symptom.reassurance}
        </p>

        {/* Guided Script */}
        <div className="mb-6 p-4 rounded-xl bg-white/80 dark:bg-[#0c0c0e] shadow-md">
          <h3 className="font-semibold text-lg mb-2">Here’s what to do right now:</h3>
          <ul className="text-sm opacity-90 leading-relaxed">
            <li>• Slow your breathing, even if it feels difficult.</li>
            <li>• Keep your eyes on one still object in the room.</li>
            <li>• Place your hand on your chest or stomach.</li>
            <li>• Tell yourself gently: “I am safe. This will pass.”</li>
          </ul>
        </div>

        {/* Techniques */}
        <div className="grid gap-4">
          {items.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0b0c0e] shadow-md shadow-black/10 border border-white/40 hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-base font-semibold">{t.title}</div>
                  <div className="text-xs opacity-70">{t.desc}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <SmallPill>{t.action}</SmallPill>

                  <button
                    onClick={() => {
                      if (t.action === "breathing") setShowQuick(true);
                      if (t.action === "audio") navigate("/anon/daily-life");
                      if (t.action === "journal") navigate("/journal");
                      if (t.action === "contact")
                        alert("Reach out to someone safe right now ❤️");
                    }}
                    className="text-sm bg-[#D36B8A] hover:bg-[#c15f7d] text-white px-3 py-1 rounded-lg shadow"
                  >
                    Try
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setShowQuick(true)}
            className="px-5 py-2 rounded-xl bg-[#D36B8A] text-white shadow hover:scale-[1.03] transition"
          >
            Help me right now
          </button>

          <button
            onClick={() => navigate("/MainDashboard")}
            className="px-5 py-2 rounded-xl bg-white/60 dark:bg-white/10 border shadow"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Modal */}
      {showQuick && <BreathingModal onClose={() => setShowQuick(false)} />}
    </main>
  );
}

/* ---------------- Small Pill ---------------- */
function SmallPill({ children }) {
  return (
    <div className="text-xs px-2 py-1 rounded-full bg-[#F490B1] text-white shadow">
      {children}
    </div>
  );
}

/* ---------------- Breathing Modal ---------------- */
function BreathingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#0b0c0e] rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Quick Breathing</h4>
          <button onClick={onClose} className="text-sm opacity-70">
            Close
          </button>
        </div>

        <p className="mt-3 text-sm opacity-80">
          Follow the circle — breathe in as it grows, out as it shrinks.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <BreathingWidget />
          <div className="text-sm opacity-70">Exhale longer than inhale.</div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#D36B8A] text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Breathing Animation ---------------- */
function BreathingWidget() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-40 h-40 rounded-full bg-gradient-to-br from-[#E2ECE9] to-[#D6E2F0] flex items-center justify-center shadow-inner"
        style={{ animation: "pulse 6s infinite ease-in-out" }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
          }}
        >
          Breathe
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.85); }
          50% { transform: scale(1.10); }
          100% { transform: scale(0.85); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
