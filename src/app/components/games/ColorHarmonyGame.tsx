import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface ColorHarmonyGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function ColorHarmonyGame({ onBack, onComplete }: ColorHarmonyGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const colors = [
    { name: '🔴 Red', value: '#ef4444' },
    { name: '🔵 Blue', value: '#3b82f6' },
    { name: '🟢 Green', value: '#10b981' },
    { name: '🟡 Yellow', value: '#f59e0b' },
    { name: '🟣 Purple', value: '#8b5cf6' },
    { name: '🟠 Orange', value: '#f97316' },
    { name: '🩷 Pink', value: '#ec4899' },
    { name: '🩵 Cyan', value: '#06b6d4' },
  ];

  const initializeGame = () => {
    const gridSize = 5;
    const numColors = Math.min(3 + level, 6);
    const selectedColors = colors.slice(0, numColors);
    
    const newGrid = Array(gridSize).fill(null).map(() =>
      Array(gridSize).fill(null).map(() => 
        selectedColors[Math.floor(Math.random() * selectedColors.length)].value
      )
    );

    setGrid(newGrid);
    setTargetColor(selectedColors[Math.floor(Math.random() * selectedColors.length)].value);
    setIsPlaying(true);
    setTimeLeft(30);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsComplete(true);
      setTimeout(() => onComplete(score), 1500);
    }
  }, [timeLeft, isPlaying, score]);

  const handleCellClick = (row: number, col: number) => {
    if (!isPlaying) return;

    if (grid[row][col] === targetColor) {
      setScore(prev => prev + 10);
      
      // Replace clicked cell with new color
      const newGrid = [...grid];
      const availableColors = colors.slice(0, Math.min(3 + level, 6));
      newGrid[row][col] = availableColors[Math.floor(Math.random() * availableColors.length)].value;
      setGrid(newGrid);

      // Occasionally change target
      if (Math.random() > 0.7) {
        setTargetColor(availableColors[Math.floor(Math.random() * availableColors.length)].value);
      }

      // Level up
      if (score > 0 && score % 50 === 0) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 5);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const getColorName = (colorValue: string) => {
    return colors.find(c => c.value === colorValue)?.name || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={initializeGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            {isPlaying ? 'Restart' : 'Start Game'}
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🎨 Color Harmony 🎨</h2>
          <p className="text-gray-600">Click all the matching colors!</p>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-purple-600">{score}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Level</p>
            <p className="text-2xl font-bold text-pink-600">{level}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Time</p>
            <p className="text-2xl font-bold text-orange-600">{timeLeft}s</p>
          </Card>
        </div>

        {isPlaying && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center">
            <p className="text-sm mb-1">Find this color:</p>
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg border-4 border-white shadow-lg"
                style={{ backgroundColor: targetColor }}
              />
              <p className="text-2xl font-bold">{getColorName(targetColor)}</p>
            </div>
          </Card>
        )}

        <div className="flex justify-center mb-6">
          <div className="inline-grid grid-cols-5 gap-3 p-4 bg-white rounded-xl shadow-lg">
            {grid.map((row, rowIndex) => (
              row.map((color, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className="w-16 h-16 rounded-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 border-2 border-gray-200"
                  style={{ backgroundColor: color }}
                  disabled={!isPlaying}
                />
              ))
            ))}
          </div>
        </div>

        {!isPlaying && !isComplete && (
          <Card className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 text-center">
            <p className="text-lg mb-2">Click <strong>Start Game</strong> to begin!</p>
            <p className="text-sm text-gray-600">
              Click cells matching the target color to score points. Wrong clicks cost 5 points!
            </p>
          </Card>
        )}

        {isComplete && (
          <Card className="p-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center animate-bounce">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">Time's Up! 🎉</h3>
            <p>Final Score: {score} points</p>
            <p>Level Reached: {level}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
