import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Sparkles, TrendingUp, Heart, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotCoachProps {
  userName: string;
  onClose: () => void;
}

export function ChatbotCoach({ userName, onClose }: ChatbotCoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${userName}! 👋 I'm your personal wellness coach. I'm here to support you on your wellness journey. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Heart, label: 'Improve Mood', query: 'How can I improve my mood?' },
    { icon: Target, label: 'Set Goals', query: 'Help me set wellness goals' },
    { icon: TrendingUp, label: 'Track Progress', query: 'Show my progress' },
    { icon: Sparkles, label: 'Daily Tips', query: 'Give me a wellness tip' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Mood related
    if (lowerMessage.includes('mood') || lowerMessage.includes('feeling')) {
      return "I understand you're thinking about your mood. Here are some evidence-based ways to boost your mood:\n\n1. **Get Moving** - Even 10 minutes of exercise can release endorphins\n2. **Connect with Others** - Reach out to a friend or loved one\n3. **Practice Gratitude** - Write down 3 things you're grateful for\n4. **Get Sunlight** - Natural light can improve your mood significantly\n\nWhat would you like to try first?";
    }

    // Goals related
    if (lowerMessage.includes('goal') || lowerMessage.includes('set')) {
      return "Great! Setting goals is a powerful step toward wellness. Here's my SMART goal framework:\n\n**S**pecific - Be clear about what you want\n**M**easurable - Track your progress\n**A**chievable - Start small and realistic\n**R**elevant - Align with your values\n**T**ime-bound - Set a deadline\n\nWhat wellness area would you like to focus on? (e.g., fitness, nutrition, sleep, mental health)";
    }

    // Progress related
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return "You're making wonderful progress! 🎉\n\n✅ You've maintained a 5-day streak\n✅ Completed 85% of your habits this week\n✅ Your wellness score improved by 12%\n\nTo keep improving, I recommend:\n• Focus on consistency over perfection\n• Celebrate small wins\n• Adjust habits that aren't working\n\nWhat specific area would you like to improve?";
    }

    // Tips related
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('suggest')) {
      const tips = [
        "💧 **Hydration Hack**: Start your day with a glass of water before coffee. Your body is dehydrated after sleep!",
        "🧘 **Stress Buster**: Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 4 times.",
        "😴 **Sleep Better**: Keep your bedroom temperature between 60-67°F (15-19°C) for optimal sleep quality.",
        "🏃 **Movement Matters**: Take a 5-minute walk every hour. It reduces stress and boosts energy!",
        "🍎 **Nutrition Tip**: Eat a rainbow! Different colored fruits and vegetables provide different nutrients.",
        "🧠 **Mental Health**: Practice the 5-5-5 rule when anxious: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }

    // Stress related
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "I hear you're feeling stressed. That's completely normal, and there are many ways to manage it:\n\n**Immediate Relief:**\n• Deep breathing exercises (try box breathing: 4-4-4-4)\n• Progressive muscle relaxation\n• Take a short walk\n\n**Long-term Strategies:**\n• Regular meditation practice\n• Physical exercise\n• Adequate sleep (7-9 hours)\n• Talking to someone you trust\n\nWould you like me to guide you through a quick relaxation exercise?";
    }

    // Sleep related
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return "Good sleep is crucial for wellness! Here are my top sleep hygiene tips:\n\n**Before Bed:**\n• Stop screen time 1 hour before bed\n• Keep your room cool and dark\n• Try reading or gentle stretching\n\n**Daily Habits:**\n• Wake up at the same time every day\n• Get morning sunlight\n• Limit caffeine after 2 PM\n• Exercise, but not right before bed\n\nWhat's your biggest sleep challenge?";
    }

    // Exercise related
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
      return "Exercise is fantastic for both physical and mental health! 💪\n\n**For Beginners:**\n• Start with 10-15 minutes daily\n• Walking is excellent exercise\n• Try bodyweight exercises at home\n\n**Staying Motivated:**\n• Find activities you enjoy\n• Exercise with a friend\n• Track your progress\n• Celebrate milestones\n\nWhat type of exercise interests you most?";
    }

    // Nutrition related
    if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      return "Nutrition is a cornerstone of wellness! 🥗\n\n**Healthy Eating Tips:**\n• Eat whole, unprocessed foods\n• Include protein with every meal\n• Fill half your plate with vegetables\n• Stay hydrated (8 glasses of water/day)\n• Practice mindful eating\n\n**Remember:** Small, sustainable changes are better than drastic diets. What nutrition goal would you like to work on?";
    }

    // Meditation related
    if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful')) {
      return "Meditation is wonderful for mental clarity and stress reduction! 🧘\n\n**Getting Started:**\n• Start with just 5 minutes\n• Focus on your breath\n• Don't judge your thoughts, just observe\n• Use guided meditations if helpful\n\n**Benefits You'll Notice:**\n• Reduced stress and anxiety\n• Better focus and clarity\n• Improved emotional regulation\n• Better sleep quality\n\nWould you like to try a meditation session now?";
    }

    // Gratitude related
    if (lowerMessage.includes('gratitude') || lowerMessage.includes('thankful') || lowerMessage.includes('grateful')) {
      return "Gratitude is a powerful wellness practice! 🙏\n\n**Daily Gratitude Practice:**\n• Write 3 things you're grateful for each morning\n• Be specific (not just \"family\" but \"Mom's phone call\")\n• Include small things (sunshine, good coffee)\n• Reflect on why you're grateful\n\n**Science Says:** Regular gratitude practice can increase happiness by 25% and improve sleep quality!\n\nWhat are you grateful for today?";
    }

    // Motivation related
    if (lowerMessage.includes('motivat') || lowerMessage.includes('inspire') || lowerMessage.includes('give up')) {
      return "Remember, ${userName}, wellness is a journey, not a destination! 🌟\n\n**When Motivation is Low:**\n• Focus on your 'why' - why did you start?\n• Celebrate small wins\n• Be kind to yourself\n• Remember: progress > perfection\n• Take it one day at a time\n\n**You've already shown up today, and that's what matters!**\n\nWhat's one small thing you can do today to invest in your wellness?";
    }

    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm here to support you anytime. Remember, you're doing great work by prioritizing your wellness! 💙\n\nIs there anything else I can help you with?";
    }

    // Default response
    return "That's a great question! I'm here to help with:\n\n• Mood and emotional wellness\n• Habit building and goal setting\n• Stress management\n• Sleep improvement\n• Exercise and fitness tips\n• Nutrition guidance\n• Meditation and mindfulness\n\nWhat would you like to explore?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl h-[80vh] flex flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Wellness Coach AI</h2>
                <p className="text-sm opacity-90">Your personal wellness assistant</p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex gap-2 overflow-x-auto">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot' 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.sender === 'bot' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <Card className={`p-3 inline-block ${
                    message.sender === 'bot' 
                      ? 'bg-gray-100' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </Card>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="p-3 bg-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about wellness..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 Tip: Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}