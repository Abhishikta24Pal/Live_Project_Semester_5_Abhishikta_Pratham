// backend/main/routes/curatedStories.js
import express from "express";

const router = express.Router();

/**
 * 6 curated, long-form comfort stories.
 * minutes is an estimate for UI. Keep text in "body".
 */
const STORIES = [
  {
    id: "curated-1",
    title: "When the Waves Feel Too High",
    mood: "calming",
    topic: "anxiety spike",
    minutes: 5,
    summary:
      "A gentle shoreline walk that teaches you to breathe with the waves and come back to the present, one tiny safe step at a time.",
    body: `You notice it before you name it: a hum in the chest, like a motor you didn't turn on. ... 
(1) Feel your feet. (2) Notice one sound near, one sound far. (3) Soften the jaw. 
... The wave rises, but you are learning its shape. ... Tonight, enough is enough.`,
  },
  {
    id: "curated-2",
    title: "The Room With the Open Window",
    mood: "grounding",
    topic: "overwhelm",
    minutes: 4,
    summary:
      "You tidy a single square of your day, learning that calm is created in corners, not conquered all at once.",
    body: `There is a room in your mind that keeps its window open, even on noisy days. ... 
You pick one surface, one square foot, one task. ... 
You are not behind; you are arriving.`,
  },
  {
    id: "curated-3",
    title: "A Letter From Tomorrow’s You",
    mood: "encouraging",
    topic: "self-doubt",
    minutes: 5,
    summary:
      "Future-you writes back, reminding you that progress is quiet, survivals count, and small courage compounds.",
    body: `Hey—it's me. Or rather, it's you from a day you haven't met yet. ... 
I won't pretend it was easy; I will say it was possible. ... 
See you soon. I'll keep the porch light on.`,
  },
  {
    id: "curated-4",
    title: "On Carrying a Quiet Grief",
    mood: "reflective",
    topic: "loss",
    minutes: 6,
    summary:
      "You carry a stone for someone you miss—not to weigh you down, but to remember with tenderness and light.",
    body: `You found the smooth stone on a day your hands needed something to hold. ... 
Grief changes weight with weather. ... 
Some loves do not end; they change address.`,
  },
  {
    id: "curated-5",
    title: "Kindness You Owe Yourself",
    mood: "self-compassion",
    topic: "self-esteem",
    minutes: 4,
    summary:
      "You practice talking to yourself like someone you love—imperfect, learning, worthy anyway.",
    body: `Imagine speaking to a friend in your tone. You would never. ... 
Try this: “I’m learning.” “I can rest.” “Enough for today.” ... 
You are not a project; you are a person.`,
  },
  {
    id: "curated-6",
    title: "When Anger Knocks Softly",
    mood: "soothing",
    topic: "anger release",
    minutes: 3,
    summary:
      "You give anger a chair and a glass of water; it tells you what it’s protecting, and you let it loosen its fists.",
    body: `Anger arrives like a visitor who doesn't know where to put their shoes. ... 
Ask: “What are you trying to protect?” ... 
Thank it for the alarm; choose the action that builds tomorrow.`,
  },
];

/** List stories (for the grid) */
router.get("/stories/curated", (req, res) => {
  const list = STORIES.map(({ id, title, mood, topic, minutes, summary }) => ({
    id,
    title,
    mood,
    topic,
    minutes,
    summary,
  }));
  res.json({ ok: true, data: list });
});

/** Get one story by id */
router.get("/stories/curated/:id", (req, res) => {
  const story = STORIES.find((s) => s.id === req.params.id);
  if (!story) return res.status(404).json({ ok: false, error: "Not found" });

  // normalize fields your player expects
  res.json({
    ok: true,
    data: {
      title: story.title,
      story: story.body,
      summary: story.summary,
      mood: story.mood,
      topic: story.topic,
      minutes: story.minutes,
      id: story.id,
    },
  });
});

export default router;
