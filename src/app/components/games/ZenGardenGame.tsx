import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Eraser, Sparkles } from 'lucide-react';

interface ZenGardenGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function ZenGardenGame({ onBack, onComplete }: ZenGardenGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pattern, setPattern] = useState<'line' | 'wave' | 'circle' | 'spiral'>('wave');
  const [strokeCount, setStrokeCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw sand texture
        ctx.fillStyle = '#f5deb3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add texture
        for (let i = 0; i < 2000; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillStyle = Math.random() > 0.5 ? '#e8d5a8' : '#f0e5ca';
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setStrokeCount(prev => prev + 1);
    }
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (e.type === 'mousedown') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Add pattern effects
      if (pattern === 'wave') {
        const offset = Math.sin(x * 0.05) * 5;
        ctx.lineTo(x, y + offset);
      } else if (pattern === 'circle') {
        ctx.arc(x, y, 2, 0, Math.PI * 2);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Redraw sand
        ctx.fillStyle = '#f5deb3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 2000; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillStyle = Math.random() > 0.5 ? '#e8d5a8' : '#f0e5ca';
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
    setStrokeCount(0);
  };

  const finishSession = () => {
    const points = Math.min(strokeCount * 5 + Math.floor(sessionTime / 10), 200);
    onComplete(points);
  };

  const patterns = [
    { value: 'line', icon: '━', label: 'Straight Lines' },
    { value: 'wave', icon: '〰️', label: 'Waves' },
    { value: 'circle', icon: '◯', label: 'Circles' },
    { value: 'spiral', icon: '🌀', label: 'Spirals' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={finishSession} className="bg-gradient-to-r from-green-500 to-emerald-500">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Session
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🪷 Zen Garden 🪷</h2>
          <p className="text-gray-600">Create peaceful patterns in the sand</p>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Strokes</p>
            <p className="text-2xl font-bold text-amber-600">{strokeCount}</p>
          </Card>
          <Card className="px-6 py-3 bg-white">
            <p className="text-sm text-gray-600">Time</p>
            <p className="text-2xl font-bold text-orange-600">{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</p>
          </Card>
        </div>

        {/* Pattern Selection */}
        <Card className="p-4 mb-6 bg-white">
          <p className="text-sm text-gray-600 mb-3 text-center">Pattern Style</p>
          <div className="flex justify-center gap-3">
            {patterns.map((p) => (
              <button
                key={p.value}
                onClick={() => setPattern(p.value as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  pattern === p.value
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{p.icon}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Canvas */}
        <Card className="p-4 bg-white mb-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border-4 border-amber-200 rounded-lg cursor-crosshair w-full"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </Card>

        <div className="flex gap-3 mb-4">
          <Button onClick={clearCanvas} variant="outline" className="flex-1">
            <Eraser className="w-4 h-4 mr-2" />
            Clear Garden
          </Button>
        </div>

        <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <p className="text-sm text-amber-900">
            <strong>🧘 Mindfulness Tip:</strong> Focus on the movement of your hand. 
            Let go of perfection and enjoy the process of creation. There are no mistakes in a zen garden.
          </p>
        </Card>

        {/* Decorative stones */}
        <div className="mt-6 flex justify-center gap-4 text-4xl opacity-50">
          <span>🪨</span>
          <span>🌿</span>
          <span>🪨</span>
          <span>🍃</span>
          <span>🪨</span>
        </div>
      </div>
    </div>
  );
}
