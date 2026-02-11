import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface VoiceMoodInputProps {
  onMoodDetected: (mood: string, confidence: number) => void;
  onClose: () => void;
}

export function VoiceMoodInput({ onMoodDetected, onClose }: VoiceMoodInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate voice recognition (in real app, would use Web Speech API)
  const analyzeMoodFromText = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Positive mood indicators
    if (lowerText.includes('great') || lowerText.includes('wonderful') || 
        lowerText.includes('amazing') || lowerText.includes('excellent') ||
        lowerText.includes('fantastic') || lowerText.includes('happy')) {
      return { mood: 'Great', confidence: 90 };
    }
    
    // Good mood indicators
    if (lowerText.includes('good') || lowerText.includes('fine') || 
        lowerText.includes('nice') || lowerText.includes('pleasant') ||
        lowerText.includes('decent')) {
      return { mood: 'Good', confidence: 85 };
    }
    
    // Okay mood indicators
    if (lowerText.includes('okay') || lowerText.includes('alright') || 
        lowerText.includes('so-so') || lowerText.includes('meh') ||
        lowerText.includes('average')) {
      return { mood: 'Okay', confidence: 80 };
    }
    
    // Low mood indicators
    if (lowerText.includes('bad') || lowerText.includes('sad') || 
        lowerText.includes('tired') || lowerText.includes('stressed') ||
        lowerText.includes('down') || lowerText.includes('low')) {
      return { mood: 'Low', confidence: 85 };
    }
    
    return { mood: 'Good', confidence: 60 };
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setDetectedMood(null);
    
    // Simulate voice input (in production, use Web Speech API)
    setTimeout(() => {
      const samplePhrases = [
        "I'm feeling great today!",
        "I feel pretty good",
        "I'm okay, just a regular day",
        "Feeling a bit stressed today",
        "I'm wonderful and energetic!",
      ];
      
      const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
      setTranscript(randomPhrase);
      setIsProcessing(true);
      
      setTimeout(() => {
        const result = analyzeMoodFromText(randomPhrase);
        setDetectedMood(result.mood);
        setConfidence(result.confidence);
        setIsListening(false);
        setIsProcessing(false);
      }, 1500);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const confirmMood = () => {
    if (detectedMood) {
      onMoodDetected(detectedMood, confidence);
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Great': return 'text-green-500';
      case 'Good': return 'text-blue-500';
      case 'Okay': return 'text-yellow-500';
      case 'Low': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'Great': return '😄';
      case 'Good': return '😊';
      case 'Okay': return '😐';
      case 'Low': return '😔';
      default: return '😊';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg p-8 bg-white shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Voice Mood Input</h2>
          <p className="text-gray-600">Tell us how you're feeling today</p>
        </div>

        {/* Microphone Animation */}
        <div className="flex justify-center mb-6">
          <div className={`relative ${isListening ? 'animate-pulse' : ''}`}>
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-gradient-to-br from-red-400 to-pink-400 scale-110' 
                : 'bg-gradient-to-br from-purple-400 to-blue-400'
            }`}>
              {isListening ? (
                <Mic className="w-16 h-16 text-white" />
              ) : (
                <MicOff className="w-16 h-16 text-white" />
              )}
            </div>
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50"></div>
                <div className="absolute inset-0 rounded-full bg-pink-400 animate-pulse opacity-30"></div>
              </>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          {!isListening && !transcript && (
            <p className="text-gray-600">Click the button below to start</p>
          )}
          {isListening && !isProcessing && (
            <div className="flex items-center justify-center gap-2 text-red-500">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <p className="font-medium">Listening...</p>
            </div>
          )}
          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-purple-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p className="font-medium">Analyzing your mood...</p>
            </div>
          )}
        </div>

        {/* Transcript */}
        {transcript && (
          <Card className="p-4 mb-6 bg-gray-50">
            <p className="text-sm text-gray-600 mb-1">You said:</p>
            <p className="text-lg italic">"{transcript}"</p>
          </Card>
        )}

        {/* Detected Mood */}
        {detectedMood && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getMoodEmoji(detectedMood)}</span>
                <div>
                  <h3 className="text-xl font-bold">Detected Mood</h3>
                  <p className={`text-2xl font-bold ${getMoodColor(detectedMood)}`}>
                    {detectedMood}
                  </p>
                </div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Confidence:</span>
              <Badge variant="secondary">{confidence}%</Badge>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-4 mb-6 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Speak naturally about how you're feeling. 
            Use words like "great", "good", "okay", or describe your energy level.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          
          {!detectedMood ? (
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`flex-1 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={confirmMood}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm Mood
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
