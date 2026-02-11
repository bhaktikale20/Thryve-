import { useState } from 'react';
import { Heart, Activity, Brain, Users, ArrowRight, ArrowLeft, CheckCircle, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Slider } from '@/app/components/ui/slider';
import { PageWrapper } from '@/app/components/shared/PageWrapper';

interface PersonalizedWellnessPageProps {
  onNext: (preferences: WellnessPreferences) => void;
  onBack: () => void;
}

export interface WellnessPreferences {
  focus: string;
  activityLevel: number;
  sleepHours: number;
  stressLevel: number;
}

const focusAreas = [
  { 
    value: 'physical', 
    label: 'Physical Health', 
    icon: Activity, 
    emoji: '💪',
    color: 'from-green-400 to-emerald-500',
    description: 'Focus on fitness, nutrition, and physical wellbeing' 
  },
  { 
    value: 'mental', 
    label: 'Mental Wellbeing', 
    icon: Brain, 
    emoji: '🧠',
    color: 'from-purple-400 to-pink-500',
    description: 'Improve mindfulness, reduce stress, and mental clarity' 
  },
  { 
    value: 'social', 
    label: 'Social Connection', 
    icon: Users, 
    emoji: '👥',
    color: 'from-blue-400 to-cyan-500',
    description: 'Build relationships and community connections' 
  },
  { 
    value: 'balance', 
    label: 'Life Balance', 
    icon: Heart, 
    emoji: '⚖️',
    color: 'from-pink-400 to-rose-500',
    description: 'Achieve work-life harmony and overall balance' 
  },
];

export function PersonalizedWellnessPage({ onNext, onBack }: PersonalizedWellnessPageProps) {
  const [focus, setFocus] = useState('');
  const [activityLevel, setActivityLevel] = useState([3]);
  const [sleepHours, setSleepHours] = useState([7]);
  const [stressLevel, setStressLevel] = useState([5]);

  const handleNext = () => {
    if (focus) {
      onNext({
        focus,
        activityLevel: activityLevel[0],
        sleepHours: sleepHours[0],
        stressLevel: stressLevel[0],
      });
    }
  };

  const getActivityLabel = (value: number) => {
    if (value <= 2) return 'Low - Mostly sedentary';
    if (value <= 4) return 'Moderate - Some activity';
    if (value <= 6) return 'Active - Regular exercise';
    return 'Very Active - Daily intense workouts';
  };

  const getStressLabel = (value: number) => {
    if (value <= 3) return 'Low - Generally calm';
    if (value <= 6) return 'Moderate - Manageable stress';
    return 'High - Often stressed';
  };

  return (
    <PageWrapper
      title="Personalize Your Wellness Plan 🌟"
      subtitle="Help us understand your wellness goals and current lifestyle"
      gradient="from-purple-50 via-pink-50 to-rose-50"
      maxWidth="lg"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="w-16 h-1 bg-green-500 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
            3
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">Step 3 of 3: Wellness Preferences</p>
      </div>

      <div className="space-y-8">
        {/* Focus Area Selection */}
        <Card className="p-8 bg-white shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Target className="w-7 h-7 text-purple-500" />
              What's your main wellness focus?
            </h2>
            <p className="text-gray-600">Choose your primary area of improvement</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <button
                key={area.value}
                onClick={() => setFocus(area.value)}
                className={`relative p-6 rounded-2xl border-3 transition-all transform hover:scale-105 text-left ${
                  focus === area.value
                    ? `border-transparent bg-gradient-to-br ${area.color} text-white shadow-xl scale-105`
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {focus === area.value && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{area.emoji}</div>
                  <div className="flex-1">
                    <div className={`text-lg font-bold mb-1 ${
                      focus === area.value ? 'text-white' : 'text-gray-800'
                    }`}>
                      {area.label}
                    </div>
                    <div className={`text-sm ${
                      focus === area.value ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {area.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Activity Level */}
        {focus && (
          <Card className="p-8 bg-white shadow-lg animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Zap className="w-7 h-7 text-green-500" />
                Current Activity Level
              </h2>
              <p className="text-gray-600">How physically active are you?</p>
            </div>

            <div className="space-y-4">
              <Slider
                value={activityLevel}
                onValueChange={setActivityLevel}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Less Active</span>
                <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-semibold">
                  {activityLevel[0]}/10 - {getActivityLabel(activityLevel[0])}
                </div>
                <span className="text-sm text-gray-500">Very Active</span>
              </div>
            </div>
          </Card>
        )}

        {/* Sleep Hours */}
        {focus && (
          <Card className="p-8 bg-white shadow-lg animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">😴</span>
                Average Sleep Hours
              </h2>
              <p className="text-gray-600">How many hours do you typically sleep per night?</p>
            </div>

            <div className="space-y-4">
              <Slider
                value={sleepHours}
                onValueChange={setSleepHours}
                min={4}
                max={12}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">4 hours</span>
                <div className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full font-semibold">
                  {sleepHours[0]} hours per night
                </div>
                <span className="text-sm text-gray-500">12 hours</span>
              </div>
              {sleepHours[0] < 7 && (
                <p className="text-sm text-amber-600 flex items-center gap-2">
                  💡 Most adults need 7-9 hours for optimal health
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Stress Level */}
        {focus && (
          <Card className="p-8 bg-white shadow-lg animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-orange-500" />
                Current Stress Level
              </h2>
              <p className="text-gray-600">Rate your typical stress level</p>
            </div>

            <div className="space-y-4">
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Low Stress</span>
                <div className={`px-4 py-2 text-white rounded-full font-semibold ${
                  stressLevel[0] <= 3 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  stressLevel[0] <= 6 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                  'bg-gradient-to-r from-orange-400 to-red-500'
                }`}>
                  {stressLevel[0]}/10 - {getStressLabel(stressLevel[0])}
                </div>
                <span className="text-sm text-gray-500">High Stress</span>
              </div>
            </div>
          </Card>
        )}

        {/* Summary Card */}
        {focus && (
          <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 animate-fade-in">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Your Wellness Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Primary Focus</div>
                <div className="font-bold text-purple-600">
                  {focusAreas.find(a => a.value === focus)?.label}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Activity Level</div>
                <div className="font-bold text-green-600">{activityLevel[0]}/10</div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Sleep Hours</div>
                <div className="font-bold text-indigo-600">{sleepHours[0]} hrs</div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Stress Level</div>
                <div className="font-bold text-orange-600">{stressLevel[0]}/10</div>
              </div>
            </div>
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
            disabled={!focus}
            className={`flex-1 px-8 py-6 text-lg ${
              focus
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Complete Setup & Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
