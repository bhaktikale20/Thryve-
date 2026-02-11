import { useState, useEffect, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Play, Pause } from 'lucide-react';

interface BreathingBubbleGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export function BreathingBubbleGame({ onBack, onComplete }: BreathingBubbleGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  const breathingPattern = {
    inhale: 4000,
    hold: 4000,
    exhale: 4000,
  };

  useEffect(() => {
    if (isPlaying) {
      const bubbleInterval = setInterval(() => {
        const newBubble: Bubble = {
          id: Date.now(),
          x: Math.random() * 100,
          y: 100,
          size: 40 + Math.random() * 40,
          speed: 0.5 + Math.random() * 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setBubbles(prev => [...prev, newBubble]);
      }, 2000);

      return () => clearInterval(bubbleInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const animationInterval = setInterval(() => {
        setBubbles(prev => 
          prev
            .map(bubble => ({ ...bubble, y: bubble.y - bubble.speed }))
            .filter(bubble => bubble.y > -20)
        );
      }, 50);

      return () => clearInterval(animationInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const phaseInterval = setInterval(() => {
        setPhaseProgress(prev => {
          const newProgress = prev + (100 / (breathingPattern[breathPhase] / 100));
          if (newProgress >= 100) {
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
            } else {
              setBreathPhase('inhale');
              setBreathCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 5) {
                  setIsPlaying(false);
                  setTimeout(() => onComplete(score), 1000);
                }
                return newCount;
              });
            }
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(phaseInterval);
    }
  }, [isPlaying, breathPhase, score]);

  const handleBubbleClick = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 10);
  };

  const getPhaseInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return '🌬️ Breathe In...';
      case 'hold':
        return '⏸️ Hold...';
      case 'exhale':
        return '💨 Breathe Out...';
    }
  };

  const getPhaseColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'from-blue-400 to-cyan-400';
      case 'hold':
        return 'from-purple-400 to-pink-400';
      case 'exhale':
        return 'from-green-400 to-emerald-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) {
                setBreathCount(0);
                setScore(0);
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">💭 Breathing Bubbles 💭</h2>
          <p className="text-gray-600">Pop bubbles while following your breath</p>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Breaths</p>
            <p className="text-2xl font-bold text-purple-600">{breathCount}/5</p>
          </Card>
        </div>

        {/* Breathing Indicator */}
        <Card className={`p-6 mb-6 bg-gradient-to-r ${getPhaseColor()} text-white text-center`}>
          <h3 className="text-2xl font-bold mb-2">{getPhaseInstruction()}</h3>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-100"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </Card>

        {/* Bubble Canvas */}
        <Card 
          ref={canvasRef}
          className="relative h-96 bg-gradient-to-b from-blue-100 to-cyan-50 overflow-hidden"
        >
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">Click Start to begin</p>
                <p className="text-sm text-gray-500">Follow the breathing pattern and pop bubbles to score points</p>
              </div>
            </div>
          )}
          
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              onClick={() => handleBubbleClick(bubble.id)}
              className="absolute rounded-full cursor-pointer transition-all hover:scale-110 animate-pulse"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                backgroundColor: bubble.color,
                opacity: 0.7,
              }}
            />
          ))}
        </Card>

        <Card className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Pop bubbles gently while maintaining your breathing rhythm. 
            Complete 5 breath cycles to finish!
          </p>
        </Card>
      </div>
    </div>
  );
}
