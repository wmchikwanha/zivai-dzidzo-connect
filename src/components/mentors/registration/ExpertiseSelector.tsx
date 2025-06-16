
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ExpertiseSelectorProps {
  selectedExpertise: string[];
  onToggle: (skill: string) => void;
}

const expertiseOptions = [
  'Software Development', 'Data Science', 'Digital Marketing', 'Business Strategy',
  'Product Management', 'UI/UX Design', 'Finance', 'Sales', 'Leadership',
  'Entrepreneurship', 'Career Development', 'Project Management'
];

export const ExpertiseSelector = ({ selectedExpertise, onToggle }: ExpertiseSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Areas of Expertise *</Label>
      <div className="flex flex-wrap gap-2">
        {expertiseOptions.map((skill) => (
          <Badge
            key={skill}
            variant={selectedExpertise.includes(skill) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onToggle(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};
