
// Singleton to manage the AudioContext
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (!audioCtx) {
    // Support standard and older webkit browsers
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  return audioCtx;
};

export const playSuccessSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  // Resume context if suspended (browser policy requirement)
  if (ctx.state === 'suspended') {
    ctx.resume().catch(console.error);
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Sound Design: A pleasant ascending "ding"
  oscillator.type = 'sine';
  // Start at C5 (523.25 Hz) and slide quickly up to A5 (880 Hz)
  oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

  // Envelope: Short attack, smooth decay
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.6);
};

export const playErrorSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(console.error);
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Sound Design: A low, short "buzz" or "thud"
  oscillator.type = 'sawtooth';
  // Start low (150Hz) and drop slightly
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.25);

  // Envelope: Quick decay
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
  gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.25);
};
