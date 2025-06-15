
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Loader2 } from 'lucide-react';

interface SignupFormProps {
  onSuccess: (data: FormData) => void;
}

interface FormData {
  whatsapp: string;
  name: string;
  language: string;
  interests: string;
  additionalInfo: string;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    whatsapp: '',
    name: '',
    language: '',
    interests: '',
    additionalInfo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    onSuccess(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-orange-600" />
          <span>Join the Waitlist</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number *</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              placeholder="+263 77 123 4567"
              required
            />
            <p className="text-sm text-gray-600">
              Include country code. This is where you'll receive ZivAI lessons.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Preferred Learning Language *</Label>
            <Select onValueChange={(value) => handleInputChange('language', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose your language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="shona">ChiShona</SelectItem>
                <SelectItem value="ndebele">IsiNdebele</SelectItem>
                <SelectItem value="mixed">Mixed (I'm comfortable with multiple languages)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Learning Interests *</Label>
            <Select onValueChange={(value) => handleInputChange('interests', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="What would you like to learn?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital-entrepreneurship">Digital Entrepreneurship</SelectItem>
                <SelectItem value="whatsapp-business">WhatsApp Business Skills</SelectItem>
                <SelectItem value="online-marketing">Online Marketing</SelectItem>
                <SelectItem value="financial-literacy">Financial Literacy</SelectItem>
                <SelectItem value="tech-skills">Basic Tech Skills</SelectItem>
                <SelectItem value="agriculture">Smart Agriculture</SelectItem>
                <SelectItem value="everything">Everything - I want to learn it all!</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">
              Tell us about yourself (Optional)
            </Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="What's your current situation? What challenges are you facing? How do you hope ZivAI can help you?"
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Joining Waitlist...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 mr-2" />
                Join the Waitlist
              </>
            )}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            By signing up, you agree to receive WhatsApp messages from ZivAI about your learning journey. 
            You can unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
