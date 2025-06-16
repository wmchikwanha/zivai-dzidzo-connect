
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgesProps {
  status: string;
  subscriptionTier: string;
}

export const StatusBadges = ({ status, subscriptionTier }: StatusBadgesProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const variants = {
      basic: 'bg-blue-100 text-blue-800',
      premium: 'bg-orange-100 text-orange-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return (
      <Badge className={variants[tier as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <span>Status: {getStatusBadge(status)}</span>
      <span>Plan: {getTierBadge(subscriptionTier)}</span>
    </div>
  );
};
