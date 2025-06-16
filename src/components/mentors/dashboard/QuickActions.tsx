
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Calendar } from 'lucide-react';

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Button className="justify-start" variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Update Profile
          </Button>
          <Button className="justify-start" variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
