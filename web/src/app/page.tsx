"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";

type TonePreset = {
  label: string;
  mood: string;
  colorLanguage: string;
};

const tonePresets: TonePreset[] = [
  {
    label: "Wholesome Cozy",
    mood: "a soothing, heartwarming atmosphere filled with slow-burn intimacy",
    colorLanguage: "soft pastel palettes, warm candlelight, gentle acoustic themes",
  },
  {
    label: "Star-crossed Drama",
    mood: "high stakes romance with emotional crescendos and poetic angst",
    colorLanguage: "neon dusk skylines, rain swept streets, swelling orchestral cues",
  },
  {
    label: "Magical Realism",
    mood: "romance woven with wonder, surreal discoveries, and lyrical symbolism",
    colorLanguage:
      "glowing constellations, enchanted flora, ethereal chimes and whispers",
  },
];

const mechanicOptions = [
  "branching dialogue",
  "relationship stat tracking",
  "calendar-based scheduling",
  "mini-games for emotional resonance",
  "cozy crafting to unlock memories",
  "cinematic quick-time expressions",
  "moral alignment choices",
  "dual perspective storytelling",
];

const pacingOptions = [
  "Episodic chapters with cliffhangers",
  "Open-world slice-of-life loop",
  "Visual novel routes branching early",
  "Time loop with evolving choices",
  "Seasonal progression across a year",
];

const platformOptions = [
  "PC & Console narrative adventure",
  "Mobile interactive fiction",
  "VR immersive romance experience",
  "Web-based playable teaser",
  "Hybrid visual novel & dating sim",
];

const ratingDescriptors = [
  "PG gentle affection",
  "PG-13 modern romance",
  "Mature emotional intimacy",
];

const defaultState = {
  workingTitle: "Moonlit Echoes",
  setting: "a floating archipelago of bioluminescent isles inspired by Southeast Asian folklore",
  protagonists:
    "A rebellious star-mapper and a grounded botanical artisan whose families control rival sky-gardens",
  conflict:
    "Centuries-old ecological feud threatens the archipelago just as a rare lunar alignment awakens an ancient vow binding their bloodlines",
  twist:
    "Every choice etches sigils into the sky, rewriting constellations that alter the emotional memories of both leads",
  tonalPreset: tonePresets[2],
  mechanics: new Set<string>(["branching dialogue", "cozy crafting to unlock memories", "dual perspective storytelling"]),
  pacing: "Seasonal progression across a year",
  platform: "PC & Console narrative adventure",
  rating: "PG-13 modern romance",
  playerExperience:
    "Players feel enchanted, emotionally invested, and empowered to choreograph meaningful gestures of love while safeguarding the ecosystem.",
  mustInclude:
    "translate player choices into evolving constellations, highlight cultural rituals, celebrate slow trust-building scenes",
};

