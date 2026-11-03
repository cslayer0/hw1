import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Plus,
  Check,
  Coffee,
  Footprints,
  Moon,
  Sun,
  Cloud,
  Heart,
  Sliders,
  ListChecks,
  Timer,
  Compass,
  Volume2,
  VolumeX,
  CloudRain,
  Wind,
  ChevronRight,
  RotateCcw,
  FastForward,
  Clock,
  Calendar,
  BatteryCharging,
  Wifi,
  Signal,
  Info,
  X
} from 'lucide-react';

// ==========================================
// INITIAL MIND-FRIENDLY TASK QUEUE
// ==========================================
const INITIAL_TASKS = [
  {
    id: 't1',
    title: 'Derive Convergence Proof for CS-402',
    effortType: 'Deep Flow',
    emoji: '🔮',
    durationMins: 45,
    idealClarity: 90,
    bestTrait: 'analytical',
    optimalWindow: '9:00 AM – 11:30 AM',
    completed: false
  },
  {
    id: 't2',
    title: 'Debug Gradient Boosting Feature Pipeline',
    effortType: 'Deep Flow',
    emoji: '🧩',
    durationMins: 50,
    idealClarity: 86,
    bestTrait: 'analytical',
    optimalWindow: '9:30 AM – 12:00 PM',
    completed: false
  },
  {
    id: 't3',
    title: 'Sketch App Wireframes & User Journey',
    effortType: 'Steady Rhythm',
    emoji: '🌿',
    durationMins: 35,
    idealClarity: 74,
    bestTrait: 'creative',
    optimalWindow: '5:00 PM – 7:30 PM',
    completed: false
  },
  {
    id: 't4',
    title: 'Summarize 3 Psychology Research Papers',
    effortType: 'Steady Rhythm',
    emoji: '📖',
    durationMins: 30,
    idealClarity: 70,
    bestTrait: 'creative',
    optimalWindow: '4:30 PM – 7:00 PM',
    completed: false
  },
  {
    id: 't5',
    title: 'Reply to Lab Group & Confirm Meeting',
    effortType: 'Light & Cozy',
    emoji: '🍵',
    durationMins: 15,
    idealClarity: 38,
    bestTrait: 'gentle',
    optimalWindow: '2:00 PM – 4:00 PM',
    completed: false
  },
  {
    id: 't6',
    title: 'Tidy Dataset Labels & Export CSVs',
    effortType: 'Light & Cozy',
    emoji: '🧺',
    durationMins: 20,
    idealClarity: 42,
    bestTrait: 'gentle',
    optimalWindow: '1:30 PM – 3:30 PM',
    completed: false
  },
  {
    id: 't7',
    title: 'Organize Notion Reading List & Tags',
    effortType: 'Light & Cozy',
    emoji: '✨',
    durationMins: 15,
    idealClarity: 30,
    bestTrait: 'gentle',
    optimalWindow: '8:30 PM – 10:30 PM',
    completed: false
  }
];

// Friendly Time-of-Day Presets
const TIME_PRESETS = [
  {
    id: 'morning',
    label: 'Morning Peak',
    timeLabel: '9:30 AM',
    hour: 9.5,
    icon: '☀️'
  },
  {
    id: 'midday',
    label: 'Midday Dip',
    timeLabel: '2:30 PM',
    hour: 14.5,
    icon: '☁️'
  },
  {
    id: 'evening',
    label: 'Evening Flow',
    timeLabel: '6:00 PM',
    hour: 18.0,
    icon: '🌿'
  },
  {
    id: 'winddown',
    label: 'Wind Down',
    timeLabel: '9:30 PM',
    hour: 21.5,
    icon: '🌙'
  }
];

// Effort Tag Visual Styling (Psychology & Wellness Palette)
const EFFORT_STYLES = {
  'Deep Flow': {
    badgeBg: '#F1EEFC',
    badgeText: '#6956C6',
    border: '#DCD4F7',
    accent: '#8474D4',
    desc: 'High clarity & analytical depth'
  },
  'Steady Rhythm': {
    badgeBg: '#EBF5F0',
    badgeText: '#497D63',
    border: '#CBE5D8',
    accent: '#689F84',
    desc: 'Creative synthesis & associative flow'
  },
  'Light & Cozy': {
    badgeBg: '#FDF0EC',
    badgeText: '#C8684D',
    border: '#F7D6CC',
    accent: '#E68A70',
    desc: 'Low-friction, gentle brain load'
  }
};

// Format decimal hour (e.g. 14.5 -> "2:30 PM")
function formatFriendlyTime(decimalHour) {
  const hrs24 = Math.floor(decimalHour);
  const mins = Math.round((decimalHour - hrs24) * 60);
  const period = hrs24 >= 12 ? 'PM' : 'AM';
  const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
  const mStr = String(mins === 60 ? 0 : mins).padStart(2, '0');
  return `${hrs12}:${mStr} ${period}`;
}

