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
  renderSampleText(text);
  // clear user input when sample changes
  const textarea = document.querySelector("textarea");
  if (textarea) textarea.value = "";
  // reset highlights and results
  updateHighlightsFromInput("");
  setResultWpm(0);
  setResultTime(0);
  setResultLevel(level || "easy");
}

// Current sample words (array of strings)
let _currentSampleWords = [];

function renderSampleText(sampleText) {
  const el = document.getElementById("sample-text");
  if (!el) return;
  // split into words, preserve simple punctuation as part of words
  const words = String(sampleText).trim().split(/\s+/).filter(Boolean);
  _currentSampleWords = words;
  // clear
  el.innerHTML = "";
  words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "sample-word pending";
    span.setAttribute("data-word-index", String(i));
    span.textContent = w;
    el.appendChild(span);
    // add a space node after each word for spacing
    el.appendChild(document.createTextNode(" "));
  });
}

function updateHighlightsFromInput(userText) {
  const sampleSpans = document.querySelectorAll("#sample-text .sample-word");
  if (!sampleSpans || sampleSpans.length === 0) return;
  const raw = String(userText || '');
  const endedWithSpace = /\s$/.test(raw);
  const userWords = raw.trim().split(/\s+/).filter(Boolean);

  sampleSpans.forEach((span, idx) => {
    const userWord = userWords[idx];
    const sampleWord = _currentSampleWords[idx] || "";
    span.classList.remove("correct", "incorrect", "pending");

    // user hasn't reached this word yet
    if (userWord === undefined) {
      span.classList.add("pending");
      return;
    }

    const isLastTyped = idx === userWords.length - 1;

    // If this is the last word currently being typed and the user hasn't
    // finished it (no trailing space), treat it as 'in-progress'. Only mark
    // incorrect when the typed characters do not match the beginning of the
    // sample word (i.e., a mistyped character). If the prefix matches,
    // keep it pending until the user completes the word (presses space).
    if (isLastTyped && !endedWithSpace) {
      if (sampleWord.startsWith(userWord)) {
        span.classList.add("pending");
      } else {
        span.classList.add("incorrect");
      }
      return;
    }

    // For completed words (user typed a space after them), require exact match
    // to mark correct; otherwise mark incorrect.
    if (userWord === sampleWord) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
    }
  });
}

function initRealtimeHighlighting() {
  const textarea = document.querySelector("textarea");
  if (!textarea) return;
  textarea.addEventListener("input", (e) => {
    updateHighlightsFromInput(e.target.value || "");
  });
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
  const el = document.getElementById("result-time");
  if (!el) return;
  el.textContent = formatSeconds(seconds);
}

function setResultLevel(level) {
  const el = document.getElementById("result-level");
  if (!el) return;
  el.textContent =
    String(level).charAt(0).toUpperCase() + String(level).slice(1);
}

// new helper: count correctly typed words (position-by-position)
function calculateCorrectWords(userText, sampleText) {
  if (!sampleText) return 0;
  const sampleWords = sampleText.trim().split(/\s+/).filter(Boolean);
  const userWords = String(userText).trim().split(/\s+/).filter(Boolean);
  let correct = 0;
  const len = Math.min(sampleWords.length, userWords.length);
  for (let i = 0; i < len; i++) {
    if (userWords[i] === sampleWords[i]) correct++;
  }
  return correct;
}

function setResultWpm(wpm) {
  const el = document.getElementById("result-wpm");
  if (!el) return;
  el.textContent = String(Math.max(0, Math.round(wpm)));
}

function handleStartClick() {
  if (_running) return; // already running
  const startBtn = document.getElementById("start-button");
  const stopBtn = document.getElementById("stop-button");
  if (!startBtn || !stopBtn) return;

  _startTimeMs = performance.now();
  _running = true;

  // UI state: disable start, enable stop
  startBtn.disabled = true;
  stopBtn.disabled = false;

  // reset displayed time while running
  setResultTime(0);
  // reset WPM display while running
  setResultWpm(0);
}

function handleStopClick() {
  if (!_running || _startTimeMs == null) return;
  const startBtn = document.getElementById("start-button");
  const stopBtn = document.getElementById("stop-button");
  if (!startBtn || !stopBtn) return;

  const elapsedMs = performance.now() - _startTimeMs;
  const seconds = elapsedMs / 1000;

  // display result rounded to two decimals
  setResultTime(seconds);

  // compute correctly typed words vs sample text
  const textarea = document.querySelector("textarea");
  const sampleEl = document.getElementById("sample-text");
  const sampleText = sampleEl ? sampleEl.textContent || "" : "";
  const userText = textarea ? textarea.value : "";

  const correctWords = calculateCorrectWords(userText, sampleText);

  // compute WPM = correctWords per minute
  const wpm = seconds > 0 ? (correctWords * 60) / seconds : 0;
  setResultWpm(wpm);

  // display current difficulty level in results
  const select = document.getElementById("difficulty-select");
  setResultLevel(select ? select.value || "easy" : "easy");

  // UI state: enable start, disable stop
  startBtn.disabled = false;
  stopBtn.disabled = true;

  _running = false;
  _startTimeMs = null;
}

function handleRetryClick() {
  // Reset state so user can start again
  const startBtn = document.getElementById("start-button");
  const stopBtn = document.getElementById("stop-button");
  const textarea = document.querySelector("textarea");
  if (textarea) textarea.value = "";
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
  _running = false;
  _startTimeMs = null;
  setResultTime(0);
  // reset WPM display if present
  const wpmEl = document.getElementById("result-wpm");
  if (wpmEl) wpmEl.textContent = "0";
}

function initTimerControls() {
  const startBtn = document.getElementById("start-button");
  const stopBtn = document.getElementById("stop-button");
  const retryBtn = document.getElementById("retry-button");
  const select = document.getElementById("difficulty-select");

  if (startBtn) startBtn.addEventListener("click", handleStartClick);
  if (stopBtn) stopBtn.addEventListener("click", handleStopClick);
  if (retryBtn) retryBtn.addEventListener("click", handleRetryClick);

  // Ensure initial button states
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;

  // When difficulty changes, update the result level label too
  if (select) {
    select.addEventListener("change", () =>
      setResultLevel(select.value || "easy")
    );
    // set initial level
    setResultLevel(select.value || "easy");
  }
}

function initApp() {
  initSampleSelector();
  initTimerControls();
  initRealtimeHighlighting();
}

document.addEventListener("DOMContentLoaded", initApp);
