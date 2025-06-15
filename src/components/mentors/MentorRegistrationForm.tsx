
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Globe, Linkedin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MentorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  yearsExperience: number;
  hourlyRate: number;
  linkedinUrl: string;
  websiteUrl: string;
}

const expertiseOptions = [
  'Software Development', 'Data Science', 'Digital Marketing', 'Business Strategy',
  'Product Management', 'UI/UX Design', 'Finance', 'Sales', 'Leadership',
  'Entrepreneurship', 'Career Development', 'Project Management'
];

export const MentorRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MentorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    expertise: [],
    yearsExperience: 0,
    hourlyRate: 0,
    linkedinUrl: '',
    websiteUrl: ''
  });

  const handleExpertiseToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter(s => s !== skill)
        : [...prev.expertise, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to register as a mentor.",
          variant: "destructive"
        });
        return;
      }

      console.log('Attempting to insert mentor data for user:', user.id);

      const { data, error } = await supabase
        .from('mentors')
        .insert({
          user_id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
          expertise: formData.expertise,
          years_experience: formData.yearsExperience,
          hourly_rate: formData.hourlyRate,
          linkedin_url: formData.linkedinUrl,
          website_url: formData.websiteUrl
        });

      console.log('Insert result:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: "Your mentor application has been submitted for review."
      });

      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', bio: '',
        expertise: [], yearsExperience: 0, hourlyRate: 0,
        linkedinUrl: '', websiteUrl: ''
      });

      // Reload the page to refresh the mentor dashboard
      window.location.reload();

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-6 h-6 text-orange-600" />
          <span>Become a Mentor</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell potential mentees about your background, experience, and what you can help them with..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Areas of Expertise *</Label>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.expertise.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleExpertiseToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience *</Label>
              <Input
                id="yearsExperience"
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-10"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="linkedinUrl"
                type="url"
                className="pl-10"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Personal Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="websiteUrl"
                type="url"
                className="pl-10"
                value={formData.websiteUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Application..." : "Apply to Become a Mentor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
