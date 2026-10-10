'use client';

class VoiceAnnouncerService {
  public isEnabled: boolean = true;
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private lastSpokenText: string = '';
  private lastSpokenTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer clean English voice
    this.selectedVoice = 
      voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha'))) ||
      voices.find(v => v.lang.includes('en')) ||
      voices[0] ||
      null;
  }

  public toggleVoice(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.speak('AI Voice Announcer enabled.');
    } else {
      if (this.synth) this.synth.cancel();
    }
    return this.isEnabled;
  }

  public speak(text: string, priority: boolean = false) {
    if (!this.isEnabled || typeof window === 'undefined' || !this.synth) return;

    // Avoid repetitive spam within 4 seconds unless priority
    const now = Date.now();
    if (!priority && text === this.lastSpokenText && now - this.lastSpokenTime < 4000) {
      return;
    }

    try {
      if (priority) {
        this.synth.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.rate = 1.12; // Crisp, fast pace
      utterance.pitch = 1.05; // High-tech clarity
      utterance.volume = 0.9;

      this.lastSpokenText = text;
      this.lastSpokenTime = now;

      this.synth.speak(utterance);
    } catch {}
  }
}

export const voiceAnnouncer = new VoiceAnnouncerService();

export function announceThreat(threatType: string, ip: string, riskScore: number) {
  if (riskScore >= 80) {
    voiceAnnouncer.speak(`Critical alert: ${threatType} detected from IP ${ip}. Composite risk ${riskScore}. Deploying containment.`, true);
  } else if (riskScore >= 60) {
    voiceAnnouncer.speak(`High risk threat: ${threatType} from IP ${ip}. Monitored by adaptive firewall.`);
  }
}

export function announceMitigation(action: string, ip: string) {
  voiceAnnouncer.speak(`Automated action: Firewall ${action} policy applied to IP ${ip}.`);
}
