import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Trophy } from 'lucide-react';

interface WordCalmGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Word {
  word: string;
  found: boolean;
}

export function WordCalmGame({ onBack, onComplete }: WordCalmGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const positiveWords = [
    'PEACE', 'CALM', 'HAPPY', 'LOVE', 'HOPE',
    'JOY', 'SMILE', 'HEAL', 'GROW', 'REST',
  ];

  const gridSize = 12;

  const placeWord = (grid: string[][], word: string): boolean => {
    const directions = [
      { dx: 0, dy: 1 },  // horizontal
      { dx: 1, dy: 0 },  // vertical
      { dx: 1, dy: 1 },  // diagonal down-right
      { dx: 1, dy: -1 }, // diagonal down-left
    ];

    for (let attempt = 0; attempt < 50; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);

      let canPlace = true;
      const positions: [number, number][] = [];

      for (let i = 0; i < word.length; i++) {
        const x = startX + dir.dx * i;
        const y = startY + dir.dy * i;

        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
          canPlace = false;
          break;
        }

        if (grid[x][y] !== '' && grid[x][y] !== word[i]) {
          canPlace = false;
          break;
        }

        positions.push([x, y]);
      }

      if (canPlace) {
        positions.forEach(([x, y], i) => {
          grid[x][y] = word[i];
        });
        return true;
      }
    }

    return false;
  };

  const initializeGame = () => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const selectedWords = positiveWords.slice(0, 6);

    // Place words
    selectedWords.forEach(word => {
      placeWord(newGrid, word);
    });

    // Fill empty cells
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWords(selectedWords.map(word => ({ word, found: false })));
    setSelectedCells(new Set());
    setFoundCells(new Set());
    setCurrentWord('');
    setScore(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (foundCells.has(`${row},${col}`) || isComplete) return;

    const cellKey = `${row},${col}`;
    const newSelected = new Set(selectedCells);

    if (newSelected.has(cellKey)) {
      newSelected.delete(cellKey);
    } else {
      newSelected.add(cellKey);
    }

    setSelectedCells(newSelected);

    // Build current word
    const cellArray = Array.from(newSelected).sort();
    const word = cellArray.map(key => {
      const [r, c] = key.split(',').map(Number);
      return grid[r][c];
    }).join('');

    setCurrentWord(word);

    // Check if word is complete
    const foundWord = words.find(w => !w.found && w.word === word);
    if (foundWord) {
      // Word found!
      setWords(prev => prev.map(w => 
        w.word === word ? { ...w, found: true } : w
      ));
      setFoundCells(prev => new Set([...prev, ...newSelected]));
      setSelectedCells(new Set());
      setCurrentWord('');
      setScore(prev => prev + word.length * 10);

      // Check if all words found
      if (words.filter(w => !w.found).length === 1) {
        setIsComplete(true);
        setTimeout(() => onComplete(score + word.length * 10), 1500);
      }
    }
  };

  const getCellStyle = (row: number, col: number) => {
    const cellKey = `${row},${col}`;
    
    if (foundCells.has(cellKey)) {
      return 'bg-green-300 text-green-900 border-green-400';
    }
    
    if (selectedCells.has(cellKey)) {
      return 'bg-blue-300 text-blue-900 border-blue-400';
    }
    
    return 'bg-white hover:bg-purple-100 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={initializeGame} variant="outline">
            New Puzzle
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">📖 Word Calm 📖</h2>
          <p className="text-gray-600">Find positive words hidden in the grid</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Words List */}
          <Card className="p-6 bg-white">
            <h3 className="font-bold mb-4 text-lg">Words to Find</h3>
            <div className="space-y-2">
              {words.map((word, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg font-medium transition-all ${
                    word.found
                      ? 'bg-green-100 text-green-800 line-through'
                      : 'bg-purple-50 text-purple-900'
                  }`}
                >
                  {word.word}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold text-indigo-600">{score}</p>
            </div>

            {currentWord && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Selection</p>
                <p className="text-xl font-bold text-blue-600">{currentWord}</p>
              </div>
            )}
          </Card>

          {/* Grid */}
          <Card className="p-6 bg-white lg:col-span-2">
            <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
              {grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-10 h-10 flex items-center justify-center font-bold text-sm border-2 rounded transition-all ${getCellStyle(rowIndex, colIndex)}`}
                  >
                    {cell}
                  </button>
                ))
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
          <p className="text-sm text-purple-900">
            <strong>💡 How to Play:</strong> Click letters in sequence to spell positive words. 
            Letters can be in any direction: horizontal, vertical, or diagonal. Clear your mind and enjoy!
          </p>
        </Card>

        {isComplete && (
          <Card className="mt-6 p-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center animate-bounce">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">Perfect! 🎉</h3>
            <p>You found all the positive words!</p>
            <p className="text-xl mt-2">Final Score: {score}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
