import { TrendingUp, Calendar, Target, Heart, Award, Activity, Brain } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  // Mood data over time
  const moodData = [
    { date: 'Mon', mood: 85, energy: 70, stress: 30 },
    { date: 'Tue', mood: 75, energy: 65, stress: 45 },
    { date: 'Wed', mood: 90, energy: 80, stress: 25 },
    { date: 'Thu', mood: 70, energy: 60, stress: 50 },
    { date: 'Fri', mood: 85, energy: 75, stress: 35 },
    { date: 'Sat', mood: 95, energy: 90, stress: 20 },
    { date: 'Sun', mood: 88, energy: 85, stress: 25 },
  ];

  // Habit completion data
  const habitData = [
    { habit: 'Exercise', completed: 18, total: 21, percentage: 86 },
    { habit: 'Water', completed: 20, total: 21, percentage: 95 },
    { habit: 'Meditation', completed: 15, total: 21, percentage: 71 },
    { habit: 'Sleep', completed: 19, total: 21, percentage: 90 },
    { habit: 'Reading', completed: 12, total: 21, percentage: 57 },
    { habit: 'Nutrition', completed: 17, total: 21, percentage: 81 },
  ];

  // Wellness score components
  const wellnessComponents = [
    { category: 'Physical', score: 85 },
    { category: 'Mental', score: 78 },
    { category: 'Social', score: 72 },
    { category: 'Emotional', score: 88 },
    { category: 'Spiritual', score: 65 },
  ];

  // Monthly progress
  const monthlyData = [
    { week: 'Week 1', habits: 12, meditation: 3, mood: 75 },
    { week: 'Week 2', habits: 15, meditation: 4, mood: 80 },
    { week: 'Week 3', habits: 18, meditation: 5, mood: 85 },
    { week: 'Week 4', habits: 20, meditation: 6, mood: 88 },
  ];

  // Mood distribution
  const moodDistribution = [
    { mood: 'Great', value: 45, color: '#10b981' },
    { mood: 'Good', value: 30, color: '#3b82f6' },
    { mood: 'Okay', value: 20, color: '#f59e0b' },
    { mood: 'Low', value: 5, color: '#ef4444' },
  ];

  // Calculate overall wellness score
  const overallWellnessScore = Math.round(
    wellnessComponents.reduce((acc, item) => acc + item.score, 0) / wellnessComponents.length
  );

  // Calculate habit completion average
  const habitCompletionAvg = Math.round(
    habitData.reduce((acc, item) => acc + item.percentage, 0) / habitData.length
  );

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-3xl">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive insights into your wellness journey</p>
              </div>
            </div>
            <Button onClick={onBack} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8" />
              <span className="text-3xl font-bold">{overallWellnessScore}</span>
            </div>
            <h3 className="text-sm opacity-90">Wellness Score</h3>
            <p className="text-xs opacity-75 mt-1">+5 from last week</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8" />
              <span className="text-3xl font-bold">{habitCompletionAvg}%</span>
            </div>
            <h3 className="text-sm opacity-90">Habit Completion</h3>
            <p className="text-xs opacity-75 mt-1">Above target!</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8" />
              <span className="text-3xl font-bold">87%</span>
            </div>
            <h3 className="text-sm opacity-90">Avg Mood Score</h3>
            <p className="text-xs opacity-75 mt-1">Excellent!</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-8 h-8" />
              <span className="text-3xl font-bold">24</span>
            </div>
            <h3 className="text-sm opacity-90">Meditation Sessions</h3>
            <p className="text-xs opacity-75 mt-1">This month</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mood">Mood Trends</TabsTrigger>
            <TabsTrigger value="habits">Habits</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Score</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mood Trend Chart */}
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  Weekly Mood & Energy Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="mood" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                    <Area type="monotone" dataKey="energy" stackId="2" stroke="#3b82f6" fill="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* Mood Distribution */}
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Mood Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ mood, value }) => `${mood}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {moodDistribution.map((item) => (
                    <div key={item.mood} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.mood}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Monthly Progress */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Monthly Progress Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="habits" fill="#8b5cf6" name="Habits Completed" />
                  <Bar dataKey="meditation" fill="#10b981" name="Meditation Sessions" />
                  <Bar dataKey="mood" fill="#3b82f6" name="Avg Mood Score" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Mood Trends Tab */}
          <TabsContent value="mood" className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Mood, Energy & Stress Levels</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood Score" />
                  <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy Level" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress Level" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-green-50 border-2 border-green-200">
                <h4 className="font-semibold mb-2 text-green-900">Best Day</h4>
                <p className="text-2xl font-bold text-green-600">Saturday</p>
                <p className="text-sm text-green-700 mt-1">Mood Score: 95</p>
              </Card>
              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-900">Average Mood</h4>
                <p className="text-2xl font-bold text-blue-600">84.7</p>
                <p className="text-sm text-blue-700 mt-1">Above baseline</p>
              </Card>
              <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                <h4 className="font-semibold mb-2 text-purple-900">Improvement</h4>
                <p className="text-2xl font-bold text-purple-600">+12%</p>
                <p className="text-sm text-purple-700 mt-1">From last week</p>
              </Card>
            </div>
          </TabsContent>

          {/* Habits Tab */}
          <TabsContent value="habits" className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Habit Completion Rates</h3>
              <div className="space-y-6">
                {habitData.map((habit, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">{habit.habit}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">{habit.percentage}%</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({habit.completed}/{habit.total})
                        </span>
                      </div>
                    </div>
                    <Progress value={habit.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Habit Completion Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={habitData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="habit" type="category" />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Wellness Score Tab */}
          <TabsContent value="wellness" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Wellness Components</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={wellnessComponents}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Overall Wellness Score</h3>
                <div className="text-center mb-6">
                  <div className="text-7xl font-bold mb-2">{overallWellnessScore}</div>
                  <p className="text-lg opacity-90">Out of 100</p>
                </div>
                <div className="space-y-3">
                  {wellnessComponents.map((component, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{component.category}</span>
                      <span className="font-bold">{component.score}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Wellness Score Breakdown</h3>
              <div className="space-y-4">
                {wellnessComponents.map((component, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{component.category} Health</span>
                      <span className="text-lg font-bold">{component.score}/100</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                        style={{ width: `${component.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
