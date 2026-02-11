import { useState, useEffect } from 'react';
import { LoginPage } from '@/app/components/LoginPage';
import { MoodTrackingPage } from '@/app/components/MoodTrackingPage';
import { HabitCoachPage } from '@/app/components/HabitCoachPage';
import { PersonalizedWellnessPage, WellnessPreferences } from '@/app/components/PersonalizedWellnessPage';
import { DashboardPage } from '@/app/components/DashboardPage';
import { MeditationPage } from '@/app/components/MeditationPage';
import { CalendarPage } from '@/app/components/CalendarPage';
import { GamificationPage } from '@/app/components/GamificationPage';
import { WellnessGame } from '@/app/components/WellnessGame';
import { InsightsPage } from '@/app/components/InsightsPage';
import { SettingsPage, AppSettings } from '@/app/components/SettingsPage';
import { AnalyticsDashboard } from '@/app/components/AnalyticsDashboard';
import { VoiceMoodInput } from '@/app/components/VoiceMoodInput';
import { FaceEmotionDetection } from '@/app/components/FaceEmotionDetection';
import { ChatbotCoach } from '@/app/components/ChatbotCoach';
import { RelaxationGames } from '@/app/components/RelaxationGames';
import { Trophy, Star, Award, Flame, Target, Crown, Heart, Zap } from 'lucide-react';
import * as api from '@/lib/api';

type Page = 'login' | 'mood' | 'habits' | 'wellness' | 'dashboard' | 'meditation' | 'calendar' | 'achievements' | 'game' | 'insights' | 'settings' | 'analytics' | 'relaxation-games';

interface HabitEntry {
  date: Date;
  habits: string[];
  mood: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  
  // User data
  const [userName, setUserName] = useState('');
  const [mood, setMood] = useState('');
  const [moodFactors, setMoodFactors] = useState<string[]>([]);
  const [moodNote, setMoodNote] = useState('');
  const [habits, setHabits] = useState<string[]>([]);
  const [customHabit, setCustomHabit] = useState<string>();
  const [preferences, setPreferences] = useState<WellnessPreferences>({
    focus: '',
    activityLevel: 3,
    sleepHours: 7,
    stressLevel: 5,
  });

