'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VoiceNotePlayerProps {
  voiceNoteUrl: string;
  durationSecs: number;
  isOwn?: boolean;
}

export default function VoiceNotePlayer({ voiceNoteUrl, durationSecs, isOwn = false }: VoiceNotePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentSecs, setCurrentSecs] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleEnded() {
      setPlaying(false);
      setCurrentSecs(0);
    }

    function handleTimeUpdate() {
      setCurrentSecs(Math.floor(audio!.currentTime));
    }

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => null);
      setPlaying(true);
    }
  }

  const displaySecs = playing ? currentSecs : durationSecs;
  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const bars = Array.from({ length: 24 }, (_, i) => {
    const heights = [3, 6, 10, 14, 18, 14, 20, 12, 8, 16, 22, 18, 10, 14, 20, 16, 12, 8, 14, 18, 10, 6, 12, 4];
    return heights[i] || 8;
  });

  const playedBars = playing ? Math.floor((currentSecs / Math.max(durationSecs, 1)) * bars.length) : 0;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-2xl max-w-[220px]',
        isOwn ? 'bg-white/20' : 'bg-neutral-sage'
      )}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={voiceNoteUrl} preload="metadata" />

      <button
        onClick={togglePlay}
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
          isOwn ? 'bg-white/30 hover:bg-white/40' : 'bg-primary hover:bg-primary/90'
        )}
      >
        <span className="material-symbols-outlined text-[18px] text-white">
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </button>

      <div className="flex items-end gap-[2px] h-7 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className={cn(
              'w-[2px] rounded-full transition-all',
              i < playedBars
                ? (isOwn ? 'bg-white' : 'bg-primary')
                : (isOwn ? 'bg-white/60' : 'bg-primary/40')
            )}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      <span className={cn('text-xs font-medium flex-shrink-0', isOwn ? 'text-white/80' : 'text-text-muted')}>
        {formatDuration(displaySecs)}
      </span>
    </div>
  );
}