// Cute Custom SVG Expressive Mood Orb Character
function MindfulOrbCharacter({ moodType, accentColor, softColor }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      {/* Soft ambient aura ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500 animate-pulse"
        style={{
          backgroundColor: softColor,
          transform: 'scale(1.18)'
        }}
      />
      <svg viewBox="0 0 80 80" className="w-16 h-16 relative z-10 overflow-visible">
        <defs>
          <radialGradient id={`orbGrad-${moodType}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="45%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Main soft organic circle */}
        <circle
          cx="40"
          cy="40"
          r="31"
          fill={`url(#orbGrad-${moodType})`}
          className="transition-all duration-500"
        />

        {/* Subtle highlight */}
        <ellipse
          cx="29"
          cy="26"
          rx="8"
          ry="4.5"
          transform="rotate(-25 29 26)"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* Rosy cheeks */}
        <circle cx="25" cy="44" r="4" fill="#FFFFFF" opacity="0.35" />
        <circle cx="55" cy="44" r="4" fill="#FFFFFF" opacity="0.35" />

        {/* Expressive Eyes & Mouth based on Cognitive State */}
        {moodType === 'peak' && (
          <g stroke="#2D2A26" strokeWidth="2.6" strokeLinecap="round" fill="none">
            {/* Happy bright eyes */}
            <circle cx="29" cy="38" r="2.3" fill="#2D2A26" stroke="none" />
            <circle cx="51" cy="38" r="2.3" fill="#2D2A26" stroke="none" />
            {/* Joyful smile */}
            <path d="M 33 45 Q 40 51 47 45" />
            {/* Little sparkle above */}
            <path
              d="M 64 16 L 64 24 M 60 20 L 68 20"
              stroke="#E5B24C"
              strokeWidth="2.2"
            />
          </g>
        )}

        {moodType === 'steady' && (
          <g stroke="#2D2A26" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {/* Serene curved eyes */}
            <path d="M 25 38 Q 29 34 33 38" />
            <path d="M 47 38 Q 51 34 55 38" />
            {/* Content gentle smile */}
            <path d="M 34 46 Q 40 50 46 46" />
          </g>
        )}

        {moodType === 'dip' && (
          <g stroke="#2D2A26" strokeWidth="2.4" strokeLinecap="round" fill="none">
            {/* Sleepy relaxed eyes */}
            <path d="M 25 39 Q 29 42 33 39" />
            <path d="M 47 39 Q 51 42 55 39" />
            {/* Tiny cozy mouth */}
            <path d="M 37 47 Q 40 49 43 47" />
          </g>
        )}

        {moodType === 'rest' && (
          <g stroke="#2D2A26" strokeWidth="2.3" strokeLinecap="round" fill="none">
            {/* Closed resting eyes */}
            <path d="M 25 39 Q 29 42 33 39" />
            <path d="M 47 39 Q 51 42 55 39" />
            {/* Peaceful 'o' breath mouth */}
            <circle cx="40" cy="47" r="2" fill="#2D2A26" stroke="none" />
            <text
              x="58"
              y="22"
              fill="#7A736B"
              fontSize="10"
              fontWeight="bold"
              stroke="none"
            >
              zZ
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

// Smooth SVG Catmull-Rom / Cubic Bezier path generator for the energy wave
function buildSmoothSvgPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function App() {
  // Navigation & Helper State
  const [activeTab, setActiveTab] = useState('rhythm'); // 'rhythm' | 'queue' | 'tune' | 'focus'
  const [toast, setToast] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Interactive Time Scrubber (6.0 = 6:00 AM to 23.0 = 11:00 PM)
  const [currentHour, setCurrentHour] = useState(9.5);

  // Predictive Model Inputs (Tune Tab + Home Quick Boosts)
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState('Restorative'); // 'Restless' | 'Okay' | 'Restorative'
  const [dayLoad, setDayLoad] = useState('Moderate'); // 'Light Day' | 'Moderate' | 'Back-to-Back'
  const [boostMatcha, setBoostMatcha] = useState(false);
  const [boostWalk, setBoostWalk] = useState(false);
  const [boostNap, setBoostNap] = useState(false);

  // Queue & Auto-Tagger State
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [effortFilter, setEffortFilter] = useState('All'); // 'All' | 'Deep Flow' | 'Steady Rhythm' | 'Light & Cozy'
  const [newTaskInput, setNewTaskInput] = useState('');
  const [draftTaskPreview, setDraftTaskPreview] = useState(null);

  // Mindful Sprint & Calibration State
  const [activeTaskId, setActiveTaskId] = useState('t1');
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSecs, setElapsedSecs] = useState(480); // 8 mins in for immediate visual preview
  const [ambientSound, setAmbientSound] = useState('Rain'); // 'Rain' | 'Brown Noise' | 'Quiet'
  const [showReflectionSheet, setShowReflectionSheet] = useState(false);
  const [learnedSessions, setLearnedSessions] = useState(24);
  const [personalFitScore, setPersonalFitScore] = useState(94);

  // Trigger gentle toast message
  const notify = (msg) => {
    setToast(msg);
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Sprint timer tick
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsedSecs((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // =========================================================
  // 1. PREDICTIVE COGNITIVE RHYTHM MODEL (6:00 AM – 11:00 PM)
  // =========================================================
  const predictAtHour = useMemo(() => {
    return (h) => {
      // Natural two-process circadian wave:
      // Morning peak (~9:30 AM), Midday dip (~2:30 PM), Evening second-wind (~6:00 PM), Wind-down (~9:30 PM)
      const morningPeak = 33 * Math.exp(-Math.pow((h - 9.5) / 2.5, 2));
      const middayDip = -24 * Math.exp(-Math.pow((h - 14.5) / 1.9, 2));
      const eveningFlow = 21 * Math.exp(-Math.pow((h - 18.0) / 2.4, 2));
      const nightWindDown = -38 / (1 + Math.exp(-(h - 20.6) * 1.25));

      let base = 62 + morningPeak + middayDip + eveningFlow + nightWindDown;

      // Sleep duration & quality influence
      const sleepDelta = (sleepHours - 7.5) * 6.2;
      const qualityDelta =
        sleepQuality === 'Restorative' ? 4 : sleepQuality === 'Okay' ? 0 : -8;

      // Schedule load influence (accumulates gently across the afternoon)
      const loadDelta =
        dayLoad === 'Light Day' ? 4 : dayLoad === 'Moderate' ? 0 : -9;
      const afternoonDrain =
        dayLoad === 'Back-to-Back' ? Math.max(0, (h - 11) * -0.8) : 0;

      // Gentle Micro-Boosts
      const matchaLift = boostMatcha
        ? 11 * Math.exp(-Math.pow((h - 14.2) / 2.3, 2))
        : 0;
      const walkLift = boostWalk
        ? 9 * Math.exp(-Math.pow((h - 15.2) / 3.2, 2))
        : 0;
      const napLift =
        boostNap && h >= 14.0
          ? 11 * Math.exp(-Math.pow((h - 17.5) / 4.2, 2))
          : 0;

      const rawClarity =
        base +
        sleepDelta +
        qualityDelta +
        loadDelta +
        afternoonDrain +
        matchaLift +
        walkLift +
        napLift;

      const clarity = Math.round(Math.max(16, Math.min(98, rawClarity)));

      return {
        hour: h,
        clarity
      };
    };
  }, [sleepHours, sleepQuality, dayLoad, boostMatcha, boostWalk, boostNap]);

  // Generate smooth wave points from 6.0 to 23.0
  const waveData = useMemo(() => {
    const pts = [];
    for (let h = 6.0; h <= 23.0; h += 0.5) {
      pts.push(predictAtHour(h));
    }
    return pts;
  }, [predictAtHour]);

  const currentPrediction = useMemo(
    () => predictAtHour(currentHour),
    [predictAtHour, currentHour]
  );

  // Psychological Aura State based on current predicted clarity & time
  const brainAura = useMemo(() => {
    const c = currentPrediction.clarity;
    if (c >= 78) {
      return {
        moodType: 'peak',
        title: 'Bright & Sharp',
        subtitle: 'Deep Flow Window',
        accent: '#8474D4', // Soft Lavender
        softBg: '#F1EEFC',
        border: '#DFD8F8',
        pillText: '#5E4BB5',
        summary:
          'Your analytical clarity is peaking—ideal for complex proofs, coding, or deep problem solving.'
      };
    }
    if (c >= 58) {
      return {
        moodType: 'steady',
        title: 'Creative Glow',
        subtitle: 'Steady Rhythm',
        accent: '#689F84', // Matcha Sage
        softBg: '#EBF5F0',
        border: '#CDE4D8',
        pillText: '#3E6E57',
        summary:
          'Your mind is in an associative, balanced state—wonderful for writing, synthesis, and design.'
      };
    }
    if (c >= 38) {
      return {
        moodType: 'dip',
        title: 'Afternoon Cloud',
        subtitle: 'Gentle Recharge Zone',
        accent: '#E68A70', // Warm Peach
        softBg: '#FDF0EC',
        border: '#F5D5CB',
        pillText: '#B8563B',
        summary:
          'Natural circadian dip. Be kind to your brain—switch to cozy, low-friction tasks or take a sunlight walk.'
      };
    }
    return {
      moodType: 'rest',
      title: 'Cozy Wind-Down',
      subtitle: 'Rest & Light Prep',
      accent: '#E5B24C', // Honey Butter
      softBg: '#FDF6E4',
      border: '#F3E2B8',
      pillText: '#9C711B',
      summary:
        'Mental bandwidth is winding down for sleep. Wrap up with 10-minute tidy tasks or unplug.'
    };
  }, [currentPrediction.clarity]);

  // Forecast insights for the Tune tab
  const forecastSummary = useMemo(() => {
    let bestPt = waveData[0];
    let dipPt = waveData[0];
    for (const pt of waveData) {
      if (pt.clarity > bestPt.clarity) bestPt = pt;
      if (pt.hour >= 12 && pt.hour <= 17 && pt.clarity < dipPt.clarity) {
        dipPt = pt;
      }
    }
    return {
      peakWindow: `${formatFriendlyTime(Math.max(6, bestPt.hour - 1))} – ${formatFriendlyTime(
        Math.min(22, bestPt.hour + 1.5)
      )}`,
      peakClarity: bestPt.clarity,
      rechargeWindow: `${formatFriendlyTime(dipPt.hour)} (${dipPt.clarity}% Clarity)`
    };
  }, [waveData]);

  // =========================================================
  // 2. RECOMMENDER SYSTEM (MIND-MATCH TASK ROUTER)
  // =========================================================
  const recommendedTasks = useMemo(() => {
    const c = currentPrediction.clarity;
    const uncompleted = tasks.filter((t) => !t.completed);

    const scored = uncompleted.map((task) => {
      // Distance between current clarity and task's ideal clarity
      const diff = Math.abs(c - task.idealClarity);
      let rawScore = 100 - diff * 1.15;

      // Psychological state bonus
      if (c >= 78 && task.effortType === 'Deep Flow') rawScore += 8;
      if (c >= 58 && c < 78 && task.effortType === 'Steady Rhythm') rawScore += 10;
      if (c < 58 && task.effortType === 'Light & Cozy') rawScore += 14;

      const matchScore = Math.round(Math.max(32, Math.min(99, rawScore)));

      // Friendly 1-sentence reason why this task fits right now
      let whyText = '';
      if (task.effortType === 'Deep Flow' && c >= 75) {
        whyText = `Matches your ${c}% clarity peak while mental friction is lowest.`;
      } else if (task.effortType === 'Steady Rhythm' && c >= 55) {
        whyText = `Fits your ${c}% creative rhythm without overloading working memory.`;
      } else if (task.effortType === 'Light & Cozy' && c < 58) {
        whyText = `Gentle ${task.durationMins}m win that protects your energy during this ${c}% dip.`;
      } else if (matchScore >= 75) {
        whyText = `Well-aligned with your current ${c}% cognitive bandwidth.`;
      } else {
        whyText = `Better saved for ${task.optimalWindow} (needs ~${task.idealClarity}% clarity).`;
      }

      return {
        ...task,
        matchScore,
        whyText
      };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore);
  }, [tasks, currentPrediction.clarity]);

  // Active task in Focus Tab
  const activeTask = useMemo(() => {
    return (
      recommendedTasks.find((t) => t.id === activeTaskId) ||
      tasks.find((t) => t.id === activeTaskId) ||
      recommendedTasks[0] ||
      tasks[0]
    );
  }, [recommendedTasks, tasks, activeTaskId]);

  // =========================================================
  // 3. AI AUTO-TAGGER FOR NEW TASKS (QUEUE TAB)
  // =========================================================
  const handlePreviewNewTask = (textOverride) => {
    const text = (textOverride ?? newTaskInput).trim();
    if (!text) {
      notify('Type a task or tap a sample chip below!');
      return;
    }
    setNewTaskInput(text);
    const lower = text.toLowerCase();

    let effortType = 'Steady Rhythm';
    let emoji = '🌿';
    let idealClarity = 72;
    let durationMins = 30;
    let optimalWindow = '5:00 PM – 7:30 PM';

    if (
      lower.includes('proof') ||
      lower.includes('debug') ||
      lower.includes('code') ||
      lower.includes('python') ||
      lower.includes('algorithm') ||
      lower.includes('calculus') ||
      lower.includes('model')
    ) {
      effortType = 'Deep Flow';
      emoji = '🔮';
      idealClarity = 88;
      durationMins = 45;
      optimalWindow = '9:00 AM – 11:30 AM';
    } else if (
      lower.includes('email') ||
      lower.includes('reply') ||
      lower.includes('tidy') ||
      lower.includes('clean') ||
      lower.includes('organize') ||
      lower.includes('schedule') ||
      lower.includes('receipt')
    ) {
      effortType = 'Light & Cozy';
      emoji = '🍵';
      idealClarity = 40;
      durationMins = 15;
      optimalWindow = '2:00 PM – 4:00 PM';
    }

    setDraftTaskPreview({
      title: text,
      effortType,
      emoji,
      durationMins,
      idealClarity,
      optimalWindow
    });
  };

  const handleAddDraftTask = () => {
    if (!draftTaskPreview) return;
    const created = {
      id: `t_${Date.now()}`,
      ...draftTaskPreview,
      completed: false
    };
    setTasks((prev) => [created, ...prev]);
    setNewTaskInput('');
    setDraftTaskPreview(null);
    notify(`Added "${created.title}" (${created.effortType})`);
  };

  // Start a Mindful Focus Sprint
  const startFocusSprint = (task) => {
    setActiveTaskId(task.id);
    setElapsedSecs(0);
    setIsRunning(true);
    setActiveTab('focus');
    notify(`Entering Mindful Focus: ${task.title}`);
  };

  // Complete session & calibrate recommender
  const handleReflectionChoice = (feelingLabel) => {
    if (activeTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? { ...t, completed: true } : t))
      );
    }
    setIsRunning(false);
    setShowReflectionSheet(false);
    setLearnedSessions((n) => n + 1);
    setPersonalFitScore((s) => Math.min(99, s + 1));
    notify(`Reflection saved (${feelingLabel}) • Brain Rhythm model updated!`);
  };

  // =========================================================
  // SVG WAVE COORDINATE GEOMETRY
  // =========================================================
  const svgW = 320;
  const svgH = 115;
  const padX = 12;
  const padTop = 18;
  const padBot = 22;
  const plotW = svgW - padX * 2;
  const plotH = svgH - padTop - padBot;

  const hourToX = (h) => padX + ((h - 6.0) / 17.0) * plotW;
  const clarityToY = (c) => padTop + ((100 - c) / 100) * plotH;

  const wavePoints = useMemo(
    () =>
      waveData.map((d) => ({
        x: hourToX(d.hour),
        y: clarityToY(d.clarity)
      })),
    [waveData]
  );

  const smoothLinePath = useMemo(() => buildSmoothSvgPath(wavePoints), [wavePoints]);

  const smoothAreaPath = useMemo(() => {
    if (!wavePoints.length) return '';
    const bottomY = padTop + plotH;
    return `${smoothLinePath} L ${wavePoints[wavePoints.length - 1].x.toFixed(
      1
    )} ${bottomY} L ${wavePoints[0].x.toFixed(1)} ${bottomY} Z`;
  }, [smoothLinePath, wavePoints]);

  const markerX = hourToX(currentHour);
  const markerY = clarityToY(currentPrediction.clarity);

  const formatTimerMMSS = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-2 sm:p-6 gap-6 font-sans selection:bg-[#E5DFF8]"
      style={{
        backgroundColor: '#F3EDE2',
        color: '#2D2A26'
      }}
    >
      {/* =====================================================================
          AMBIENT SIDE COMPANION BAR (Outside the Phone for Easy Testing)
      ====================================================================== */}
      <div className="w-full max-w-[390px] lg:max-w-[340px] flex flex-col gap-3.5">
        <div
          className="rounded-3xl p-5 border shadow-sm"
          style={{
            backgroundColor: '#FAF6F0',
            borderColor: '#E6DEC8'
          }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg shadow-sm"
                style={{ backgroundColor: '#F1EEFC', color: '#6956C6' }}
              >
                🧠
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-[#2D2A26]">
                  ChronoLoad
                </h1>
                <p className="text-xs text-[#7A736B]">
                  Mindful Cognitive Rhythm & Task Router
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-full border transition hover:opacity-80 flex items-center gap-1"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2D9C8',
                color: '#5C554E'
              }}
            >
              <Info className="w-3.5 h-3.5 text-[#8474D4]" />
              <span>About</span>
            </button>
          </div>

          <p className="text-xs leading-relaxed text-[#5C554E] mb-3.5">
            A gentle psychology-inspired planner that forecasts your{' '}
            <strong className="text-[#2D2A26]">daily mental clarity wave</strong> and
            recommends tasks that match how your brain feels right now.
          </p>

          {/* Interactive Demo Shortcuts */}
          <div className="space-y-2 pt-3 border-t border-[#EAE2D3]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C847A]">
              Quick Interactive Demo Jumpers
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {TIME_PRESETS.map((preset) => {
                const isSelected = Math.abs(currentHour - preset.hour) < 0.3;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setCurrentHour(preset.hour);
                      setActiveTab('rhythm');
                    }}
                    className="text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between"
                    style={{
                      backgroundColor: isSelected ? '#F1EEFC' : '#FFFFFF',
                      borderColor: isSelected ? '#8474D4' : '#EAE2D3'
                    }}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#2D2A26] flex items-center gap-1">
                        <span>{preset.icon}</span>
                        <span>{preset.label}</span>
                      </div>
                      <div className="text-[10px] text-[#7A736B] mt-0.5">
                        {preset.timeLabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick action pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => {
                  setBoostMatcha((v) => !v);
                  setActiveTab('rhythm');
                }}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition"
                style={{
                  backgroundColor: boostMatcha ? '#EBF5F0' : '#FFFFFF',
                  borderColor: boostMatcha ? '#689F84' : '#EAE2D3',
                  color: boostMatcha ? '#3E6E57' : '#5C554E'
                }}
              >
                🍵 {boostMatcha ? 'Matcha Boost On' : 'Try +Matcha Boost'}
              </button>
              <button
                onClick={() => setActiveTab('focus')}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition"
                style={{
                  backgroundColor: activeTab === 'focus' ? '#FDF6E4' : '#FFFFFF',
                  borderColor: '#EAE2D3',
                  color: '#5C554E'
                }}
              >
                🧘‍♀️ Preview Mindful Sprint
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CENTERED MOBILE PHONE MOCKUP (390px Wide, Warm Oat Aesthetic)
      ====================================================================== */}
      <div
        className="relative w-full sm:w-[390px] h-[820px] max-h-[94vh] sm:rounded-[48px] sm:border-[10px] shadow-2xl flex flex-col overflow-hidden select-none"
        style={{
          backgroundColor: '#FAF6F0',
          borderColor: '#E2D9C8',
          boxShadow: '0 25px 60px -15px rgba(92, 78, 58, 0.18)'
        }}
      >
        {/* Subtle Phone Top Speaker Pill */}
        <div className="hidden sm:flex items-center justify-center pt-2.5 pb-1">
          <div
            className="w-24 h-4 rounded-full flex items-center justify-end px-2"
            style={{ backgroundColor: '#EAE2D3' }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: brainAura.accent }}
            />
          </div>
        </div>

        {/* PHONE STATUS BAR */}
        <div className="px-6 pt-2 pb-2 flex items-center justify-between text-xs font-semibold text-[#5C554E]">
          <span>{formatFriendlyTime(currentHour)}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryCharging className="w-4 h-4 text-[#689F84]" />
          </div>
        </div>

        {/* SOFT FLOATING TOAST PILL */}
        {toast && (
          <div
            className="absolute top-12 left-5 right-5 z-50 px-4 py-2.5 rounded-2xl border shadow-md flex items-center justify-between text-xs font-medium animate-fade-in"
            style={{
              backgroundColor: '#2D2A26',
              color: '#FAF6F0',
              borderColor: '#4A453F'
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B24C] shrink-0" />
              <span>{toast}</span>
            </div>
            <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ===================================================================
            MAIN SCROLLABLE APP VIEWPORT
        ==================================================================== */}
        <div className="flex-1 overflow-y-auto px-4 pt-1 pb-4 space-y-4">
          {/* =================================================================
              TAB 1: RHYTHM (HOME — BRAIN AURA + ENERGY WAVE + TOP TASK MATCH)
          ================================================================== */}
          {activeTab === 'rhythm' && (
            <>
              {/* 1. EXPRESSIVE BRAIN AURA HEADER CARD */}
              <div
                className="rounded-3xl p-4 border transition-all duration-500"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: brainAura.border,
                  boxShadow: '0 8px 24px -6px rgba(132, 116, 212, 0.08)'
                }}
              >
                <div className="flex items-center gap-3.5">
                  <MindfulOrbCharacter
                    moodType={brainAura.moodType}
                    accentColor={brainAura.accent}
                    softColor={brainAura.softBg}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: brainAura.softBg,
                          color: brainAura.pillText
                        }}
                      >
                        {currentPrediction.clarity}% Clarity
                      </span>
                      <span className="text-[11px] font-medium text-[#7A736B]">
                        • {formatFriendlyTime(currentHour)}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight text-[#2D2A26] mt-1">
                      {brainAura.title}
                    </h2>
                    <p className="text-xs text-[#7A736B] font-medium">
                      {brainAura.subtitle}
                    </p>
                  </div>
                </div>

                <p
                  className="text-xs leading-relaxed mt-3 p-2.5 rounded-2xl"
                  style={{
                    backgroundColor: brainAura.softBg,
                    color: '#3D3833'
                  }}
                >
                  {brainAura.summary}
                </p>
              </div>

              {/* 2. INTERACTIVE PREDICTIVE ENERGY WAVE CARD */}
              <div
                className="rounded-3xl p-4 border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDE6DB',
                  boxShadow: '0 6px 20px -6px rgba(92, 78, 58, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A736B]">
                      Today’s Energy Wave
                    </h3>
                    <p className="text-[11px] text-[#9A9288]">
                      Drag slider to preview your brain state across the day
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: '#F5EFE6',
                      color: '#2D2A26'
                    }}
                  >
                    {formatFriendlyTime(currentHour)}
                  </span>
                </div>

                {/* Smooth Pastel Wave SVG */}
                <div
                  className="rounded-2xl p-2 mt-2 border"
                  style={{
                    backgroundColor: '#FAF6F0',
                    borderColor: '#EFE8DC'
                  }}
                >
                  <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    className="w-full h-28 overflow-visible"
                  >
                    <defs>
                      <linearGradient id="pastelWaveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={brainAura.accent}
                          stopOpacity="0.35"
                        />
                        <stop
                          offset="100%"
                          stopColor={brainAura.accent}
                          stopOpacity="0.02"
                        />
                      </linearGradient>
                    </defs>

                    {/* Subtle guide lines */}
                    {[35, 70].map((lvl) => (
                      <line
                        key={lvl}
                        x1={padX}
                        y1={clarityToY(lvl)}
                        x2={svgW - padX}
                        y2={clarityToY(lvl)}
                        stroke="#E7DFD2"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Soft gradient fill under wave */}
                    <path d={smoothAreaPath} fill="url(#pastelWaveGrad)" />

                    {/* Smooth cognitive wave line */}
                    <path
                      d={smoothLinePath}
                      fill="none"
                      stroke={brainAura.accent}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    {/* Vertical scrubber indicator line */}
                    <line
                      x1={markerX}
                      y1={padTop - 4}
                      x2={markerX}
                      y2={svgH - padBot}
                      stroke={brainAura.accent}
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />

                    {/* Glowing thumb orb on the curve */}
                    <circle
                      cx={markerX}
                      cy={markerY}
                      r="9"
                      fill={brainAura.softBg}
                    />
                    <circle
                      cx={markerX}
                      cy={markerY}
                      r="5.5"
                      fill={brainAura.accent}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Time labels along bottom */}
                    {[
                      { h: 7, lbl: '7am' },
                      { h: 11, lbl: '11am' },
                      { h: 15, lbl: '3pm' },
                      { h: 19, lbl: '7pm' },
                      { h: 22.5, lbl: '10pm' }
                    ].map((t) => (
                      <text
                        key={t.h}
                        x={hourToX(t.h)}
                        y={svgH - 5}
                        textAnchor="middle"
                        fill="#8C847A"
                        fontSize="8.5"
                        fontWeight="600"
                      >
                        {t.lbl}
                      </text>
                    ))}
                  </svg>
                </div>

                {/* Clean Time Scrubber Slider */}
                <div className="mt-3 px-1">
                  <input
                    type="range"
                    min="6.0"
                    max="23.0"
                    step="0.5"
                    value={currentHour}
                    onChange={(e) => setCurrentHour(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg cursor-pointer"
                    style={{ accentColor: brainAura.accent }}
                  />
                </div>

                {/* 4 Friendly Time Presets */}
                <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                  {TIME_PRESETS.map((preset) => {
                    const active = Math.abs(currentHour - preset.hour) < 0.3;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setCurrentHour(preset.hour)}
                        className="py-1.5 px-1 rounded-2xl text-[10px] font-bold border transition flex flex-col items-center gap-0.5"
                        style={{
                          backgroundColor: active ? brainAura.softBg : '#FAF6F0',
                          borderColor: active ? brainAura.accent : '#EDE6DB',
                          color: active ? '#2D2A26' : '#7A736B'
                        }}
                      >
                        <span>{preset.icon}</span>
                        <span>{preset.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Gentle Micro-Boost Pills right on the Home screen */}
                <div className="mt-3 pt-2.5 border-t border-[#F0E9DF] flex items-center justify-between gap-1.5">
                  <span className="text-[10px] font-semibold text-[#8C847A] shrink-0">
                    Gentle Boosts:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    <button
                      onClick={() => {
                        setBoostMatcha((v) => !v);
                        notify(
                          !boostMatcha
                            ? 'Added Matcha lift (+11% midday clarity)'
                            : 'Removed Matcha boost'
                        );
                      }}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition shrink-0"
                      style={{
                        backgroundColor: boostMatcha ? '#EBF5F0' : '#FAF6F0',
                        borderColor: boostMatcha ? '#689F84' : '#E6DEC8',
                        color: boostMatcha ? '#3E6E57' : '#6E675F'
                      }}
                    >
                      🍵 Matcha
                    </button>
                    <button
                      onClick={() => {
                        setBoostWalk((v) => !v);
                        notify(
                          !boostWalk
                            ? 'Added 15m Sunlight Walk (+9% afternoon lift)'
                            : 'Removed Sunlight Walk'
                        );
                      }}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition shrink-0"
                      style={{
                        backgroundColor: boostWalk ? '#FDF6E4' : '#FAF6F0',
                        borderColor: boostWalk ? '#E5B24C' : '#E6DEC8',
                        color: boostWalk ? '#946A16' : '#6E675F'
                      }}
                    >
                      ☀️ 15m Walk
                    </button>
                    <button
                      onClick={() => {
                        setBoostNap((v) => !v);
                        notify(
                          !boostNap
                            ? 'Added 20m Power Nap (+11% evening glow)'
                            : 'Removed Power Nap'
                        );
                      }}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition shrink-0"
                      style={{
                        backgroundColor: boostNap ? '#F1EEFC' : '#FAF6F0',
                        borderColor: boostNap ? '#8474D4' : '#E6DEC8',
                        color: boostNap ? '#5E4BB5' : '#6E675F'
                      }}
                    >
                      ☁️ Power Nap
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. RECOMMENDER SYSTEM: BEST TASK FOR YOUR BRAIN RIGHT NOW */}
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#2D2A26] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#8474D4]" />
                      <span>Matched to Your Brain Now</span>
                    </h3>
                    <p className="text-[11px] text-[#7A736B]">
                      Auto-ranked for {formatFriendlyTime(currentHour)} ({currentPrediction.clarity}% clarity)
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('queue')}
                    className="text-xs font-bold text-[#6956C6] hover:underline flex items-center"
                  >
                    <span>See all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* #1 Hero Recommended Task Card */}
                {recommendedTasks[0] && (() => {
                  const topTask = recommendedTasks[0];
                  const st = EFFORT_STYLES[topTask.effortType];
                  return (
                    <div
                      className="rounded-3xl p-4 border transition-all duration-300 mb-2.5"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: st.border,
                        boxShadow: '0 10px 25px -8px rgba(92, 78, 58, 0.08)'
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: st.badgeBg,
                              color: st.badgeText
                            }}
                          >
                            {topTask.emoji} {topTask.effortType}
                          </span>
                          <span className="text-[11px] text-[#7A736B] font-medium">
                            • {topTask.durationMins} min
                          </span>
                        </div>
                        <span
                          className="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: '#EBF5F0',
                            color: '#3E6E57'
                          }}
                        >
                          {topTask.matchScore}% Brain Match
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#2D2A26] leading-snug">
                        {topTask.title}
                      </h4>

                      <p className="text-xs text-[#6E675F] mt-1.5 leading-relaxed">
                        {topTask.whyText}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between">
                        <span className="text-[11px] text-[#8C847A]">
                          Ideal window: {topTask.optimalWindow}
                        </span>
                        <button
                          onClick={() => startFocusSprint(topTask)}
                          className="px-4 py-2 rounded-2xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition hover:opacity-95"
                          style={{ backgroundColor: st.accent }}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Start Focus</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* 2 Secondary Recommended Tasks */}
                <div className="space-y-2">
                  {recommendedTasks.slice(1, 3).map((task) => {
                    const st = EFFORT_STYLES[task.effortType];
                    return (
                      <div
                        key={task.id}
                        className="rounded-2xl p-3 border flex items-center justify-between gap-3 transition"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#EDE6DB'
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: st.badgeBg,
                                color: st.badgeText
                              }}
                            >
                              {task.emoji} {task.effortType}
                            </span>
                            <span className="text-[10px] font-bold text-[#689F84]">
                              {task.matchScore}% Match
                            </span>
                            <span className="text-[10px] text-[#8C847A]">
                              • {task.durationMins}m
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#2D2A26] truncate">
                            {task.title}
                          </div>
                        </div>
                        <button
                          onClick={() => startFocusSprint(task)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border transition shrink-0"
                          style={{
                            backgroundColor: '#FAF6F0',
                            borderColor: '#E2D9C8',
                            color: '#2D2A26'
                          }}
                        >
                          Begin
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              TAB 2: QUEUE (SMART TASK RECOMMENDER & AI AUTO-TAGGER)
          ================================================================== */}
          {activeTab === 'queue' && (
            <>
              {/* Header & Simple AI Auto-Tagger Input */}
              <div
                className="rounded-3xl p-4 border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDE6DB'
                }}
              >
                <h2 className="text-base font-extrabold text-[#2D2A26] flex items-center gap-1.5">
                  <span>✨ Mindful Task Queue</span>
                </h2>
                <p className="text-xs text-[#7A736B] mt-0.5 mb-3">
                  Add anything on your mind—ChronoLoad tags its cognitive effort and finds the gentlest time slot today.
                </p>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="e.g., Read chapter 4, Reply to emails..."
                    className="flex-1 rounded-2xl px-3.5 py-2.5 text-xs border focus:outline-none"
                    style={{
                      backgroundColor: '#FAF6F0',
                      borderColor: '#E2D9C8',
                      color: '#2D2A26'
                    }}
                  />
                  <button
                    onClick={() => handlePreviewNewTask()}
                    className="px-3.5 py-2.5 rounded-2xl text-xs font-bold text-white shrink-0 transition"
                    style={{ backgroundColor: '#8474D4' }}
                  >
                    Auto-Tag
                  </button>
                </div>

                {/* Quick Sample Chips */}
                <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                  <span className="text-[10px] text-[#8C847A]">Try sample:</span>
                  {[
                    'Debug Python script',
                    'Read chapter 4 notes',
                    'Reply to lab emails'
                  ].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => handlePreviewNewTask(sample)}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full border transition hover:opacity-80"
                      style={{
                        backgroundColor: '#FAF6F0',
                        borderColor: '#E6DEC8',
                        color: '#5C554E'
                      }}
                    >
                      + {sample}
                    </button>
                  ))}
                </div>

                {/* Cute AI Auto-Tagger Preview Card */}
                {draftTaskPreview && (() => {
                  const st = EFFORT_STYLES[draftTaskPreview.effortType];
                  return (
                    <div
                      className="mt-3 p-3.5 rounded-2xl border animate-fade-in"
                      style={{
                        backgroundColor: st.badgeBg,
                        borderColor: st.border
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider"
                          style={{ color: st.badgeText }}
                        >
                          {draftTaskPreview.emoji} Predicted Effort: {draftTaskPreview.effortType}
                        </span>
                        <span className="text-[10px] font-semibold text-[#5C554E]">
                          ~{draftTaskPreview.durationMins} mins
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#2D2A26]">
                        {draftTaskPreview.title}
                      </div>
                      <div className="text-[11px] text-[#5C554E] mt-1">
                        Best window today: <strong>{draftTaskPreview.optimalWindow}</strong> (needs ~{draftTaskPreview.idealClarity}% clarity)
                      </div>
                      <button
                        onClick={handleAddDraftTask}
                        className="mt-2.5 w-full py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 shadow-sm"
                        style={{ backgroundColor: st.accent }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save to My Queue</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Effort Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'Deep Flow', 'Steady Rhythm', 'Light & Cozy'].map((cat) => {
                  const active = effortFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setEffortFilter(cat)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border transition shrink-0"
                      style={{
                        backgroundColor: active ? '#2D2A26' : '#FFFFFF',
                        borderColor: active ? '#2D2A26' : '#E6DEC8',
                        color: active ? '#FAF6F0' : '#6E675F'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Task Cards Sorted by Current Time Match */}
              <div className="space-y-2.5">
                {recommendedTasks
                  .filter(
                    (t) => effortFilter === 'All' || t.effortType === effortFilter
                  )
                  .map((task) => {
                    const st = EFFORT_STYLES[task.effortType];
                    return (
                      <div
                        key={task.id}
                        className="rounded-3xl p-3.5 border transition"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#EDE6DB'
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: st.badgeBg,
                              color: st.badgeText
                            }}
                          >
                            {task.emoji} {task.effortType}
                          </span>
                          <span
                            className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor:
                                task.matchScore >= 80 ? '#EBF5F0' : '#FAF6F0',
                              color: task.matchScore >= 80 ? '#3E6E57' : '#7A736B'
                            }}
                          >
                            {task.matchScore}% Match at {formatFriendlyTime(currentHour)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#2D2A26]">
                              {task.title}
                            </h4>
                            <p className="text-[11px] text-[#7A736B] mt-0.5">
                              {task.durationMins}m • Best slot: {task.optimalWindow}
                            </p>
                          </div>
                          <button
                            onClick={() => startFocusSprint(task)}
                            className="px-3.5 py-2 rounded-2xl text-xs font-bold text-white shrink-0 transition hover:opacity-90"
                            style={{ backgroundColor: st.accent }}
                          >
                            Begin
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}

          {/* =================================================================
              TAB 3: TUNE (GENTLE "WHAT-IF" FORECAST CHECK-IN)
          ================================================================== */}
          {activeTab === 'tune' && (
            <>
              <div
                className="rounded-3xl p-4 border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDE6DB'
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-extrabold text-[#2D2A26]">
                    🌱 Gentle Rhythm Check-In
                  </h2>
                  <button
                    onClick={() => {
                      setSleepHours(7.5);
                      setSleepQuality('Restorative');
                      setDayLoad('Moderate');
                      setBoostMatcha(false);
                      setBoostWalk(false);
                      setBoostNap(false);
                      notify('Restored baseline daily rhythm');
                    }}
                    className="text-[11px] font-semibold text-[#7A736B] hover:text-[#2D2A26] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <p className="text-xs text-[#7A736B] mb-3.5">
                  See how your sleep and schedule gently reshape today’s predicted focus windows.
                </p>

                {/* Live Forecast Summary Card */}
                <div
                  className="rounded-2xl p-3.5 border mb-4"
                  style={{
                    backgroundColor: '#FAF6F0',
                    borderColor: '#E6DEC8'
                  }}
                >
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className="rounded-2xl p-2.5 border"
                      style={{
                        backgroundColor: '#F1EEFC',
                        borderColor: '#DCD4F7'
                      }}
                    >
                      <div className="text-[10px] font-bold text-[#6956C6] uppercase">
                        🔮 Peak Deep Flow
                      </div>
                      <div className="text-xs font-extrabold text-[#2D2A26] mt-0.5">
                        {forecastSummary.peakWindow}
                      </div>
                      <div className="text-[10px] text-[#6956C6] mt-0.5">
                        Up to {forecastSummary.peakClarity}% clarity
                      </div>
                    </div>

                    <div
                      className="rounded-2xl p-2.5 border"
                      style={{
                        backgroundColor: '#FDF0EC',
                        borderColor: '#F7D6CC'
                      }}
                    >
                      <div className="text-[10px] font-bold text-[#C8684D] uppercase">
                        🍵 Best Recharge Break
                      </div>
                      <div className="text-xs font-extrabold text-[#2D2A26] mt-0.5">
                        {forecastSummary.rechargeWindow}
                      </div>
                      <div className="text-[10px] text-[#C8684D] mt-0.5">
                        Switch to cozy tasks
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Sleep Last Night Stepper & Quality */}
                <div
                  className="rounded-2xl p-3.5 border mb-3"
                  style={{
                    backgroundColor: '#FAF6F0',
                    borderColor: '#EDE6DB'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#2D2A26]">
                      🌙 Sleep Last Night
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSleepHours((h) => Math.max(5.0, Number((h - 0.5).toFixed(1))))
                        }
                        className="w-7 h-7 rounded-full border font-bold text-sm flex items-center justify-center bg-white"
                        style={{ borderColor: '#E2D9C8' }}
                      >
                        –
                      </button>
                      <span className="text-sm font-extrabold text-[#2D2A26] w-14 text-center">
                        {sleepHours.toFixed(1)}h
                      </span>
                      <button
                        onClick={() =>
                          setSleepHours((h) => Math.min(9.5, Number((h + 0.5).toFixed(1))))
                        }
                        className="w-7 h-7 rounded-full border font-bold text-sm flex items-center justify-center bg-white"
                        style={{ borderColor: '#E2D9C8' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {['Restless', 'Okay', 'Restorative'].map((q) => {
                      const active = sleepQuality === q;
                      return (
                        <button
                          key={q}
                          onClick={() => setSleepQuality(q)}
                          className="py-1.5 rounded-xl text-xs font-bold border transition"
                          style={{
                            backgroundColor: active ? '#F1EEFC' : '#FFFFFF',
                            borderColor: active ? '#8474D4' : '#E6DEC8',
                            color: active ? '#5E4BB5' : '#6E675F'
                          }}
                        >
                          {q}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Today's Social & Schedule Load */}
                <div
                  className="rounded-2xl p-3.5 border"
                  style={{
                    backgroundColor: '#FAF6F0',
                    borderColor: '#EDE6DB'
                  }}
                >
                  <div className="text-xs font-bold text-[#2D2A26] mb-2">
                    🗓️ Today’s Schedule & Social Load
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'Light Day', icon: '🌤️' },
                      { id: 'Moderate', icon: '🌿' },
                      { id: 'Back-to-Back', icon: '⚡' }
                    ].map((item) => {
                      const active = dayLoad === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setDayLoad(item.id)}
                          className="p-2.5 rounded-2xl border text-center transition"
                          style={{
                            backgroundColor: active ? '#EBF5F0' : '#FFFFFF',
                            borderColor: active ? '#689F84' : '#E6DEC8',
                            color: active ? '#3E6E57' : '#6E675F'
                          }}
                        >
                          <div className="text-base">{item.icon}</div>
                          <div className="text-[11px] font-bold mt-0.5">{item.id}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              TAB 4: FOCUS (MINDFUL SPRINT & 1-TAP AI CALIBRATION)
          ================================================================== */}
          {activeTab === 'focus' && activeTask && (
            <>
              <div
                className="rounded-3xl p-5 border text-center relative"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDE6DB'
                }}
              >
                <span
                  className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-2"
                  style={{
                    backgroundColor: EFFORT_STYLES[activeTask.effortType].badgeBg,
                    color: EFFORT_STYLES[activeTask.effortType].badgeText
                  }}
                >
                  {activeTask.emoji} {activeTask.effortType} • {activeTask.durationMins}m Session
                </span>

                <h2 className="text-base font-extrabold text-[#2D2A26] px-2 leading-snug">
                  {activeTask.title}
                </h2>

                {/* Breathing Mindful Progress Circle */}
                <div className="my-6 flex flex-col items-center justify-center">
                  <div
                    className="w-48 h-48 rounded-full flex flex-col items-center justify-center relative border-8 transition-all duration-500"
                    style={{
                      backgroundColor: '#FAF6F0',
                      borderColor: EFFORT_STYLES[activeTask.effortType].badgeBg
                    }}
                  >
                    <MindfulOrbCharacter
                      moodType={brainAura.moodType}
                      accentColor={EFFORT_STYLES[activeTask.effortType].accent}
                      softColor={EFFORT_STYLES[activeTask.effortType].badgeBg}
                    />
                    <div className="text-3xl font-extrabold text-[#2D2A26] tracking-tight mt-2 font-mono">
                      {formatTimerMMSS(elapsedSecs)}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A736B]">
                      {isRunning ? 'Breathing in steady flow...' : 'Session paused'}
                    </div>
                  </div>

                  {/* Play / Pause / +5m Controls */}
                  <div className="flex items-center gap-2.5 mt-5">
                    <button
                      onClick={() => setIsRunning((r) => !r)}
                      className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition"
                      style={{
                        backgroundColor: EFFORT_STYLES[activeTask.effortType].accent
                      }}
                    >
                      {isRunning ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume Focus</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setElapsedSecs((s) => s + 300)}
                      className="px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition"
                      style={{
                        backgroundColor: '#FAF6F0',
                        borderColor: '#E2D9C8',
                        color: '#5C554E'
                      }}
                    >
                      +5m
                    </button>
                  </div>
                </div>

                {/* Calming Ambient Soundscape Pills */}
                <div className="pt-3 border-t border-[#F0E9DF] mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A] mb-2">
                    Mindful Soundscape
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {[
                      { id: 'Rain', label: '🌧️ Soft Rain' },
                      { id: 'Brown Noise', label: '🌊 Warm Waves' },
                      { id: 'Quiet', label: '🤫 Quiet' }
                    ].map((s) => {
                      const active = ambientSound === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setAmbientSound(s.id)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                          style={{
                            backgroundColor: active ? '#F1EEFC' : '#FAF6F0',
                            borderColor: active ? '#8474D4' : '#E6DEC8',
                            color: active ? '#5E4BB5' : '#6E675F'
                          }}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complete Session & Calibrate AI Button */}
                <button
                  onClick={() => setShowReflectionSheet(true)}
                  className="w-full py-3 rounded-2xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-sm transition hover:opacity-95"
                  style={{ backgroundColor: '#689F84' }}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Complete Session & Reflect</span>
                </button>
              </div>

              {/* 1-TAP PSYCHOLOGY REFLECTION SHEET */}
              {showReflectionSheet && (
                <div
                  className="rounded-3xl p-4 border animate-fade-in"
                  style={{
                    backgroundColor: '#F1EEFC',
                    borderColor: '#8474D4'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-[#5E4BB5]">
                      ✨ 1-Tap Brain Check-In
                    </span>
                    <button
                      onClick={() => setShowReflectionSheet(false)}
                      className="text-[#7A736B]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#3D3833] mb-3">
                    How did this task feel on your brain? Your answer teaches ChronoLoad your personal rhythm.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { emoji: '🌊', label: 'Effortless Flow', sub: 'Felt energized' },
                      { emoji: '🌱', label: 'Just Right', sub: 'Matched my pace' },
                      { emoji: '☁️', label: 'A Bit Draining', sub: 'Needed more rest' }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleReflectionChoice(opt.label)}
                        className="p-2.5 rounded-2xl bg-white border border-[#DCD4F7] hover:border-[#8474D4] text-center transition shadow-sm"
                      >
                        <div className="text-lg">{opt.emoji}</div>
                        <div className="text-[11px] font-bold text-[#2D2A26] mt-0.5">
                          {opt.label}
                        </div>
                        <div className="text-[9px] text-[#7A736B]">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gentle Personalization Badge */}
              <div
                className="rounded-2xl p-3 border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDE6DB'
                }}
              >
                <span className="text-[#6E675F]">
                  🧠 Learned from <strong>{learnedSessions} mindful reflections</strong>
                </span>
                <span className="font-extrabold text-[#689F84]">
                  {personalFitScore}% Personal Fit
                </span>
              </div>
            </>
          )}
        </div>

        {/* ===================================================================
            CLEAN 4-TAB MINDFUL BOTTOM NAVIGATION BAR
        ==================================================================== */}
        <div
          className="px-4 py-2.5 border-t grid grid-cols-4 gap-1.5"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#EDE6DB'
          }}
        >
          {[
            { id: 'rhythm', label: 'Rhythm', icon: Compass },
            { id: 'queue', label: 'Queue', icon: ListChecks },
            { id: 'tune', label: 'Tune', icon: Sliders },
            { id: 'focus', label: 'Focus', icon: Timer }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center py-1.5 rounded-2xl transition"
                style={{
                  backgroundColor: active ? '#F1EEFC' : 'transparent',
                  color: active ? '#6956C6' : '#8C847A'
                }}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
                <span className="text-[10px] font-bold mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SIMPLE ABOUT / NEW USER MODAL */}
        {showGuideModal && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-5">
            <div
              className="rounded-3xl p-5 border max-w-xs w-full shadow-xl"
              style={{
                backgroundColor: '#FAF6F0',
                borderColor: '#E2D9C8'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-extrabold text-[#2D2A26]">
                  🌿 How ChronoLoad Works
                </h3>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-[#7A736B]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-2 text-xs text-[#5C554E] leading-relaxed">
                <li>
                  <strong>1. Predictive Energy Wave:</strong> Forecasts your mental clarity from morning to night based on your sleep and schedule.
                </li>
                <li>
                  <strong>2. Mind-Match Recommender:</strong> Automatically re-orders your tasks so you tackle <em>Deep Flow</em> work at your peak and <em>Light & Cozy</em> tasks during your afternoon dip.
                </li>
                <li>
                  <strong>3. Gentle Calibration:</strong> After each focus session, a 1-tap reflection teaches the model your personal cognitive rhythm.
                </li>
              </ul>
              <button
                onClick={() => setShowGuideModal(false)}
                className="mt-4 w-full py-2.5 rounded-2xl text-xs font-bold text-white"
                style={{ backgroundColor: '#8474D4' }}
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}