import { Settings, Bell, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';
import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onSave: (settings: AppSettings) => void;
}

export interface AppSettings {
  notifications: boolean;
  soundEffects: boolean;
  darkMode: boolean;
  reminderTime: number;
  soundVolume: number;
}

export function SettingsPage({ onBack, onSave }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminderTime, setReminderTime] = useState([9]);
  const [soundVolume, setSoundVolume] = useState([70]);

  const handleSave = () => {
    onSave({
      notifications,
      soundEffects,
      darkMode,
      reminderTime: reminderTime[0],
      soundVolume: soundVolume[0],
    });
    onBack();
  };

  const handleReset = () => {
    setNotifications(true);
    setSoundEffects(true);
    setDarkMode(false);
    setReminderTime([9]);
    setSoundVolume([70]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl">Settings</h1>
          </div>
          <p className="text-gray-600">Customize your wellness experience</p>
        </div>

        {/* General Settings */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-6">General</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-500" />
                <div>
                  <Label htmlFor="notifications" className="text-base">
                    Daily Reminders
                  </Label>
                  <p className="text-sm text-gray-500">
                    Get reminded to check in daily
                  </p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEffects ? (
                  <Volume2 className="w-5 h-5 text-purple-500" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <Label htmlFor="sounds" className="text-base">
                    Sound Effects
                  </Label>
                  <p className="text-sm text-gray-500">
                    Play sounds for achievements
                  </p>
                </div>
              </div>
              <Switch
                id="sounds"
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-indigo-500" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <Label htmlFor="darkMode" className="text-base">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-500">
                    Switch to dark theme
                  </p>
                </div>
              </div>
              <Switch
                id="darkMode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </Card>

        {/* Reminder Settings */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Reminders</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-base mb-4 block">
                Daily Reminder Time: {reminderTime[0]}:00
              </Label>
              <div className="px-2">
                <Slider
                  value={reminderTime}
                  onValueChange={setReminderTime}
                  min={6}
                  max={22}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>6:00 AM</span>
                  <span>10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sound Settings */}
        {soundEffects && (
          <Card className="p-6 mb-6 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Audio</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  Volume: {soundVolume[0]}%
                </Label>
                <div className="px-2">
                  <Slider
                    value={soundVolume}
                    onValueChange={setSoundVolume}
                    min={0}
                    max={100}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Mute</span>
                    <span>Max</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* About Section */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Thryve</strong>
            </p>
            <p>Version 1.0.0</p>
            <p className="text-xs text-gray-600 mt-4">
              Your intelligent wellness companion for building healthy habits, tracking mood, and achieving your wellness goals.
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset to Default
          </Button>
          <Button onClick={onBack} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}