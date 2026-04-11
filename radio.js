/*
 * Uttarakhand Radio — player engine (live-radio mode)
 *
 * The user has two controls: Play/Pause and Volume. Everything else
 * happens automatically so it feels like a real FM station:
 *
 *   1. The station picks a random track.
 *   2. It jumps into that track at a random mid-point (not the start).
 *   3. When the track ends, it rolls straight into the next one,
 *      again at a random point.
 *   4. The track title is shown as a "now playing" card, just like a
 *      real FM radio display.
 *
 * There is no previous, no next, no shuffle, no progress bar, no
 * visible playlist — the listener is just tuning in.
 */
(function () {
  const ARCHIVE_BASE = "https://archive.org/download";

  // Only jump into a track between these fractions of its total length,
  // so we never land right at the beginning or the tail.
  const MIN_START_FRACTION = 0.08;
  const MAX_START_FRACTION = 0.55;

  const audio       = document.getElementById("audio");
  const disc        = document.getElementById("disc");
  const trackTitle  = document.getElementById("trackTitle");
  const trackArtist = document.getElementById("trackArtist");
  const btnPlay     = document.getElementById("btnPlay");
  const iconPlay    = document.getElementById("iconPlay");
  const iconPause   = document.getElementById("iconPause");
  const volume      = document.getElementById("volume");
  const kickerLabel = document.getElementById("kickerLabel");
  const aboutLink   = document.getElementById("aboutLink");
  const aboutDlg    = document.getElementById("aboutDlg");

  const playlist = (window.PLAYLIST || []).slice();
  let queue      = [];   // rotating shuffled order of playlist indices
  let cursor     = 0;    // position inside `queue`
  let startedOnce = false;

  // ---------- helpers ----------
  function urlFor(track) {
    return `${ARCHIVE_BASE}/${track.identifier}/${encodeURIComponent(track.file)}`;
  }

  function shuffledIndices() {
    const a = playlist.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function refillQueue() {
    queue = shuffledIndices();
    cursor = 0;
  }

  function pickNextIndex() {
    if (cursor >= queue.length) refillQueue();
    const idx = queue[cursor];
    cursor += 1;
    return idx;
  }

  function randomMidpoint(duration) {
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    const frac = MIN_START_FRACTION +
                 Math.random() * (MAX_START_FRACTION - MIN_START_FRACTION);
    return Math.max(0, duration * frac);
  }

  // ---------- playback ----------
  function loadTrack(index) {
    const track = playlist[index];
    audio.src = urlFor(track);
    trackTitle.textContent = track.title;
    trackArtist.textContent = `${track.artist} · ${track.language}`;
    kickerLabel.textContent = "Now Playing";
  }

  function tuneIn() {
    const idx = pickNextIndex();
    loadTrack(idx);

    // Seek to a random mid-point as soon as we know the duration,
    // then start playing. One-shot listener so we don't re-seek mid-song.
    const onMeta = () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      try { audio.currentTime = randomMidpoint(audio.duration); } catch (_) {}
      audio.play().catch(err => {
        setPlayingUI(false);
        console.warn("Playback blocked:", err);
      });
    };
    audio.addEventListener("loadedmetadata", onMeta);
    // Force the browser to actually fetch metadata now.
    audio.load();
  }

  function setPlayingUI(isPlaying) {
    if (isPlaying) {
      iconPlay.style.display  = "none";
      iconPause.style.display = "block";
      disc.classList.add("playing");
    } else {
      iconPlay.style.display  = "block";
      iconPause.style.display = "none";
      disc.classList.remove("playing");
    }
  }

  // ---------- events ----------
  btnPlay.addEventListener("click", () => {
    if (!startedOnce) {
      startedOnce = true;
      tuneIn();
      return;
    }
    if (audio.paused) {
      // If the source ended or was reset, tune into a new track;
      // otherwise just resume the one that was paused.
      if (audio.ended || !audio.src) {
        tuneIn();
      } else {
        audio.play().catch(() => {});
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play",  () => setPlayingUI(true));
  audio.addEventListener("pause", () => setPlayingUI(false));
  audio.addEventListener("ended", () => {
    // Auto-advance into the next track (also at a random mid-point).
    tuneIn();
  });
  audio.addEventListener("error", () => {
    // If a track fails to load, silently roll into the next one.
    console.warn("Audio error — rolling to next track");
    trackTitle.textContent = "Tuning…";
    trackArtist.textContent = " ";
    setTimeout(tuneIn, 800);
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });
  audio.volume = Number(volume.value);

  // Keyboard: Space toggles play/pause (standard radio shortcut).
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input,textarea,[contenteditable]")) return;
    if (e.code === "Space") { e.preventDefault(); btnPlay.click(); }
  });

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof aboutDlg.showModal === "function") aboutDlg.showModal();
  });

  // ---------- boot ----------
  refillQueue();
})();