export default function Page() {
  const [workingTitle, setWorkingTitle] = useState(defaultState.workingTitle);
  const [setting, setSetting] = useState(defaultState.setting);
  const [protagonists, setProtagonists] = useState(defaultState.protagonists);
  const [conflict, setConflict] = useState(defaultState.conflict);
  const [twist, setTwist] = useState(defaultState.twist);
  const [tonalPreset, setTonalPreset] = useState<TonePreset | null>(
    defaultState.tonalPreset,
  );
  const [mechanics, setMechanics] = useState<Set<string>>(defaultState.mechanics);
  const [pacing, setPacing] = useState(defaultState.pacing);
  const [platform, setPlatform] = useState(defaultState.platform);
  const [rating, setRating] = useState(defaultState.rating);
  const [playerExperience, setPlayerExperience] = useState(
    defaultState.playerExperience,
  );
  const [mustInclude, setMustInclude] = useState(defaultState.mustInclude);
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const mechanicsList = useMemo(() => Array.from(mechanics), [mechanics]);

  const generatedPrompt = useMemo(() => {
    const toneMood = tonalPreset
      ? `${tonalPreset.mood} with descriptive cues like ${tonalPreset.colorLanguage}`
      : "a heartfelt romantic tone rooted in authentic emotions";

    const mechanicsSection =
      mechanicsList.length > 0
        ? `Key interactive pillars: ${mechanicsList
            .map((item) => `• ${item}`)
            .join("\n")}.`
        : "Suggest appropriate interactive mechanics that reinforce emotional choices.";

    const mustIncludeSection = mustInclude
      ? `Non-negotiables: ${mustInclude}.`
      : "";

    return [
      `You are an award-winning narrative game designer helping craft a romantic game concept.`,
      `Working title: ${workingTitle}.`,
      `Primary setting: ${setting}.`,
      `Lead characters: ${protagonists}.`,
      `Central conflict: ${conflict}.`,
      `Signature twist: ${twist}.`,
      `Target experience: ${playerExperience}`,
      `Tone & atmosphere: ${toneMood}.`,
      `Platform goals: ${platform}.`,
      `Narrative pacing: ${pacing}.`,
      `Content rating & boundaries: ${rating}.`,
      mechanicsSection,
      mustIncludeSection,
      `Deliverables:\n• High-level story synopsis with acts and emotional beats\n• Character arcs with relationship milestones\n• Gameplay loop that reinforces intimacy and player agency\n• Sensory palate (visual, audio, UX) that embodies the romance\n• Optional stretch goals or narrative DLC hooks`,
      `Voice & format: use immersive, transportive language; keep paragraphs concise; highlight how mechanics and story intertwine; end with three quick pitching taglines.`,
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [
    conflict,
    mechanicsList,
    mustInclude,
    pacing,
    platform,
    playerExperience,
    protagonists,
    rating,
    setting,
    tonalPreset,
    twist,
    workingTitle,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrompt(generatedPrompt);
    setCopied(false);
  };

  const handleReset = () => {
    setWorkingTitle("");
    setSetting("");
    setProtagonists("");
    setConflict("");
    setTwist("");
    setTonalPreset(null);
    setMechanics(new Set());
    setPacing("");
    setPlatform("");
    setRating("");
    setPlayerExperience("");
    setMustInclude("");
    setPrompt("");
    setCopied(false);
  };

  const handleMechanicToggle = (value: string) => {
    setMechanics((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const handleToneSelect = (preset: TonePreset) => {
    setTonalPreset(preset);
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Romantic game prompt lab</span>
          <h1 className={styles.title}>Design irresistible romantic game prompts</h1>
          <p className={styles.subtitle}>
            Shape a vivid creative brief ready for any AI copilot. Blend emotional
            arcs, interactive mechanics, and atmospheric details into a single,
            production-ready prompt tailored for romantic game devs.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="title">
                Working title & hook
              </label>
            </div>
            <input
              id="title"
              className={styles.input}
              placeholder="e.g. Starlit Letters"
              value={workingTitle}
              onChange={(event) => setWorkingTitle(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="setting">
              Signature setting or worldbuilding
            </label>
            <textarea
              id="setting"
              className={styles.textarea}
              placeholder="Describe the romantic backdrop players explore…"
              value={setting}
              onChange={(event) => setSetting(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="protagonists">
              Lead characters & chemistry
            </label>
            <textarea
              id="protagonists"
              className={styles.textarea}
              placeholder="Outline the protagonists, their motivations, and how sparks fly…"
              value={protagonists}
              onChange={(event) => setProtagonists(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="conflict">
              Core conflict or obstacle
            </label>
            <textarea
              id="conflict"
              className={styles.textarea}
              placeholder="What threatens their bond or the world around them?"
              value={conflict}
              onChange={(event) => setConflict(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="twist">
              Signature twist
            </label>
            <textarea
              id="twist"
              className={styles.textarea}
              placeholder="Include the magical, sci-fi, or dramatic hook that makes this romance unforgettable…"
              value={twist}
              onChange={(event) => setTwist(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <span className={styles.label}>Tonal presets</span>
              <span className={styles.hint}>Tap to infuse language & mood</span>
            </div>
            <div className={styles.chips}>
              {tonePresets.map((preset) => {
                const isActive = tonalPreset?.label === preset.label;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleToneSelect(preset)}
                    className={styles.chipButton}
                    style={
                      isActive
                        ? {
                            borderColor: "rgba(255, 145, 200, 0.75)",
                            background: "rgba(60, 20, 78, 0.75)",
                          }
                        : undefined
                    }
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <span className={styles.label}>Gameplay pillars</span>
              <span className={styles.hint}>Select mechanics that matter</span>
            </div>
            <div className={styles.chips}>
              {mechanicOptions.map((option) => {
                const isActive = mechanics.has(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMechanicToggle(option)}
                    className={styles.chipButton}
                    style={
                      isActive
                        ? {
                            borderColor: "rgba(255, 145, 200, 0.75)",
                            background: "rgba(60, 20, 78, 0.75)",
                          }
                        : undefined
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="player-experience">
              Desired player feelings & outcomes
            </label>
            <textarea
              id="player-experience"
              className={styles.textarea}
              placeholder="Describe how players should feel after each session…"
              value={playerExperience}
              onChange={(event) => setPlayerExperience(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="must-include">
              Must include elements
            </label>
            <textarea
              id="must-include"
              className={styles.textarea}
              placeholder="Cultural notes, accessibility, UX details, story beats…"
              value={mustInclude}
              onChange={(event) => setMustInclude(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="platform">
              Target platform
            </label>
            <select
              id="platform"
              className={styles.select}
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              <option value="">Select a primary platform</option>
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="pacing">
              Narrative pacing structure
            </label>
            <select
              id="pacing"
              className={styles.select}
              value={pacing}
              onChange={(event) => setPacing(event.target.value)}
            >
              <option value="">Choose a pacing model</option>
              {pacingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="rating">
              Content boundaries
            </label>
            <select
              id="rating"
              className={styles.select}
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value="">Define a content tone</option>
              {ratingDescriptors.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button className={styles.button} type="submit">
              Generate AI Prompt
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleReset}
            >
              Clear Inputs
            </button>
          </div>
        </form>

        <section className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <h2 className={styles.outputTitle}>Production-ready prompt</h2>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleCopy}
              disabled={!prompt}
              style={
                copied
                  ? {
                      borderColor: "rgba(123, 228, 183, 0.75)",
                      background: "rgba(22, 71, 59, 0.64)",
                      color: "rgba(210, 255, 240, 0.95)",
                    }
                  : undefined
              }
            >
              {copied ? "Copied!" : "Copy prompt"}
            </button>
          </div>
          <div className={styles.outputCard}>
            {prompt ? (
              prompt
            ) : (
              <span className={styles.emptyState}>
                Fill in your romantic game concept details and generate a bespoke AI
                prompt ready for ChatGPT, Claude, Gemini, or any creative copilot.
              </span>
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          Crafted for devs blending interactive storytelling and romance. Re-run the
          generator with fresh moods, mechanics, or twists to iterate fast.
        </footer>
      </div>
    </main>
  );
}
