import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, ArrowLeftIcon, Trophy } from 'lucide-react';

interface MindfulMazeGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Position {
  x: number;
  y: number;
}

export function MindfulMazeGame({ onBack, onComplete }: MindfulMazeGameProps) {
  const mazeSize = 8;
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [goalPos] = useState<Position>({ x: mazeSize - 1, y: mazeSize - 1 });
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [collectibles, setCollectibles] = useState<Set<string>>(new Set());
  const [collected, setCollected] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializeMaze = () => {
    const newWalls = new Set<string>();
    const newCollectibles = new Set<string>();

    // Generate random walls
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * mazeSize);
      const y = Math.floor(Math.random() * mazeSize);
      if ((x !== 0 || y !== 0) && (x !== mazeSize - 1 || y !== mazeSize - 1)) {
        newWalls.add(`${x},${y}`);
      }
    }

    // Generate collectibles
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(Math.random() * mazeSize);
      const y = Math.floor(Math.random() * mazeSize);
      if (!newWalls.has(`${x},${y}`) && (x !== 0 || y !== 0) && (x !== mazeSize - 1 || y !== mazeSize - 1)) {
        newCollectibles.add(`${x},${y}`);
      }
    }

    setWalls(newWalls);
    setCollectibles(newCollectibles);
    setPlayerPos({ x: 0, y: 0 });
    setCollected(0);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeMaze();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isComplete) return;

      let newPos = { ...playerPos };

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newPos.y = Math.max(0, playerPos.y - 1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newPos.y = Math.min(mazeSize - 1, playerPos.y + 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newPos.x = Math.max(0, playerPos.x - 1);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newPos.x = Math.min(mazeSize - 1, playerPos.x + 1);
          break;
        default:
          return;
      }

      // Check if new position is valid (not a wall)
      if (!walls.has(`${newPos.x},${newPos.y}`)) {
        setPlayerPos(newPos);
        setMoves(prev => prev + 1);

        // Check for collectible
        const posKey = `${newPos.x},${newPos.y}`;
        if (collectibles.has(posKey)) {
          setCollectibles(prev => {
            const newSet = new Set(prev);
            newSet.delete(posKey);
            return newSet;
          });
          setCollected(prev => prev + 1);
        }

        // Check if reached goal
        if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
          setIsComplete(true);
          const points = Math.max(100 - moves + (collected * 10), 50);
          setTimeout(() => onComplete(points), 1500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, walls, collectibles, isComplete, moves, collected]);

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isComplete) return;

    let newPos = { ...playerPos };

    switch (direction) {
      case 'up':
        newPos.y = Math.max(0, playerPos.y - 1);
        break;
      case 'down':
        newPos.y = Math.min(mazeSize - 1, playerPos.y + 1);
        break;
      case 'left':
        newPos.x = Math.max(0, playerPos.x - 1);
        break;
      case 'right':
        newPos.x = Math.min(mazeSize - 1, playerPos.x + 1);
        break;
    }

    if (!walls.has(`${newPos.x},${newPos.y}`)) {
      setPlayerPos(newPos);
      setMoves(prev => prev + 1);

      const posKey = `${newPos.x},${newPos.y}`;
      if (collectibles.has(posKey)) {
        setCollectibles(prev => {
          const newSet = new Set(prev);
          newSet.delete(posKey);
          return newSet;
        });
        setCollected(prev => prev + 1);
      }

      if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
        setIsComplete(true);
        const points = Math.max(100 - moves + (collected * 10), 50);
        setTimeout(() => onComplete(points), 1500);
      }
    }
  };

  const getCellContent = (x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) return '🧘';
    if (goalPos.x === x && goalPos.y === y) return '🏆';
    if (walls.has(`${x},${y}`)) return '🌳';
    if (collectibles.has(`${x},${y}`)) return '✨';
    return '';
  };

  const getCellColor = (x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) return 'bg-blue-400';
    if (goalPos.x === x && goalPos.y === y) return 'bg-yellow-400';
    if (walls.has(`${x},${y}`)) return 'bg-green-600';
    if (collectibles.has(`${x},${y}`)) return 'bg-purple-200';
    return 'bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={initializeMaze} variant="outline">
            New Maze
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🧭 Mindful Maze 🧭</h2>
          <p className="text-gray-600">Navigate peacefully to the goal</p>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Moves</p>
            <p className="text-2xl font-bold text-green-600">{moves}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Stars Collected</p>
            <p className="text-2xl font-bold text-purple-600">{collected}</p>
          </Card>
        </div>

        {/* Maze Grid */}
        <div className="flex justify-center mb-6">
          <div className="inline-grid gap-1 p-4 bg-white rounded-xl shadow-lg" style={{ gridTemplateColumns: `repeat(${mazeSize}, minmax(0, 1fr))` }}>
            {Array(mazeSize).fill(null).map((_, y) => (
              Array(mazeSize).fill(null).map((_, x) => (
                <div
                  key={`${x},${y}`}
                  className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition-all ${getCellColor(x, y)}`}
                >
                  {getCellContent(x, y)}
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Controls */}
        <Card className="p-6 bg-white mb-4">
          <p className="text-center mb-4 font-medium">Controls</p>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <Button onClick={() => movePlayer('up')} variant="outline" size="lg">
                <ArrowUp className="w-6 h-6" />
              </Button>
              <div></div>
              <Button onClick={() => movePlayer('left')} variant="outline" size="lg">
                <ArrowLeftIcon className="w-6 h-6" />
              </Button>
              <Button onClick={() => movePlayer('down')} variant="outline" size="lg">
                <ArrowDown className="w-6 h-6" />
              </Button>
              <Button onClick={() => movePlayer('right')} variant="outline" size="lg">
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Use arrow keys or WASD to move
          </p>
        </Card>

        {/* Legend */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧘</span>
              <span>You</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span>Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌳</span>
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>Star</span>
            </div>
          </div>
        </Card>

        {isComplete && (
          <Card className="mt-4 p-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center animate-bounce">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">You Found Peace! 🎉</h3>
            <p>Completed in {moves} moves</p>
            <p>Collected {collected} stars</p>
          </Card>
        )}
      </div>
    </div>
  );
}
