import { Sparkles, TrendingUp, Heart, Target, BookOpen, Zap, Sun, Moon, Calendar, Trophy, Brain, Gamepad2, BarChart3, MessageCircle, Activity, Flame, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { NavigationBar } from '@/app/components/shared/NavigationBar';
import { WellnessPreferences } from './PersonalizedWellnessPage';

interface DashboardPageProps {
  userName: string;
  mood: string;
  moodFactors: string[];
  moodNote: string;
  habits: string[];
  customHabit?: string;
  preferences: WellnessPreferences;
  totalPoints: number;
  level: number;
  streak: number;
  onRestart: () => void;
  onMeditation: () => void;
  onCalendar: () => void;
  onAchievements: () => void;
  onGame: () => void;
  onInsights: () => void;
  onSettings: () => void;
  onAnalytics: () => void;
  onChatbot: () => void;
  onRelaxationGames: () => void;
}

export function DashboardPage({
  userName,
  mood,
  moodFactors,
  moodNote,
  habits,
  customHabit,
  preferences,
  totalPoints,
  level,
  streak,
  onRestart,
  onMeditation,
  onCalendar,
  onAchievements,
  onGame,
  onInsights,
  onSettings,
  onAnalytics,
  onChatbot,
  onRelaxationGames,
}: DashboardPageProps) {
  const getRecommendations = () => {
    const recommendations = [];

    if (mood === 'Low' || mood === 'Okay') {
      recommendations.push({
        title: 'Mood Boost',
        description: 'Try a 10-minute walk outside. Natural light and movement can improve your mood.',
        icon: Sun,
        color: 'text-yellow-500',
      });
    }

    if (preferences.stressLevel >= 7) {
      recommendations.push({
        title: 'Stress Relief',
        description: 'Practice deep breathing: 4 counts in, hold for 4, out for 4. Repeat 5 times.',
        icon: Heart,
        color: 'text-pink-500',
      });
    }

    if (preferences.sleepHours < 7) {
      recommendations.push({
        title: 'Better Sleep',
        description: 'Try setting a consistent bedtime. Aim for 7-9 hours to improve recovery.',
        icon: Moon,
        color: 'text-indigo-500',
      });
    }

    if (preferences.activityLevel < 5) {
      recommendations.push({
        title: 'Move More',
        description: 'Start small: Take the stairs, park farther away, or do 5-minute stretches.',
        icon: Target,
        color: 'text-green-500',
      });
    }

    recommendations.push({
      title: 'Daily Mindfulness',
      description: 'Spend 5 minutes in meditation to center yourself and reduce anxiety.',
      icon: Brain,
      color: 'text-purple-500',
    });

    recommendations.push({
      title: 'Hydration Check',
      description: 'Drink a glass of water now. Aim for 8 glasses throughout the day.',
      icon: Sparkles,
      color: 'text-blue-500',
    });

    return recommendations.slice(0, 4);
  };

  const recommendations = getRecommendations();
  const progressToNextLevel = ((totalPoints % 100) / 100) * 100;

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'Great': return '😊';
      case 'Good': return '🙂';
      case 'Okay': return '😐';
      case 'Low': return '😔';
      default: return '😊';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Great': return 'from-green-400 to-emerald-500';
      case 'Good': return 'from-blue-400 to-cyan-500';
      case 'Okay': return 'from-yellow-400 to-amber-500';
      case 'Low': return 'from-orange-400 to-red-500';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const quickActions = [
    { label: 'Meditation', icon: Brain, action: onMeditation, color: 'from-purple-500 to-pink-500' },
    { label: 'Relaxation Games', icon: Gamepad2, action: onRelaxationGames, color: 'from-amber-500 to-orange-500', badge: 'NEW' },
    { label: 'Challenges', icon: Trophy, action: onGame, color: 'from-blue-500 to-cyan-500' },
    { label: 'Analytics', icon: BarChart3, action: onAnalytics, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <NavigationBar 
        userName={userName}
        currentPage="dashboard"
        onNavigate={(page) => {
          if (page === 'dashboard') return;
          if (page === 'analytics') onAnalytics();
          if (page === 'settings') onSettings();
        }}
        onLogout={onRestart}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
                  <p className="text-white/90 text-lg mb-4">Here's your wellness overview for today</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      <span className="font-semibold">{streak} Day Streak</span>
                    </div>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      <span className="font-semibold">Level {level}</span>
                    </div>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">{totalPoints} XP</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">
                  <div className={`px-6 py-3 bg-gradient-to-r ${getMoodColor(mood)} rounded-2xl shadow-lg`}>
                    <div className="text-sm text-white/80 mb-1">Today's Mood</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-3xl">{getMoodEmoji(mood)}</span>
                      {mood}
                    </div>
                  </div>
                  <Button 
                    onClick={onChatbot}
                    className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Talk to Wellness Coach
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                onClick={action.action}
                className="p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 bg-white group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative`}>
                  <action.icon className="w-7 h-7 text-white" />
                  {action.badge && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-lg">{action.label}</h3>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Your Progress
                </h2>
                <Button variant="outline" size="sm" onClick={onAchievements}>
                  <Trophy className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Level {level} Progress</span>
                    <span className="text-sm text-gray-600">{totalPoints % 100}/100 XP</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    {100 - (totalPoints % 100)} XP to Level {level + 1}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{totalPoints}</div>
                    <div className="text-xs text-gray-600">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{streak}</div>
                    <div className="text-xs text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{level}</div>
                    <div className="text-xs text-gray-600">Current Level</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Today's Habits */}
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  Today's Habits
                </h2>
                <Button variant="outline" size="sm" onClick={onCalendar}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
              </div>

              <div className="space-y-3">
                {habits.map((habit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold capitalize">{habit}</div>
                      <div className="text-sm text-gray-600">Completed today</div>
                    </div>
                  </div>
                ))}
                {customHabit && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{customHabit}</div>
                      <div className="text-sm text-gray-600">Custom habit</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Personalized Recommendations */}
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Personalized Recommendations
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-purple-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <rec.icon className={`w-5 h-5 ${rec.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Mood Note */}
            {moodNote && (
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Today's Note
                </h3>
                <p className="text-gray-700 italic">"{moodNote}"</p>
              </Card>
            )}

            {/* Mood Factors */}
            {moodFactors.length > 0 && (
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Mood Factors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {moodFactors.map((factor, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1"
                    >
                      {factor}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* More Features */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="font-bold mb-4">Explore More</h3>
              <div className="space-y-2">
                <Button
                  onClick={onInsights}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Insights
                </Button>
                <Button
                  onClick={onAchievements}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Achievements
                </Button>
                <Button
                  onClick={onSettings}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </Card>

            {/* Motivational Quote */}
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="text-center">
                <div className="text-4xl mb-3">💪</div>
                <p className="text-lg font-medium mb-2">"Small steps every day lead to big changes."</p>
                <p className="text-sm text-white/80">Keep up the great work!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
