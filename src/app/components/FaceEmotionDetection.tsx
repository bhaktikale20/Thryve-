import { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

interface FaceEmotionDetectionProps {
  onEmotionDetected: (mood: string, emotions: EmotionData) => void;
  onClose: () => void;
}

interface EmotionData {
  happy: number;
  sad: number;
  neutral: number;
  stressed: number;
}

export function FaceEmotionDetection({ onEmotionDetected, onClose }: FaceEmotionDetectionProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [emotions, setEmotions] = useState<EmotionData>({
    happy: 0,
    sad: 0,
    neutral: 0,
    stressed: 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      // In a real implementation, this would access the actual camera
      // For demo purposes, we'll simulate the camera feed
      simulateCameraFeed();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const simulateCameraFeed = () => {
    // Simulate camera feed with a colored rectangle
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const drawFrame = () => {
          if (!isCameraActive) return;
          
          // Create gradient background
          const gradient = ctx.createLinearGradient(0, 0, 640, 480);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 640, 480);
          
          // Draw face detection overlay
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.strokeRect(180, 120, 280, 240);
          
          // Draw face points
          ctx.fillStyle = '#10b981';
          const facePoints = [
            [320, 200], [280, 240], [360, 240], // Eyes area
            [320, 280], // Nose
            [320, 320], // Mouth
          ];
          
          facePoints.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
          });
          
          // Add detection text
          ctx.fillStyle = '#fff';
          ctx.font = '20px Arial';
          ctx.fillText('Face Detected', 250, 100);
          
          requestAnimationFrame(drawFrame);
        };
        
        drawFrame();
      }
    }
  };

  const analyzeEmotion = () => {
    setIsAnalyzing(true);
    
    // Simulate emotion analysis
    setTimeout(() => {
      // Generate random emotion data for demo
      const randomEmotions: EmotionData = {
        happy: Math.floor(Math.random() * 40) + 60, // 60-100%
        sad: Math.floor(Math.random() * 20) + 5,   // 5-25%
        neutral: Math.floor(Math.random() * 30) + 10, // 10-40%
        stressed: Math.floor(Math.random() * 25) + 5, // 5-30%
      };
      
      setEmotions(randomEmotions);
      
      // Determine primary mood
      const maxEmotion = Math.max(randomEmotions.happy, randomEmotions.sad, randomEmotions.neutral, randomEmotions.stressed);
      let primaryMood = 'Good';
      
      if (maxEmotion === randomEmotions.happy && randomEmotions.happy > 70) {
        primaryMood = 'Great';
      } else if (maxEmotion === randomEmotions.happy) {
        primaryMood = 'Good';
      } else if (maxEmotion === randomEmotions.neutral || randomEmotions.stressed > 50) {
        primaryMood = 'Okay';
      } else if (maxEmotion === randomEmotions.sad || randomEmotions.stressed > 60) {
        primaryMood = 'Low';
      }
      
      setDetectedMood(primaryMood);
      setIsAnalyzing(false);
    }, 2000);
  };

  const confirmEmotion = () => {
    if (detectedMood) {
      onEmotionDetected(detectedMood, emotions);
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      simulateCameraFeed();
    }
    
    return () => {
      stopCamera();
    };
  }, [isCameraActive]);

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
      <Card className="w-full max-w-4xl p-8 bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Face Emotion Detection</h2>
          <p className="text-gray-600">Let AI analyze your facial expressions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Camera Feed */}
          <div>
            <Card className="p-4 bg-gray-900 mb-4">
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="w-full h-auto rounded-lg"
                style={{ display: isCameraActive ? 'block' : 'none' }}
              />
              
              {!isCameraActive && (
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <CameraOff className="w-16 h-16 mx-auto mb-4" />
                    <p>Camera is off</p>
                    <p className="text-sm mt-2">Click "Start Camera" to begin</p>
                  </div>
                </div>
              )}
            </Card>

            <div className="flex gap-3">
              {!isCameraActive ? (
                <Button
                  onClick={startCamera}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="flex-1"
                  >
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop Camera
                  </Button>
                  <Button
                    onClick={analyzeEmotion}
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Analyze Emotion
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            {detectedMood ? (
              <>
                <Card className="p-6 mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{getMoodEmoji(detectedMood)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Detected Mood</h3>
                      <p className={`text-3xl font-bold ${getMoodColor(detectedMood)}`}>
                        {detectedMood}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Analysis Complete</span>
                  </div>
                </Card>

                <Card className="p-6 mb-4 bg-white">
                  <h3 className="font-semibold mb-4">Emotion Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">😊 Happy</span>
                        <Badge variant="secondary">{emotions.happy}%</Badge>
                      </div>
                      <Progress value={emotions.happy} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">😐 Neutral</span>
                        <Badge variant="secondary">{emotions.neutral}%</Badge>
                      </div>
                      <Progress value={emotions.neutral} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">😔 Sad</span>
                        <Badge variant="secondary">{emotions.sad}%</Badge>
                      </div>
                      <Progress value={emotions.sad} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">😰 Stressed</span>
                        <Badge variant="secondary">{emotions.stressed}%</Badge>
                      </div>
                      <Progress value={emotions.stressed} className="h-2" />
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 h-full flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-sm">
                    Start your camera and click "Analyze Emotion" to detect your mood
                  </p>
                </div>
              </Card>
            )}

            <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-sm text-blue-800">
                <strong>🔒 Privacy:</strong> Your facial data is processed locally 
                and never stored or shared.
              </p>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          
          {detectedMood && (
            <Button
              onClick={confirmEmotion}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm & Continue
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
