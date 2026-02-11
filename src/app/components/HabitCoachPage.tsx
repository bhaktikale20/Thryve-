import { useState } from 'react';
import { Activity, Droplets, Moon, Book, Apple, Coffee, Brain, Heart, ArrowRight, ArrowLeft, Plus, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { PageWrapper } from '@/app/components/shared/PageWrapper';

interface HabitCoachPageProps {
  onNext: (habits: string[], customHabit?: string) => void;
  onBack: () => void;
}

const suggestedHabits = [
  { icon: Activity, label: 'Exercise', value: 'exercise', color: 'from-green-400 to-emerald-500', benefit: 'Boost energy & mood' },
  { icon: Droplets, label: 'Drink Water', value: 'water', color: 'from-blue-400 to-cyan-500', benefit: 'Stay hydrated' },
  { icon: Moon, label: 'Sleep 8hrs', value: 'sleep', color: 'from-indigo-400 to-purple-500', benefit: 'Better rest' },
  { icon: Book, label: 'Read', value: 'read', color: 'from-amber-400 to-orange-500', benefit: 'Expand mind' },
  { icon: Apple, label: 'Healthy Eating', value: 'eat', color: 'from-red-400 to-pink-500', benefit: 'Fuel your body' },
  { icon: Brain, label: 'Meditation', value: 'meditation', color: 'from-purple-400 to-pink-500', benefit: 'Reduce stress' },
  { icon: Coffee, label: 'Morning Routine', value: 'morning', color: 'from-yellow-400 to-amber-500', benefit: 'Start strong' },
  { icon: Heart, label: 'Gratitude', value: 'gratitude', color: 'from-rose-400 to-pink-500', benefit: 'Stay positive' },
];

export function HabitCoachPage({ onNext, onBack }: HabitCoachPageProps) {
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [customHabit, setCustomHabit] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleHabitToggle = (habit: string) => {
    setSelectedHabits(prev =>
      prev.includes(habit)
        ? prev.filter(h => h !== habit)
        : [...prev, habit]
    );
  };

  const handleNext = () => {
    if (selectedHabits.length > 0) {
      onNext(selectedHabits, customHabit || undefined);
    }
  };

  return (
    <PageWrapper
      title="Build Your Wellness Habits 🎯"
      subtitle="Choose healthy habits you want to track and build into your daily routine"
      gradient="from-green-50 via-blue-50 to-purple-50"
      maxWidth="lg"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
            2
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
            3
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">Step 2 of 3: Habit Selection</p>
      </div>

      <div className="space-y-8">
        {/* Selection Info */}
        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Pro Tip</h3>
              <p className="text-gray-700">
                Start with 3-5 habits for best results. You can always add more later!
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium">
                {selectedHabits.length} habits selected
              </div>
            </div>
          </div>
        </Card>

        {/* Habits Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Choose Your Habits
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedHabits.map((habit) => (
              <button
                key={habit.value}
                onClick={() => handleHabitToggle(habit.value)}
                className={`relative p-6 rounded-2xl border-3 transition-all transform hover:scale-105 text-left ${
                  selectedHabits.includes(habit.value)
                    ? `border-transparent bg-gradient-to-br ${habit.color} text-white shadow-xl scale-105`
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {selectedHabits.includes(habit.value) && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-xl ${
                  selectedHabits.includes(habit.value) ? 'bg-white/20' : 'bg-gray-100'
                } flex items-center justify-center mb-4`}>
                  <habit.icon className={`w-7 h-7 ${
                    selectedHabits.includes(habit.value) ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className={`text-lg font-bold mb-1 ${
                  selectedHabits.includes(habit.value) ? 'text-white' : 'text-gray-800'
                }`}>
                  {habit.label}
                </div>
                
                <div className={`text-sm ${
                  selectedHabits.includes(habit.value) ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {habit.benefit}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Habit */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-500" />
            Add Your Own Habit
          </h3>
          
          {!showCustomInput ? (
            <Button
              onClick={() => setShowCustomInput(true)}
              variant="outline"
              className="w-full py-6 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Custom Habit
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                type="text"
                value={customHabit}
                onChange={(e) => setCustomHabit(e.target.value)}
                placeholder="e.g., Practice piano, Call family, Journal..."
                className="text-lg border-2 border-purple-300 focus:border-purple-500 py-3"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (customHabit.trim()) {
                      setSelectedHabits(prev => [...prev, customHabit]);
                      setCustomHabit('');
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={!customHabit.trim()}
                >
                  Add Habit
                </Button>
                <Button
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomHabit('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {customHabit && !showCustomInput && (
            <div className="mt-3 p-4 bg-purple-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{customHabit}</span>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          )}
        </Card>

        {/* Why Track Habits */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">🌟</span>
            Why Track Habits?
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-600 mb-1">📊 Accountability</div>
              <p className="text-gray-600">Visual progress keeps you motivated</p>
            </div>
            <div>
              <div className="font-semibold text-purple-600 mb-1">🎯 Consistency</div>
              <p className="text-gray-600">Build lasting positive changes</p>
            </div>
            <div>
              <div className="font-semibold text-pink-600 mb-1">💪 Growth</div>
              <p className="text-gray-600">See your wellness journey unfold</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-lg border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedHabits.length === 0}
            className={`flex-1 px-8 py-6 text-lg ${
              selectedHabits.length > 0
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue to Wellness Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