  // Overlay modals
  const [showChatbot, setShowChatbot] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showFaceDetection, setShowFaceDetection] = useState(false);

  // Gamification data
  const [totalPoints, setTotalPoints] = useState(120);
  const [level, setLevel] = useState(2);
  const [streak, setStreak] = useState(5);
  const [habitEntries, setHabitEntries] = useState<HabitEntry[]>([
    { date: new Date(), habits: ['exercise', 'water'], mood: 'Great' },
    { date: new Date(Date.now() - 86400000), habits: ['exercise', 'meditation', 'water'], mood: 'Good' },
    { date: new Date(Date.now() - 172800000), habits: ['water', 'sleep'], mood: 'Good' },
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-step',
      name: 'First Step',
      description: 'Complete your first check-in',
      icon: Star,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 10,
    },
    {
      id: 'streak-3',
      name: '3 Day Streak',
      description: 'Maintain a 3-day streak',
      icon: Flame,
      unlocked: true,
      progress: 3,
      maxProgress: 3,
      points: 25,
    },
    {
      id: 'habit-master',
      name: 'Habit Master',
      description: 'Complete all habits in a day',
      icon: Target,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 30,
    },
    {
      id: 'meditation-guru',
      name: 'Meditation Guru',
      description: 'Complete 10 meditation sessions',
      icon: Heart,
      unlocked: false,
      progress: 3,
      maxProgress: 10,
      points: 50,
    },
    {
      id: 'streak-7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      unlocked: false,
      progress: 5,
      maxProgress: 7,
      points: 50,
    },
    {
      id: 'habit-hero',
      name: 'Habit Hero',
      description: 'Track habits for 30 days',
      icon: Trophy,
      unlocked: false,
      progress: 5,
      maxProgress: 30,
      points: 100,
    },
    {
      id: 'wellness-champion',
      name: 'Wellness Champion',
      description: 'Reach level 10',
      icon: Crown,
      unlocked: false,
      progress: 2,
      maxProgress: 10,
      points: 150,
    },
    {
      id: 'mindful-master',
      name: 'Mindful Master',
      description: 'Complete 50 meditation sessions',
      icon: Zap,
      unlocked: false,
      progress: 3,
      maxProgress: 50,
      points: 200,
    },
  ]);

  const handleLogin = (name: string) => {
    // Persist login to backend and hydrate data
    setUserName(name);
    (async () => {
      try {
        const loginRes = await api.login(name)
        if (loginRes?.userName) {
          setUserName(loginRes.userName)
        }

        const stateRes = await api.getState()
        if (stateRes?.state) {
          const s = stateRes.state
          setHabitEntries(s.habitEntries || [])
          setTotalPoints(s.totalPoints || totalPoints)
          setLevel(s.level || level)
          setAchievements(s.achievements || achievements)
          setPreferences(s.preferences || preferences)
          setStreak(s.streak || streak)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Login error', e)
      }
    })()
    setCurrentPage('mood');
  };

  const handleMoodNext = (selectedMood: string, factors: string[], note: string) => {
    setMood(selectedMood);
    setMoodFactors(factors);
    setMoodNote(note);
    setCurrentPage('habits');
  };

  const handleHabitsNext = (selectedHabits: string[], custom?: string) => {
    setHabits(selectedHabits);
    setCustomHabit(custom);
    setCurrentPage('wellness');
  };

  const handleWellnessNext = (wellnessPrefs: WellnessPreferences) => {
    setPreferences(wellnessPrefs);

    // Add initial entry
    const newEntry: HabitEntry = {
      date: new Date(),
      habits: habits,
      mood: mood,
    };
    setHabitEntries([...habitEntries, newEntry]);

    // Award points for completing setup
    const setupPoints = 50;
    setTotalPoints(totalPoints + setupPoints);

    // Check for level up
    const newTotalPoints = totalPoints + setupPoints;
    const newLevel = Math.floor(newTotalPoints / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }

    // Persist check-in to backend
    (async () => {
      try {
        await api.checkin({
          mood,
          factors: moodFactors,
          note: moodNote,
          habits,
          customHabit,
          preferences: wellnessPrefs,
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Checkin error', e)
      }
    })()

    setCurrentPage('dashboard');
  };

  useEffect(() => {
    // Hydrate initial state from backend if available
    (async () => {
      try {
        const stateRes = await api.getState()
        if (stateRes?.state) {
          const s = stateRes.state
          setHabitEntries(s.habitEntries || [])
          setTotalPoints(s.totalPoints || totalPoints)
          setLevel(s.level || level)
          setAchievements(s.achievements || achievements)
          setPreferences(s.preferences || preferences)
          setStreak(s.streak || streak)
          if (s.userName) setUserName(s.userName)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Hydration error', e)
      }
    })()
  }, [])

  const handleMeditationComplete = (duration: number, type: string) => {
    const points = duration * 2; // 2 points per minute
    setTotalPoints(totalPoints + points);
    
    // Update meditation achievement progress
    setAchievements(prev => prev.map(ach => {
      if (ach.id === 'meditation-guru') {
        const newProgress = ach.progress + 1;
        return {
          ...ach,
          progress: newProgress,
          unlocked: newProgress >= ach.maxProgress,
        };
      }
      return ach;
    }));
    
    setCurrentPage('dashboard');
  };

  const handleGameComplete = (earnedPoints: number) => {
    setTotalPoints(totalPoints + earnedPoints);
    
    const newTotalPoints = totalPoints + earnedPoints;
    const newLevel = Math.floor(newTotalPoints / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
    
    setCurrentPage('dashboard');
  };

  const handleRestart = () => {
    setCurrentPage('login');
  };

  return (
    <div className="size-full">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {currentPage === 'mood' && (
        <MoodTrackingPage
          userName={userName}
          onNext={handleMoodNext}
          onBack={() => setCurrentPage('login')}
        />
      )}
      
      {currentPage === 'habits' && (
        <HabitCoachPage
          onNext={handleHabitsNext}
          onBack={() => setCurrentPage('mood')}
        />
      )}
      
      {currentPage === 'wellness' && (
        <PersonalizedWellnessPage
          onNext={handleWellnessNext}
          onBack={() => setCurrentPage('habits')}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <DashboardPage
          userName={userName}
          mood={mood}
          moodFactors={moodFactors}
          moodNote={moodNote}
          habits={habits}
          customHabit={customHabit}
          preferences={preferences}
          totalPoints={totalPoints}
          level={level}
          streak={streak}
          onRestart={handleRestart}
          onMeditation={() => setCurrentPage('meditation')}
          onCalendar={() => setCurrentPage('calendar')}
          onAchievements={() => setCurrentPage('achievements')}
          onGame={() => setCurrentPage('game')}
          onInsights={() => setCurrentPage('insights')}
          onSettings={() => setCurrentPage('settings')}
          onAnalytics={() => setCurrentPage('analytics')}
          onChatbot={() => setShowChatbot(true)}
          onRelaxationGames={() => setCurrentPage('relaxation-games')}
        />
      )}
      
      {currentPage === 'meditation' && (
        <MeditationPage
          onComplete={handleMeditationComplete}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'calendar' && (
        <CalendarPage
          habitEntries={habitEntries}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'achievements' && (
        <GamificationPage
          totalPoints={totalPoints}
          level={level}
          streak={streak}
          achievements={achievements}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'game' && (
        <WellnessGame
          onComplete={handleGameComplete}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'insights' && (
        <InsightsPage
          streak={streak}
          totalCheckIns={habitEntries.length}
          favoriteMood="Great"
          mostCompletedHabit="Water"
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'settings' && (
        <SettingsPage
          onBack={() => setCurrentPage('dashboard')}
          onSave={(settings: AppSettings) => {
            // Save settings (could add state management here)
            console.log('Settings saved:', settings);
          }}
        />
      )}
      
      {currentPage === 'analytics' && (
        <AnalyticsDashboard
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'relaxation-games' && (
        <RelaxationGames
          onBack={() => setCurrentPage('dashboard')}
          onGameComplete={handleGameComplete}
        />
      )}
      
      {/* Overlay Modals */}
      {showChatbot && (
        <ChatbotCoach
          userName={userName}
          onClose={() => setShowChatbot(false)}
        />
      )}
      
      {showVoiceInput && (
        <VoiceMoodInput
          onMoodDetected={(detectedMood, confidence) => {
            setMood(detectedMood);
            setShowVoiceInput(false);
            // Could add to analytics or update mood tracking
          }}
          onClose={() => setShowVoiceInput(false)}
        />
      )}
      
      {showFaceDetection && (
        <FaceEmotionDetection
          onEmotionDetected={(detectedMood, emotions) => {
            setMood(detectedMood);
            setShowFaceDetection(false);
            // Could add emotion data to analytics
          }}
          onClose={() => setShowFaceDetection(false)}
        />
      )}
    </div>
  );
}