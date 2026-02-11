import { TrendingUp, Calendar, Smile, Target, Brain, BarChart3 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';

interface InsightsPageProps {
  streak: number;
  totalCheckIns: number;
  favoriteMood: string;
  mostCompletedHabit: string;
  onBack: () => void;
}

export function InsightsPage({
  streak,
  totalCheckIns,
  favoriteMood,
  mostCompletedHabit,
  onBack,
}: InsightsPageProps) {
  const weeklyMoodData = [
    { day: 'Mon', mood: 'Great', score: 90 },
    { day: 'Tue', mood: 'Good', score: 75 },
    { day: 'Wed', mood: 'Great', score: 85 },
    { day: 'Thu', mood: 'Okay', score: 60 },
    { day: 'Fri', mood: 'Good', score: 80 },
    { day: 'Sat', mood: 'Great', score: 95 },
    { day: 'Sun', mood: 'Great', score: 90 },
  ];

  const habitCompletion = [
    { habit: 'Exercise', completion: 85, color: 'bg-red-500' },
    { habit: 'Water', completion: 92, color: 'bg-blue-500' },
    { habit: 'Meditation', completion: 78, color: 'bg-purple-500' },
    { habit: 'Sleep', completion: 88, color: 'bg-indigo-500' },
    { habit: 'Reading', completion: 65, color: 'bg-green-500' },
  ];

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'Great': return '😄';
      case 'Good': return '😊';
      case 'Okay': return '😐';
      case 'Low': return '😔';
      default: return '😊';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl">Wellness Insights</h1>
          </div>
          <p className="text-gray-600">Track your progress and discover patterns</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                🔥
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-500">{streak}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Check-ins</p>
                <p className="text-2xl font-bold text-blue-500">{totalCheckIns}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Smile className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Most Common</p>
                <p className="text-xl font-bold text-green-500">{favoriteMood}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-10 h-10 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Top Habit</p>
                <p className="text-lg font-bold text-purple-500">{mostCompletedHabit}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Mood Trend */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Weekly Mood Trend</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyMoodData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{data.day}</div>
                <div className="relative h-32 bg-gray-100 rounded-lg flex items-end justify-center overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all"
                    style={{ height: `${data.score}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">{getMoodEmoji(data.mood)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{data.score}%</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Habit Completion Rates */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Habit Completion Rates</h2>
          </div>
          <div className="space-y-4">
            {habitCompletion.map((habit, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{habit.habit}</span>
                  <span className="text-sm text-gray-600">{habit.completion}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${habit.color} transition-all`}
                    style={{ width: `${habit.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights & Tips */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-1">You're Doing Great!</h3>
                <p className="text-sm text-green-800">
                  Your mood has been consistently positive this week. Keep up the excellent work with your habits!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Try Meditation</h3>
                <p className="text-sm text-purple-800">
                  Adding meditation to your routine could help boost your completion rate even further.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button onClick={onBack} variant="outline" className="w-full md:w-auto">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
