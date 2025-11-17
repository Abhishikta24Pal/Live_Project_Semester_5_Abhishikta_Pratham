import YouNowRecorder from "../components/YouNowRecorder";
import YouNowHistory from "../components/YouNowHistory";

export default function YouNow() {
  return (
    <main className="min-h-screen p-6 md:p-10  bg-[#6C9BCF]  text-black dark:text-white">
      <h1 className="text-2xl font-bold text-black dark:text-ssNavyD">You Now / You Back Then</h1>
      <p className="mb-6 text-sm opacity-80">Remember yourself like no other day.</p>

      <div className="bg-white dark:bg-[#1C1F2A] p-6 rounded-2xl shadow-md mb-10">
        <YouNowRecorder />
      </div>

      <div className="bg-white dark:bg-[#1C1F2A] p-6 rounded-2xl shadow-md">
        <YouNowHistory />
      </div>
    </main>
  );
}
