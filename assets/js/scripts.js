const TypingSamples = (() => {
  const samples = {
    easy: [
      "The cat sat on the mat.",
      "It is a sunny day and I like to play.",
      "She sells seashells by the seashore.",
    ],
    medium: [
      "A quick brown fox jumps over the lazy dog near the riverbank.",
      "Typing accurately will improve your speed much faster than racing alone.",
      "Practice makes progress: focus on rhythm and reduce mistakes.",
    ],
    hard: [
      "Although the rain had stopped, the streets still shimmered with reflections of neon signs.",
      "She pondered the implications of the hypothesis and began formulating the next experiment.",
      "Complexity arises when multiple asynchronous operations interact without proper coordination.",
    ],
  };

  function pickRandom(level) {
    const list = samples[level] || samples.easy;
    return list[Math.floor(Math.random() * list.length)];
  }

  return { pickRandom };
})();

function setSampleTextFor(level) {
  const el = document.getElementById("sample-text");
  if (!el) return;
  const text = TypingSamples.pickRandom(level);
  el.textContent = text;
}

function initSampleSelector() {
  const select = document.getElementById("difficulty-select");
  if (!select) return;

  // Set initial sample based on the select's current value
  setSampleTextFor(select.value || "easy");

  // Update sample whenever difficulty changes
  select.addEventListener("change", () =>
    setSampleTextFor(select.value || "easy")
  );
}

document.addEventListener("DOMContentLoaded", initSampleSelector);
