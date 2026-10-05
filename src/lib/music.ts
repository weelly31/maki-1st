// Gentle, worship-inspired instrumental generated live with the Web Audio API,
// so no audio file is needed. Playback only starts from a user gesture.

const CHORDS = [
  [261.63, 329.63, 392.0], // C
  [196.0, 246.94, 293.66], // G
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
];
const ARP = [0, 1, 2, 1, 2, 1, 0, 1];
const STEP = 0.55;

export function createMusic() {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;
  let nextTime = 0;
  let step = 0;

  function tone(
    freq: number,
    t: number,
    dur: number,
    type: OscillatorType,
    peak: number,
  ) {
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + Math.min(0.08, dur / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function schedule() {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 0.8) {
      const chord = CHORDS[Math.floor(step / 8) % CHORDS.length];
      if (step % 8 === 0) {
        chord.forEach((f) => tone(f / 2, nextTime, STEP * 8, "sine", 0.05));
      }
      tone(chord[ARP[step % 8]] * 2, nextTime, 1.6, "triangle", 0.07);
      if (step % 4 === 2) tone(chord[2] * 4, nextTime, 1.2, "sine", 0.025);
      nextTime += STEP;
      step++;
    }
  }

  return {
    async start() {
      if (!ctx) {
        ctx = new AudioContext();
        master = ctx.createGain();
        master.gain.value = 0;
        const delay = ctx.createDelay(1);
        delay.delayTime.value = STEP * 0.75;
        const feedback = ctx.createGain();
        feedback.gain.value = 0.35;
        delay.connect(feedback).connect(delay);
        master.connect(ctx.destination);
        master.connect(delay);
        delay.connect(ctx.destination);
      }
      await ctx.resume();
      master!.gain.cancelScheduledValues(ctx.currentTime);
      master!.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 1.5);
      nextTime = ctx.currentTime + 0.1;
      schedule();
      timer = setInterval(schedule, 200);
    },
    stop() {
      if (!ctx || !master) return;
      if (timer) clearInterval(timer);
      timer = null;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      const c = ctx;
      setTimeout(() => {
        if (!timer) c.suspend();
      }, 800);
    },
  };
}

/** Plays a user-supplied audio file (looped) with the same start/stop API as the built-in music. */
export function createFileMusic(src: string) {
  let audio: HTMLAudioElement | null = null;
  return {
    async start() {
      audio ??= Object.assign(new Audio(src), { loop: true, volume: 0.7 });
      await audio.play();
    },
    stop() {
      audio?.pause();
    },
  };
}
