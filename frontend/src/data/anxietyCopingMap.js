// frontend/src/data/anxietyCopingMap.js
export const copingMap = {
  fast_heartbeat: {
    label: "Fast heartbeat",
    reassurance:
      "A racing heart is frightening but often harmless — your body is in a temporary stress response. Let's slow it down together.",
    techniques: [
      {
        id: "box_breath",
        title: "Box breathing",
        desc: "4s in — 4s hold — 4s out — 4s hold",
        action: "breathing",
      },
      {
        id: "grounding",
        title: "5-4-3-2-1 grounding",
        desc: "Name 5 things you see, 4 you can touch…",
        action: "grounding",
      },
      {
        id: "sit_rest",
        title: "Sit & place hand on chest",
        desc: "Sit down, place hand on chest, slow breaths.",
        action: "static",
      },
    ],
  },

  chest_tightness: {
    label: "Chest tightness",
    reassurance:
      "Chest tightness can happen with anxiety. If you feel severe chest pain or think it is cardiac, call emergency services.",
    techniques: [
      {
        id: "pursed",
        title: "Pursed-lip breathing",
        desc: "Breathe in 2s — breathe out through lips 4s",
        action: "breathing",
      },
      {
        id: "lean_forward",
        title: "Lean forward",
        desc: "Sit, lean slightly forward, breathe slowly",
        action: "static",
      },
      {
        id: "audio",
        title: "Play a calming audio",
        desc: "Soft narration + breathing cues.",
        action: "audio",
      },
    ],
  },

  short_breath: {
    label: "Shortness of breath",
    reassurance:
      "Rapid shallow breathing makes you feel worse — slow breathing will help oxygenation and calm the nervous system.",
    techniques: [
      {
        id: "diaphragmatic",
        title: "Diaphragmatic breathing",
        desc: "Belly expands on inhale; exhale longer.",
        action: "breathing",
      },
      {
        id: "counted",
        title: "Counted exhale",
        desc: "In 3, out 6",
        action: "breathing",
      },
      {
        id: "grounding",
        title: "5-4-3-2-1 grounding",
        desc: "Anchor attention in your senses",
        action: "grounding",
      },
    ],
  },

  shaking: {
    label: "Shaking / Trembling",
    reassurance:
      "Your muscles are releasing tension — grounding + progressive muscle relaxation helps.",
    techniques: [
      {
        id: "pmr",
        title: "Progressive muscle relax",
        desc: "Tense & release muscle groups slowly",
        action: "guided",
      },
      {
        id: "grounding",
        title: "5-4-3-2-1 grounding",
        desc: "Bring awareness back to now",
        action: "grounding",
      },
    ],
  },

  derealization: {
    label: "Feeling unreal / detached",
    reassurance:
      "This is dissociation — small grounding exercises will reconnect you to the present.",
    techniques: [
      {
        id: "sensory",
        title: "Sensory grounding",
        desc: "Hold an object; notice texture, temperature",
        action: "grounding",
      },
      {
        id: "breath",
        title: "Slow breath",
        desc: "Counting breaths slowly",
        action: "breathing",
      },
    ],
  },

  panic: {
    label: "Sudden fear / dread",
    reassurance:
      "Panic feels large and fast, but it passes — use fast-acting techniques.",
    techniques: [
      {
        id: "sit",
        title: "Sit & breathe",
        desc: "Find a seat, slow breathing",
        action: "breathing",
      },
      {
        id: "reality",
        title: "Reality check",
        desc: "Name what is actually happening now",
        action: "grounding",
      },
    ],
  },

  overthinking: {
    label: "Overthinking",
    reassurance:
      "Thoughts can loop — try redirecting attention with grounding or write the thoughts down.",
    techniques: [
      {
        id: "journaling",
        title: "Quick journal",
        desc: "2–3 bullet points of what you fear",
        action: "journal",
      },
      {
        id: "timeout",
        title: "5-minute timeout",
        desc: "Shift attention with a short audio",
        action: "audio",
      },
    ],
  },

  concentration: {
    label: "Difficulty concentrating",
    reassurance:
      "Anxiety scatters attention — grounding and gentle movement help.",
    techniques: [
      {
        id: "move",
        title: "Gentle movement",
        desc: "Stand & stretch for 30s",
        action: "static",
      },
      {
        id: "breath",
        title: "Box breathing",
        desc: "4-4-4-4",
        action: "breathing",
      },
    ],
  },

  sweaty: {
    label: "Sweaty palms",
    reassurance: "Common physical sign — cool water, slow breath helps.",
    techniques: [
      {
        id: "cool",
        title: "Cool water",
        desc: "Splash face or hands with cool water",
        action: "static",
      },
      {
        id: "breath",
        title: "Slow breath",
        desc: "Long exhale",
        action: "breathing",
      },
    ],
  },

  overwhelmed: {
    label: "Feeling overwhelmed",
    reassurance:
      "Break tasks down; focus on the next small step.",
    techniques: [
      {
        id: "list",
        title: "One-step list",
        desc: "Write 3 tiny next steps",
        action: "journal",
      },
      {
        id: "ground",
        title: "5-4-3-2-1",
        desc: "Grounding routine",
        action: "grounding",
      },
    ],
  },

  nausea: {
    label: "Nausea / dizziness",
    reassurance: "Sit down, hydrate; breathing and cool air help.",
    techniques: [
      {
        id: "sit",
        title: "Sit & sip water",
        desc: "Slow sips and rest",
        action: "static",
      },
      {
        id: "cool",
        title: "Cool air",
        desc: "Open a window or use a fan",
        action: "static",
      },
    ],
  },

  unsafe: {
    label: "Feeling unsafe",
    reassurance:
      "If you are in danger, call emergency services. For anxiety-based unsafe feelings, grounding + safe person contact helps.",
    techniques: [
      {
        id: "contact",
        title: "Call a safe person",
        desc: "Reach out to someone you trust",
        action: "contact",
      },
      {
        id: "ground",
        title: "Grounding",
        desc: "5-4-3-2-1",
        action: "grounding",
      },
    ],
  },
};
