import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Lightbulb,
  DollarSign,
  Users
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  modules: LearningModule[];
  color: string;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'practical' | 'case-study' | 'quiz';
  content: string;
  completed: boolean;
  keyTakeaway: string;
  actionItems?: string[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'ai-business-basics',
    title: 'AI for Business Success',
    description: 'Master AI tools that can 10x your productivity and income',
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    color: 'from-blue-500 to-indigo-600',
    modules: [
      {
        id: '1',
        title: 'ChatGPT Money-Making Secrets',
        description: 'How entrepreneurs earn $500+ daily using AI',
        type: 'concept',
        completed: false,
        keyTakeaway: 'AI prompting can replace hours of manual work',
        content: `🚀 **The $500/Day AI Revolution**

Real Story: Sarah from Harare now makes $500+ daily by:
• Writing social media content for 20 clients (1 hour with AI vs 8 hours manually)
• Creating course outlines that sell for $50 each
• Generating business names and logos using AI tools

**The Secret Formula:**
Instead of "Write me content" → Use "Act as a social media expert for wellness brands. Create 10 posts that drive sales for my herbal tea business targeting busy professionals."

**Your 24-Hour Challenge:**
Pick ONE service you can offer using AI and find your first client tomorrow.`,
        actionItems: [
          'Choose your AI service (content, design, consulting)',
          'Practice 3 specific prompts for your chosen service',
          'Post your service on social media today'
        ]
      },
      {
        id: '2',
        title: 'AI Tools That Pay Bills',
        description: 'Free and cheap AI tools with highest ROI',
        type: 'practical',
        completed: false,
        keyTakeaway: 'Focus on tools that generate immediate income',
        content: `💰 **The AI Money Stack (All Under $50/month)**

**Tier 1 - Free Money Makers:**
• ChatGPT Free - Content creation, business ideas
• Canva AI - Social media graphics, logos
• Grammarly - Professional writing

**Tier 2 - Premium ROI Kings:**
• ChatGPT Plus ($20) - Advanced business strategies
• Midjourney ($10) - Custom graphics for clients
• Copy.ai ($36) - Sales copy that converts

**Real Results:**
James in Mutare: Uses free Canva AI to design logos. Makes $200/week.
Mary in Gweru: ChatGPT Plus helps her write proposals. Win rate went from 20% to 70%.

**This Week's Action:**
Start with free tools. Upgrade only AFTER making your first $100.`,
        actionItems: [
          'Set up ChatGPT and create 5 business prompts',
          'Design 3 sample pieces in Canva AI',
          'Make your first $50 before upgrading anything'
        ]
      }
    ]
  },
  {
    id: 'digital-hustle-mastery',
    title: 'Digital Hustle Mastery',
    description: 'Turn your smartphone into a money-making machine',
    icon: <DollarSign className="w-6 h-6" />,
    difficulty: 'Beginner',
    estimatedTime: '12 min',
    color: 'from-green-500 to-emerald-600',
    modules: [
      {
        id: '1',
        title: 'WhatsApp Business Empire',
        description: 'Build a customer base of 500+ in 30 days',
        type: 'case-study',
        completed: false,
        keyTakeaway: 'Professional WhatsApp = 8x more sales',
        content: `📱 **From 5 to 500+ Customers in 30 Days**

**Case Study: Tatenda's Transformation**
• Week 1: Regular WhatsApp, 5 customers, $50 revenue
• Week 4: WhatsApp Business, 500+ customers, $2,000+ revenue

**The Game-Changing Features:**
1. **Business Profile** - Instant credibility
2. **Product Catalog** - Customers browse like online shop
3. **Quick Replies** - Answer common questions instantly
4. **Broadcast Lists** - Message 256 people with one click
5. **Labels** - VIP customers, new leads, repeat buyers

**The 30-Day Blueprint:**
• Days 1-3: Set up WhatsApp Business properly
• Days 4-10: Create your product catalog
• Days 11-20: Build broadcast lists and quick replies
• Days 21-30: Scale with labels and analytics

**Secret Weapon:** Status updates. Post daily behind-the-scenes content. Followers become customers.`,
        actionItems: [
          'Download WhatsApp Business today',
          'Set up business profile with professional info',
          'Create catalog with your top 3 products/services',
          'Post your first business status update'
        ]
      }
    ]
  },
  {
    id: 'networking-growth',
    title: 'Strategic Networking',
    description: 'Build a network that opens doors and creates opportunities',
    icon: <Users className="w-6 h-6" />,
    difficulty: 'Intermediate',
    estimatedTime: '10 min',
    color: 'from-purple-500 to-pink-600',
    modules: [
      {
        id: '1',
        title: 'LinkedIn Lead Generation',
        description: 'Get 50+ quality connections monthly',
        type: 'practical',
        completed: false,
        keyTakeaway: 'Personal brand attracts opportunities',
        content: `🎯 **Turn LinkedIn Into Your Personal ATM**

**The 90-Day LinkedIn Strategy:**

**Month 1: Foundation**
• Optimize profile with professional photo
• Write compelling headline (not just job title)
• Post 3x per week about your expertise

**Month 2: Content Creation**
• Share industry insights and tips
• Comment meaningfully on 10 posts daily
• Send 20 connection requests weekly

**Month 3: Monetization**
• Launch weekly newsletter
• Offer free consultations
• Convert connections to clients

**Secret Sauce:** Share failures and lessons, not just wins. Vulnerability builds trust faster than perfection.

**Real Example:** 
"6 months ago I failed at starting my consulting business. Here's what I learned..." gets 10x more engagement than "I'm excited to announce..."`,
        actionItems: [
          'Update LinkedIn profile with compelling headline',
          'Write your first vulnerability post',
          'Send 10 connection requests to ideal clients',
          'Comment meaningfully on 5 posts daily this week'
        ]
      }
    ]
  }
];

