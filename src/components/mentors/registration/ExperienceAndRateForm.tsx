
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

interface ExperienceAndRateFormProps {
  yearsExperience: number;
  hourlyRate: number;
  onChange: (field: string, value: number) => void;
}

export const ExperienceAndRateForm = ({ yearsExperience, hourlyRate, onChange }: ExperienceAndRateFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="yearsExperience">Years of Experience *</Label>
        <Input
          id="yearsExperience"
          type="number"
          min="0"
          value={yearsExperience}
          onChange={(e) => onChange('yearsExperience', parseInt(e.target.value) || 0)}
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
            value={hourlyRate}
            onChange={(e) => onChange('hourlyRate', parseFloat(e.target.value) || 0)}
            required
          />
        </div>
      </div>
    </div>
  );
};
