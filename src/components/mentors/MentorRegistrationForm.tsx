
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PersonalInfoForm } from './registration/PersonalInfoForm';
import { ExpertiseSelector } from './registration/ExpertiseSelector';
import { ExperienceAndRateForm } from './registration/ExperienceAndRateForm';

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

  const handleFieldChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <PersonalInfoForm 
            formData={formData} 
            onChange={handleFieldChange} 
          />
          
          <ExpertiseSelector 
            selectedExpertise={formData.expertise}
            onToggle={handleExpertiseToggle}
          />
          
          <ExperienceAndRateForm
            yearsExperience={formData.yearsExperience}
            hourlyRate={formData.hourlyRate}
            onChange={handleFieldChange}
          />

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
