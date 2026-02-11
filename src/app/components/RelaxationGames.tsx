import { useState } from 'react';
import { Brain, Sparkles, Palette, Wind, Flower, Smile, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { MemoryMatchGame } from '@/app/components/games/MemoryMatchGame';
import { BreathingBubbleGame } from '@/app/components/games/BreathingBubbleGame';
import { ColorHarmonyGame } from '@/app/components/games/ColorHarmonyGame';
import { MindfulMazeGame } from '@/app/components/games/MindfulMazeGame';
import { ZenGardenGame } from '@/app/components/games/ZenGardenGame';
import { WordCalmGame } from '@/app/components/games/WordCalmGame';

interface RelaxationGamesProps {
  onBack: () => void;
  onGameComplete: (points: number) => void;
}

type GameType = 'menu' | 'memory' | 'breathing' | 'color' | 'maze' | 'zen' | 'word';

export function RelaxationGames({ onBack, onGameComplete }: RelaxationGamesProps) {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');

  const games = [
    {
      id: 'memory' as GameType,
      name: 'Memory Match',
      description: 'Match peaceful nature pairs to calm your mind',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Easy',
    },
    {
      id: 'breathing' as GameType,
      name: 'Breathing Bubbles',
      description: 'Pop bubbles in rhythm with your breath',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Easy',
    },
    {
      id: 'color' as GameType,
      name: 'Color Harmony',
      description: 'Match colors to create beautiful patterns',
      icon: Palette,
      color: 'from-pink-500 to-orange-500',
      difficulty: 'Medium',
    },
    {
      id: 'maze' as GameType,
      name: 'Mindful Maze',
      description: 'Navigate peaceful paths at your own pace',
      icon: Sparkles,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Medium',
    },
    {
      id: 'zen' as GameType,
      name: 'Zen Garden',
      description: 'Create patterns in sand for meditation',
      icon: Flower,
      color: 'from-amber-500 to-yellow-500',
      difficulty: 'Relaxing',
    },
    {
      id: 'word' as GameType,
      name: 'Word Calm',
      description: 'Find positive words in a peaceful grid',
      icon: Smile,
      color: 'from-indigo-500 to-purple-500',
      difficulty: 'Easy',
    },
  ];

  const handleGameComplete = (points: number) => {
    onGameComplete(points);
    setCurrentGame('menu');
  };

  if (currentGame === 'memory') {
    return <MemoryMatchGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  if (currentGame === 'breathing') {
    return <BreathingBubbleGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  if (currentGame === 'color') {
    return <ColorHarmonyGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  if (currentGame === 'maze') {
    return <MindfulMazeGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  if (currentGame === 'zen') {
    return <ZenGardenGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  if (currentGame === 'word') {
    return <WordCalmGame onBack={() => setCurrentGame('menu')} onComplete={handleGameComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Relaxation Games
            </h1>
            <p className="text-gray-600 text-lg">
              Take a break and relax your mind with these calming activities
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setCurrentGame(game.id)}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <game.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{game.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {game.difficulty}
                </span>
                <span className="text-sm text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                  Play →
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Benefits of Relaxation Games
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-1">🧠 Mental Clarity</h4>
              <p className="text-sm text-gray-600">Improve focus and reduce mental fatigue</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">😌 Stress Relief</h4>
              <p className="text-sm text-gray-600">Lower cortisol and promote calmness</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🎯 Mindfulness</h4>
              <p className="text-sm text-gray-600">Practice being present in the moment</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
