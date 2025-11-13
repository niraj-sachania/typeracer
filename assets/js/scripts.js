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

// -------------------------
// Timing controls (start/stop/retry)
// -------------------------

let _startTimeMs = null;
let _running = false;

function formatSeconds(sec) {
  return `${sec.toFixed(2)}s`;
}

function setResultTime(seconds) {
  const el = document.getElementById('result-time');
  if (!el) return;
  el.textContent = formatSeconds(seconds);
}

function setResultLevel(level) {
  const el = document.getElementById('result-level');
  if (!el) return;
  el.textContent = String(level).charAt(0).toUpperCase() + String(level).slice(1);
}

function handleStartClick() {
  if (_running) return; // already running
  const startBtn = document.getElementById('start-button');
  const stopBtn = document.getElementById('stop-button');
  if (!startBtn || !stopBtn) return;

  _startTimeMs = performance.now();
  _running = true;

  // UI state: disable start, enable stop
  startBtn.disabled = true;
  stopBtn.disabled = false;

  // reset displayed time while running
  setResultTime(0);
}

function handleStopClick() {
  if (!_running || _startTimeMs == null) return;
  const startBtn = document.getElementById('start-button');
  const stopBtn = document.getElementById('stop-button');
  if (!startBtn || !stopBtn) return;

  const elapsedMs = performance.now() - _startTimeMs;
  const seconds = elapsedMs / 1000;

  // display result rounded to two decimals
  setResultTime(seconds);

  // UI state: enable start, disable stop
  startBtn.disabled = false;
  stopBtn.disabled = true;

  _running = false;
  _startTimeMs = null;
}

function handleRetryClick() {
  // Reset state so user can start again
  const startBtn = document.getElementById('start-button');
  const stopBtn = document.getElementById('stop-button');
  const textarea = document.querySelector('textarea');
  if (textarea) textarea.value = '';
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
  _running = false;
  _startTimeMs = null;
  setResultTime(0);
  // reset WPM display if present
  const wpmEl = document.getElementById('result-wpm');
  if (wpmEl) wpmEl.textContent = '0';
}

function initTimerControls() {
  const startBtn = document.getElementById('start-button');
  const stopBtn = document.getElementById('stop-button');
  const retryBtn = document.getElementById('retry-button');
  const select = document.getElementById('difficulty-select');

  if (startBtn) startBtn.addEventListener('click', handleStartClick);
  if (stopBtn) stopBtn.addEventListener('click', handleStopClick);
  if (retryBtn) retryBtn.addEventListener('click', handleRetryClick);

  // Ensure initial button states
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;

  // When difficulty changes, update the result level label too
  if (select) {
    select.addEventListener('change', () => setResultLevel(select.value || 'easy'));
    // set initial level
    setResultLevel(select.value || 'easy');
  }
}

function initApp() {
  initSampleSelector();
  initTimerControls();
}

document.addEventListener("DOMContentLoaded", initApp);
