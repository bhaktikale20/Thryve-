import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface MemoryMatchGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryMatchGame({ onBack, onComplete }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🍀', '🌿', '🌱'];

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, isMatched: true } : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedPairs === emojis.length && matchedPairs > 0) {
      setIsComplete(true);
      const points = Math.max(100 - moves * 5, 20);
      setTimeout(() => onComplete(points), 1500);
    }
  }, [matchedPairs]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prev => prev.map((card, idx) => 
      idx === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={initializeGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🌸 Memory Match 🌸</h2>
          <p className="text-gray-600">Match the nature pairs</p>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Moves</p>
            <p className="text-2xl font-bold text-purple-600">{moves}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Pairs Found</p>
            <p className="text-2xl font-bold text-green-600">{matchedPairs}/{emojis.length}</p>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square cursor-pointer transition-all duration-300 transform ${
                card.isFlipped || card.isMatched ? '' : 'hover:scale-105'
              }`}
            >
              <Card className={`w-full h-full flex items-center justify-center text-5xl ${
                card.isMatched 
                  ? 'bg-green-100 border-green-300 border-2' 
                  : card.isFlipped 
                  ? 'bg-white' 
                  : 'bg-gradient-to-br from-purple-400 to-pink-400 cursor-pointer'
              }`}>
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </Card>
            </div>
          ))}
        </div>

        {isComplete && (
          <Card className="p-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center animate-bounce">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p>You completed the game in {moves} moves!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
