"use client";

import { useState, useRef, useEffect } from "react";
import { useUpload } from "@/hooks/uploads/useUpload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoiceNoteRecorderProps {
  onRecorded: (url: string, durationSecs: number) => void;
  onCancel: () => void;
}

type RecordState = "idle" | "recording" | "uploading";

export function VoiceNoteRecorder({ onRecorded, onCancel }: VoiceNoteRecorderProps) {
  const [state, setState] = useState<RecordState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [waveFrames, setWaveFrames] = useState<number[]>([4, 4, 4, 4, 4]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { uploadVoiceNote, isUploading, progress } = useUpload();

  useEffect(() => {
    // Auto-start recording on mount
    startRecording();
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = handleStop;
      mr.start(250);
      setState("recording");

      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
      waveTimerRef.current = setInterval(() => {
        setWaveFrames([...Array(5)].map(() => Math.random() * 20 + 4));
      }, 120);
    } catch {
      toast.error("Microphone access denied");
      onCancel();
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    cleanup();
    setState("uploading");
  }

  async function handleStop() {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const file = new File([blob], `voice-note-${Date.now()}.webm`, { type: "audio/webm" });
    const duration = elapsed;
    const result = await uploadVoiceNote(file);
    if (result?.url) {
      onRecorded(result.url, duration);
    } else {
      toast.error("Failed to upload voice note");
      setState("idle");
    }
  }

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (waveTimerRef.current) clearInterval(waveTimerRef.current);
  }

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  if (state === "uploading" || isUploading) {
    return (
      <div className="flex items-center gap-3 bg-primary/5 dark:bg-primary/10 rounded-2xl px-4 py-3">
        <span className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Uploading voice note...
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-1">
            <div
              className="bg-primary h-1 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-slate-400">{progress}%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3">
      {/* Pulsing dot */}
      <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shrink-0" />

      {/* Waveform */}
      <div className="flex items-center gap-0.5 h-6 flex-1">
        {waveFrames.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-red-400 dark:bg-red-500 transition-all duration-100"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {/* Timer */}
      <span className="text-sm font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
        {formatTime(elapsed)}
      </span>

      {/* Stop */}
      <button
        type="button"
        onClick={stopRecording}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
          "bg-red-500 hover:bg-red-600 text-white"
        )}
        title="Stop recording"
      >
        <span className="material-symbols-outlined text-base">stop</span>
      </button>

      {/* Cancel */}
      <button
        type="button"
        onClick={() => { cleanup(); onCancel(); }}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        title="Cancel"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
}
