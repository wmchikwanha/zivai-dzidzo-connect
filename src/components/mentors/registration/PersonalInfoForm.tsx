
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Globe, Linkedin, DollarSign } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    linkedinUrl: string;
    websiteUrl: string;
  };
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoForm = ({ formData, onChange }: PersonalInfoFormProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
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
            onChange={(e) => onChange('email', e.target.value)}
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
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder="Tell potential mentees about your background, experience, and what you can help them with..."
          rows={4}
          required
        />
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
            onChange={(e) => onChange('linkedinUrl', e.target.value)}
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
            onChange={(e) => onChange('websiteUrl', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </>
  );
};
