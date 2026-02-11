import { useState } from 'react';
import { Target, Sparkles, Trophy, Zap, Star, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  icon: typeof Target;
}

interface WellnessGameProps {
  onComplete: (earnedPoints: number) => void;
  onBack: () => void;
}

const challenges: Challenge[] = [
  {
    id: 'water',
    title: 'Hydration Hero',
    description: 'Drink 8 glasses of water today',
    difficulty: 'easy',
    points: 10,
    icon: Sparkles,
  },
  {
    id: 'steps',
    title: 'Step Master',
    description: 'Walk 10,000 steps',
    difficulty: 'medium',
    points: 25,
    icon: Target,
  },
  {
    id: 'meditation',
    title: 'Zen Warrior',
    description: 'Complete 15 minutes of meditation',
    difficulty: 'medium',
    points: 20,
    icon: Sparkles,
  },
  {
    id: 'sleep',
    title: 'Sleep Champion',
    description: 'Get 8 hours of quality sleep',
    difficulty: 'hard',
    points: 30,
    icon: Star,
  },
];

const triviaQuestions = [
  {
    question: 'How many hours of sleep do most adults need per night?',
    options: ['4-5 hours', '6-7 hours', '7-9 hours', '10-12 hours'],
    correct: 2,
    points: 15,
  },
  {
    question: 'What percentage of the human body is water?',
    options: ['40%', '50%', '60%', '70%'],
    correct: 2,
    points: 15,
  },
  {
    question: 'Regular exercise can help reduce symptoms of which condition?',
    options: ['Depression', 'Anxiety', 'Stress', 'All of the above'],
    correct: 3,
    points: 20,
  },
  {
    question: 'How long does it typically take to form a new habit?',
    options: ['7 days', '21 days', '30 days', '21-66 days'],
    correct: 3,
    points: 20,
  },
];

export function WellnessGame({ onComplete, onBack }: WellnessGameProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'trivia'>('challenges');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [triviaScore, setTriviaScore] = useState(0);

  const totalPoints = completedChallenges.length * 20 + triviaScore;

  const handleChallengeComplete = (challengeId: string, points: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === triviaQuestions[currentQuestion].correct) {
      setTriviaScore(triviaScore + triviaQuestions[currentQuestion].points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      onComplete(totalPoints);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl">Wellness Challenges</h1>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{totalPoints} XP</span>
            </div>
          </div>
          <p className="text-gray-600">Complete challenges and test your wellness knowledge</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('challenges')}
            variant={activeTab === 'challenges' ? 'default' : 'outline'}
            className={activeTab === 'challenges' ? 'bg-purple-500' : ''}
          >
            <Target className="w-4 h-4 mr-2" />
            Daily Challenges
          </Button>
          <Button
            onClick={() => setActiveTab('trivia')}
            variant={activeTab === 'trivia' ? 'default' : 'outline'}
            className={activeTab === 'trivia' ? 'bg-purple-500' : ''}
          >
            <Star className="w-4 h-4 mr-2" />
            Wellness Trivia
          </Button>
        </div>

        {/* Daily Challenges */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Today's Challenges</h2>
              <div className="space-y-3">
                {challenges.map((challenge) => {
                  const isCompleted = completedChallenges.includes(challenge.id);
                  return (
                    <div
                      key={challenge.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCompleted
                          ? 'bg-green-50 border-green-500'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' : 'bg-purple-100'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <challenge.icon className="w-6 h-6 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-600">
                              +{challenge.points} XP
                            </span>
                            {!isCompleted && (
                              <Button
                                size="sm"
                                onClick={() => handleChallengeComplete(challenge.id, challenge.points)}
                                className="bg-purple-500 hover:bg-purple-600"
                              >
                                Mark Complete
                              </Button>
                            )}
                            {isCompleted && (
                              <Badge className="bg-green-500 text-white">Completed! ✓</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 className="text-xl font-semibold mb-2">Daily Progress</h3>
              <Progress 
                value={(completedChallenges.length / challenges.length) * 100} 
                className="h-3 mb-2 bg-white/20"
              />
              <p className="text-sm">
                {completedChallenges.length} of {challenges.length} challenges completed
              </p>
            </Card>
          </div>
        )}

        {/* Wellness Trivia */}
        {activeTab === 'trivia' && (
          <Card className="p-8 bg-white shadow-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Question {currentQuestion + 1} of {triviaQuestions.length}
                </h2>
                <Badge className="bg-purple-500 text-white">
                  {triviaQuestions[currentQuestion].points} XP
                </Badge>
              </div>
              <Progress 
                value={((currentQuestion + 1) / triviaQuestions.length) * 100} 
                className="h-2"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl mb-6">{triviaQuestions[currentQuestion].question}</h3>
              <div className="space-y-3">
                {triviaQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === triviaQuestions[currentQuestion].correct;
                  const isSelected = index === selectedAnswer;
                  
                  let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-all ';
                  if (!showResult) {
                    buttonClass += isSelected 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50';
                  } else {
                    if (isCorrect) {
                      buttonClass += 'border-green-500 bg-green-50';
                    } else if (isSelected && !isCorrect) {
                      buttonClass += 'border-red-500 bg-red-50';
                    } else {
                      buttonClass += 'border-gray-200 bg-gray-50';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg mb-4 ${
                selectedAnswer === triviaQuestions[currentQuestion].correct
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : 'bg-red-50 border-l-4 border-red-500'
              }`}>
                <p className="font-semibold">
                  {selectedAnswer === triviaQuestions[currentQuestion].correct
                    ? '✓ Correct! Great job!'
                    : '✗ Not quite right. Keep learning!'}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={onBack} variant="outline" className="flex-1">
                Back
              </Button>
              {showResult && (
                <Button
                  onClick={handleNextQuestion}
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                >
                  {currentQuestion < triviaQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </Card>
        )}

        {activeTab === 'challenges' && (
          <div className="mt-6 flex gap-4">
            <Button onClick={onBack} variant="outline" className="flex-1">
              Back to Dashboard
            </Button>
            <Button
              onClick={() => onComplete(totalPoints)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Save Progress
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
