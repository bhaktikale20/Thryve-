import { useState } from 'react';
import { Smile, Meh, Frown, Heart, Coffee, Moon, Droplets, Activity, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { PageWrapper } from '@/app/components/shared/PageWrapper';

interface MoodTrackingPageProps {
  userName: string;
  onNext: (mood: string, factors: string[], note: string) => void;
  onBack: () => void;
}

const moods = [
  { icon: Smile, label: 'Great', emoji: '😊', color: 'from-green-400 to-emerald-500', description: 'Feeling amazing!' },
  { icon: Heart, label: 'Good', emoji: '🙂', color: 'from-blue-400 to-cyan-500', description: 'Pretty good day' },
  { icon: Meh, label: 'Okay', emoji: '😐', color: 'from-yellow-400 to-amber-500', description: 'Just okay' },
  { icon: Frown, label: 'Low', emoji: '😔', color: 'from-orange-400 to-red-500', description: 'Need some care' },
];

const factors = [
  { icon: Coffee, label: 'Energy Level', value: 'energy', color: 'text-amber-600' },
  { icon: Moon, label: 'Sleep Quality', value: 'sleep', color: 'text-indigo-600' },
  { icon: Droplets, label: 'Hydration', value: 'hydration', color: 'text-blue-600' },
  { icon: Activity, label: 'Exercise', value: 'exercise', color: 'text-green-600' },
];

export function MoodTrackingPage({ userName, onNext, onBack }: MoodTrackingPageProps) {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev =>
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleNext = () => {
    if (selectedMood) {
      onNext(selectedMood, selectedFactors, note);
    }
  };

  return (
    <PageWrapper
      title={`Hey ${userName}! 👋`}
      subtitle="Let's check in on how you're feeling today"
      gradient="from-blue-50 via-purple-50 to-pink-50"
      maxWidth="lg"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
            1
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
            2
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
            3
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">Step 1 of 3: Mood Check-in</p>
      </div>

      <div className="space-y-8">
        {/* Mood Selection Section */}
        <Card className="p-8 bg-white shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <span className="text-3xl">💭</span>
              How are you feeling right now?
            </h2>
            <p className="text-gray-600">Select the mood that best describes how you feel</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`relative p-6 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                  selectedMood === mood.label
                    ? `border-transparent bg-gradient-to-br ${mood.color} text-white shadow-xl scale-105`
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {selectedMood === mood.label && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-5xl mb-3">{mood.emoji}</div>
                  <div className={`text-xl font-bold mb-1 ${selectedMood === mood.label ? 'text-white' : 'text-gray-800'}`}>
                    {mood.label}
                  </div>
                  <div className={`text-sm ${selectedMood === mood.label ? 'text-white/90' : 'text-gray-500'}`}>
                    {mood.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Factors Section */}
        {selectedMood && (
          <Card className="p-8 bg-white shadow-lg animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                What's affecting your mood?
              </h2>
              <p className="text-gray-600">Select all factors that apply (optional)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {factors.map((factor) => (
                <button
                  key={factor.value}
                  onClick={() => handleFactorToggle(factor.value)}
                  className={`p-5 rounded-xl border-2 transition-all text-left ${
                    selectedFactors.includes(factor.value)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${
                      selectedFactors.includes(factor.value) ? 'bg-purple-500' : 'bg-gray-100'
                    } flex items-center justify-center transition-colors`}>
                      <factor.icon className={`w-6 h-6 ${
                        selectedFactors.includes(factor.value) ? 'text-white' : factor.color
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{factor.label}</div>
                    </div>
                    {selectedFactors.includes(factor.value) && (
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Notes Section */}
        {selectedMood && (
          <Card className="p-8 bg-white shadow-lg animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                Any thoughts to share?
              </h2>
              <p className="text-gray-600">Write down what's on your mind (optional)</p>
            </div>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Today I feel this way because..."
              className="min-h-32 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Journaling can help you understand your emotions better
            </p>
          </Card>
        )}

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
            disabled={!selectedMood}
            className={`flex-1 px-8 py-6 text-lg ${
              selectedMood
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue to Habits
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
