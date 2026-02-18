import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kamiconda.css';

const Kamiconda = () => {
  const navigate = useNavigate();

  const speedMultiplier = 1.5;
  const pauseMs = 140;
  const charMsBase = 18;
  const startDelayMs = 1000

  const lines = useMemo(
    () => [
      'KAMICONDA OS',
      'Copyright (c) 2001. All Rights Reserved',
      'BIOS Version: 20010204 Release 1',
      '---',
      'Battery Pack: 98% OK',
      'Memory Test: 16384K OK',
      'Initializing USB Controllers ... Done',
      'Mounting /dev/goat ... Ready',
      'Entropy Seeding ... 2048 bits',
      'Bootloader: KAMICONDA-2001',
      '---',
      'KAMICONDA 2001 re-lives an epoch in which a goat was was born into this universe',
      '<STATUS> Press any button to continue ...',
    ],
    []
  );

  const [booted, setBooted] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // ---- Audio (end-of-line beep) ----
  const audioCtxRef = useRef(null);

  const unlockAudio = async () => {
    if (audioCtxRef.current) return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    try {
      await ctx.resume();
    } catch {
      // ignore
    }
  };

  // softer “BIOS-style” beep at end of each line
  const playLineBeep = (kind = 'ok') => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== 'running') return;

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = 'sine'; // gentle. (square is harsher)
    o.frequency.value = kind === 'status' ? 520 : 740;

    o.connect(g);
    g.connect(ctx.destination);

    const now = ctx.currentTime;

    // short + quiet envelope
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.03, now + 0.004);
    g.gain.linearRampToValueAtTime(0.0001, now + 0.055);

    o.start(now);
    o.stop(now + 0.06);
  };

  const startBoot = async () => {
    await unlockAudio(); // required by browser autoplay policies
    setBooted(true);
  };

  // ---- Sequential “active line” progression (cursor + end-of-line beep) ----
  useEffect(() => {
    if (!booted) return;

    const charMs = charMsBase * speedMultiplier;

    let cancelled = false;
    let t = startDelayMs;
    const timers = [];

    for (let i = 0; i < lines.length; i++) {
      const isSep = lines[i] === '---';
      const text = isSep ? '' : lines[i];
      const durationMs = Math.max(1000, text.length * charMs);

      // start this line (cursor moves here)
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setActiveIdx(i);
        }, t)
      );

      // beep near the END of this line (skip separators)
      if (!isSep && text.length > 0) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            const kind = text.startsWith('<STATUS>') ? 'status' : 'ok';
            playLineBeep(kind);
          }, t + durationMs - 20)
        );
      }

      t += durationMs + pauseMs;
    }

    const doneTimer = setTimeout(() => {
      if (cancelled) return;
      setReady(true);
    }, t + 100);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [booted, lines, speedMultiplier]);

  // navigation after ready
  useEffect(() => {
    if (!ready) return;
    const goHome = () => navigate('/home');
    window.addEventListener('click', goHome);
    window.addEventListener('keydown', goHome);
    return () => {
      window.removeEventListener('click', goHome);
      window.removeEventListener('keydown', goHome);
    };
  }, [navigate, ready]);

  // render with cumulative delays (for CSS typing width animation)
  let accumulatedDelay = booted ? startDelayMs : 0;
  const charMs = charMsBase * speedMultiplier;

  return (
    <div className={`kamiconda-screen ${booted ? 'is-booted' : 'is-locked'}`}>
      <div className="kamiconda-crt">
        <div className="kamiconda-scanlines" aria-hidden="true" />
        <div className="kamiconda-content">
          {!booted && (
            <div className="kamiconda-boot" onClick={startBoot} role="button" tabIndex={0}>
              <div className="kamiconda-boot-inner">CLICK TO BOOT</div>
            </div>
          )}

          {lines.map((line, idx) => {
            const isSep = line === '---';
            const text = isSep ? '' : line;

            const durationMs = Math.max(350, text.length * charMs);
            const steps = Math.min(Math.max(text.length, 12), 160);

            // IMPORTANT: width in ch should roughly match chars.
            // (you previously had text.length * 2 which causes big weirdness)
            const w = Math.max(text.length * 2 + 1, 1);

            const style = booted
              ? {
                  '--delay': `${accumulatedDelay / 1000}s`,
                  '--dur': `${durationMs / 1000}s`,
                  '--steps': steps,
                  '--w': `${w}ch`,
                }
              : {
                  '--delay': `9999s`, // freeze reveals until boot
                  '--dur': `1s`,
                  '--steps': steps,
                  '--w': `${w}ch`,
                };

            if (booted) accumulatedDelay += durationMs + pauseMs;

            const showCursor = booted && !ready && !isSep && idx === activeIdx;
            const showFinalCursor = ready && idx === lines.length - 1;

            return (
              <div
                key={idx}
                className={`kamiconda-text type-line ${isSep ? 'kamiconda-sep' : ''}`}
                style={style}
              >
                <span className="kamiconda-type">{text}</span>
                {(showCursor || showFinalCursor) && <span className="kamiconda-cursor">█</span>}
              </div>
            );
          })}
        </div>

        {booted && !ready && <div className="kamiconda-blocker" />}
      </div>
    </div>
  );
};

export default Kamiconda;
