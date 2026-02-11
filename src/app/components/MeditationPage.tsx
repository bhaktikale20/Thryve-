import { useState, useEffect } from 'react';
import { Brain, Play, Pause, RotateCcw, Wind, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';

interface MeditationPageProps {
  onComplete: (duration: number, type: string) => void;
  onBack: () => void;
}

const meditationTypes = [
  {
    id: 'breathing',
    name: 'Breathing Exercise',
    duration: 5,
    icon: Wind,
    color: 'text-blue-500',
    description: 'Calm your mind with focused breathing',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    duration: 10,
    icon: Brain,
    color: 'text-purple-500',
    description: 'Be present in the moment',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    duration: 7,
    icon: Heart,
    color: 'text-pink-500',
    description: 'Reflect on what you\'re thankful for',
  },
  {
    id: 'relaxation',
    name: 'Deep Relaxation',
    duration: 15,
    icon: Sparkles,
    color: 'text-green-500',
    description: 'Release tension and stress',
  },
];

export function MeditationPage({ onComplete, onBack }: MeditationPageProps) {
  const [selectedType, setSelectedType] = useState(meditationTypes[0]);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedType.duration * 60);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  useEffect(() => {
    setTimeLeft(selectedType.duration * 60);
  }, [selectedType]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onComplete(selectedType.duration, selectedType.id);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, selectedType, onComplete]);

  // Breathing animation cycle
  useEffect(() => {
    if (isActive && selectedType.id === 'breathing') {
      const cycle = setInterval(() => {
        setBreathingCount(prev => {
          if (prev === 0) {
            setBreathingPhase(current => {
              if (current === 'inhale') return 'hold';
              if (current === 'hold') return 'exhale';
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(cycle);
    }
  }, [isActive, selectedType.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedType.duration * 60 - timeLeft) / (selectedType.duration * 60)) * 100;

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(selectedType.duration * 60);
    setBreathingPhase('inhale');
    setBreathingCount(4);
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl">Meditation & Mindfulness</h1>
          </div>
          <p className="text-gray-600">Take a moment to center yourself and find peace</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Meditation Types */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-3">Choose Your Practice</h3>
            {meditationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type);
                  handleReset();
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedType.id === type.id
                    ? 'bg-purple-50 border-purple-500 shadow-md'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <type.icon className={`w-5 h-5 ${type.color}`} />
                  <span className="font-medium">{type.name}</span>
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
                <p className="text-xs text-gray-500 mt-2">{type.duration} minutes</p>
              </button>
            ))}
          </div>

          {/* Meditation Timer */}
          <div className="md:col-span-2">
            <Card className="p-8 bg-white shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl mb-2">{selectedType.name}</h2>
                <p className="text-gray-600">{selectedType.description}</p>
              </div>

              {/* Breathing Animation */}
              {selectedType.id === 'breathing' && isActive && (
                <div className="mb-8 flex flex-col items-center">
                  <div 
                    className={`w-32 h-32 rounded-full bg-gradient-to-br transition-all duration-1000 flex items-center justify-center ${
                      breathingPhase === 'inhale' 
                        ? 'from-blue-400 to-purple-400 scale-125' 
                        : breathingPhase === 'hold'
                        ? 'from-purple-400 to-pink-400 scale-125'
                        : 'from-pink-400 to-blue-300 scale-75'
                    }`}
                  >
                    <span className="text-white text-4xl font-bold">{breathingCount}</span>
                  </div>
                  <p className="text-xl mt-4 text-gray-700">{getBreathingInstruction()}</p>
                </div>
              )}

              {/* Timer Display */}
              <div className="mb-6">
                <div className="text-6xl font-bold text-center mb-4 text-gray-800">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center">
                {!isActive ? (
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    size="lg"
                    variant="outline"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Meditation Tips */}
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-900">💡 Tips for Your Practice</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Find a quiet, comfortable space</li>
                  <li>• Sit with your back straight but relaxed</li>
                  <li>• Close your eyes or soften your gaze</li>
                  <li>• Let thoughts come and go without judgment</li>
                </ul>
              </div>
            </Card>

            <div className="mt-6 flex gap-4">
              <Button onClick={onBack} variant="outline" className="flex-1">
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => onComplete(selectedType.duration, selectedType.id)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Complete Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
