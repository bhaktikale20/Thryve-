import { Calendar as CalendarIcon, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Calendar } from '@/app/components/ui/calendar';
import { useState } from 'react';

interface HabitEntry {
  date: Date;
  habits: string[];
  mood: string;
}

interface CalendarPageProps {
  habitEntries: HabitEntry[];
  onBack: () => void;
}

export function CalendarPage({ habitEntries, onBack }: CalendarPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEntriesForDate = (date: Date | undefined) => {
    if (!date) return null;
    return habitEntries.find(
      entry => entry.date.toDateString() === date.toDateString()
    );
  };

  const selectedEntry = getEntriesForDate(selectedDate);

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const hasEntry = habitEntries.some(
        entry => entry.date.toDateString() === checkDate.toDateString()
      );
      if (hasEntry) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'Great': return '😄';
      case 'Good': return '😊';
      case 'Okay': return '😐';
      case 'Low': return '😔';
      default: return '😊';
    }
  };

  const streak = calculateStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl">Habit Calendar</h1>
          </div>
          <p className="text-gray-600">Track your progress and build consistency</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                🔥
              </div>
              <h3>Current Streak</h3>
            </div>
            <p className="text-3xl font-bold text-orange-500">{streak} days</p>
            <p className="text-sm text-gray-600 mt-1">Keep it going!</p>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <h3>Total Check-ins</h3>
            </div>
            <p className="text-3xl font-bold text-green-500">{habitEntries.length}</p>
            <p className="text-sm text-gray-600 mt-1">Days tracked</p>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-10 h-10 text-purple-500" />
              <h3>Completion Rate</h3>
            </div>
            <p className="text-3xl font-bold text-purple-500">
              {habitEntries.length > 0 ? Math.round((streak / habitEntries.length) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Your Journey</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEntry: habitEntries.map(e => e.date),
              }}
              modifiersStyles={{
                hasEntry: {
                  backgroundColor: '#c084fc',
                  color: 'white',
                  borderRadius: '50%',
                },
              }}
            />
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                <span>Has entry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <span>No entry</span>
              </div>
            </div>
          </Card>

          {/* Selected Date Details */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>

            {selectedEntry ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Mood</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getMoodEmoji(selectedEntry.mood)}</span>
                    <span className="text-lg">{selectedEntry.mood}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Completed Habits</h4>
                  <div className="space-y-2">
                    {selectedEntry.habits.map((habit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm capitalize">{habit.replace(/_/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Completed
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Circle className="w-16 h-16 mb-4" />
                <p>No entry for this date</p>
                <p className="text-sm mt-2">Start tracking to see your progress here</p>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6">
          <Button onClick={onBack} variant="outline" className="w-full md:w-auto">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
