import { Trophy, Star, Award, Zap, Target, Crown, Medal, Flame } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Button } from '@/app/components/ui/button';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
}

interface GamificationPageProps {
  totalPoints: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  onBack: () => void;
}

export function GamificationPage({
  totalPoints,
  level,
  streak,
  achievements,
  onBack,
}: GamificationPageProps) {
  const pointsToNextLevel = (level + 1) * 100;
  const currentLevelProgress = (totalPoints % 100);
  const levelProgress = (currentLevelProgress / 100) * 100;

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Wellness Beginner';
    if (level < 10) return 'Habit Builder';
    if (level < 20) return 'Wellness Warrior';
    if (level < 30) return 'Mindfulness Master';
    return 'Wellness Champion';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl">Your Achievements</h1>
          </div>
          <p className="text-gray-600">Track your progress and unlock rewards</p>
        </div>

        {/* Player Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Level</p>
                <p className="text-3xl font-bold">{level}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">{getLevelTitle(level)}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">{pointsToNextLevel - currentLevelProgress} to level {level + 1}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Current Streak</p>
                <p className="text-3xl font-bold">{streak}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">days in a row</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Achievements</p>
                <p className="text-3xl font-bold">{unlockedAchievements.length}/{achievements.length}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">unlocked</p>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">Level Progress</h3>
            <Badge className="bg-purple-500 text-white">Level {level}</Badge>
          </div>
          <Progress value={levelProgress} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">
            {currentLevelProgress} / 100 XP to Level {level + 1}
          </p>
        </Card>

        {/* Unlocked Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Unlocked Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <Badge className="bg-yellow-500 text-white">
                      +{achievement.points} XP
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-gray-400" />
              Locked Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement) => (
                <Card key={achievement.id} className="p-6 bg-white border-2 border-gray-200 opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-gray-700">{achievement.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                      <div className="mb-2">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.progress}/{achievement.maxProgress}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        +{achievement.points} XP
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Button onClick={onBack} variant="outline" className="w-full md:w-auto">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