export const ModernLearningCenter = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    if (currentModule) {
      currentModule.completed = true;
    }
  };

  const getPathProgress = (path: LearningPath) => {
    const completed = path.modules.filter(m => completedModules.has(m.id)).length;
    return (completed / path.modules.length) * 100;
  };

  if (currentModule && selectedPath) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentModule(null)}
            className="mb-4"
          >
            ← Back to {selectedPath.title}
          </Button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentModule.title}</h1>
              <p className="text-gray-600">{currentModule.description}</p>
            </div>
            <Badge variant="secondary">{currentModule.type}</Badge>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {currentModule.content}
              </div>
            </div>

            {currentModule.actionItems && (
              <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Your Action Plan
                </h3>
                <ul className="space-y-2">
                  {currentModule.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-orange-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Takeaway
              </h3>
              <p className="text-blue-800 font-medium">{currentModule.keyTakeaway}</p>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button variant="outline">
                Save for Later
              </Button>
              <Button 
                onClick={() => handleModuleComplete(currentModule.id)}
                disabled={completedModules.has(currentModule.id)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                {completedModules.has(currentModule.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    Mark Complete
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedPath) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPath(null)}
            className="mb-4"
          >
            ← Back to Learning Center
          </Button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedPath.title}</h1>
              <p className="text-gray-600 text-lg">{selectedPath.description}</p>
            </div>
            <div className="text-right">
              <Badge className={`bg-gradient-to-r ${selectedPath.color} text-white`}>
                {selectedPath.difficulty}
              </Badge>
              <p className="text-sm text-gray-500 mt-1">{selectedPath.estimatedTime}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(getPathProgress(selectedPath))}% Complete</span>
            </div>
            <Progress value={getPathProgress(selectedPath)} className="w-full" />
          </div>
        </div>

        <div className="space-y-4">
          {selectedPath.modules.map((module, index) => (
            <Card 
              key={module.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                completedModules.has(module.id) ? 'border-green-200 bg-green-50' : ''
              }`}
              onClick={() => setCurrentModule(module)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completedModules.has(module.id) 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {completedModules.has(module.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{module.title}</h3>
                      <p className="text-gray-600">{module.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <Badge variant="outline">{module.type}</Badge>
                        <span className="text-sm text-gray-500">
                          💡 {module.keyTakeaway}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {completedModules.has(module.id) ? (
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    ) : (
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Learning Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master AI tools and strategies that successful entrepreneurs use to build wealth. 
          No fluff, just actionable knowledge you can implement today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {learningPaths.map((path) => (
          <Card 
            key={path.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => setSelectedPath(path)}
          >
            <CardHeader>
              <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-full flex items-center justify-center text-white mb-4`}>
                {path.icon}
              </div>
              <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
              <p className="text-gray-600">{path.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge>{path.difficulty}</Badge>
                <span className="text-sm text-gray-500">{path.estimatedTime}</span>
              </div>
              <div className="w-full mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(getPathProgress(path))}%</span>
                </div>
                <Progress value={getPathProgress(path)} className="w-full" />
              </div>
              <Button className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90`}>
                {getPathProgress(path) > 0 ? 'Continue Learning' : 'Start Learning'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-8 text-center">
          <TrendingUp className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Income?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who've used these strategies to build profitable businesses. 
            Start with any path - they're all designed to deliver immediate results.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            onClick={() => setSelectedPath(learningPaths[0])}
          >
            Start Your Journey Today
            <Zap className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};