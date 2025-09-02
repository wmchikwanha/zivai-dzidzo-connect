
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MentorRegistrationForm } from '@/components/mentors/MentorRegistrationForm';
import { SubscriptionPlans } from '@/components/mentors/SubscriptionPlans';
import { ServiceManagement } from '@/components/mentors/ServiceManagement';
import { DashboardStats } from '@/components/mentors/dashboard/DashboardStats';
import { QuickActions } from '@/components/mentors/dashboard/QuickActions';
import { StatusBadges } from '@/components/mentors/dashboard/StatusBadges';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface MentorProfile {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  subscription_tier: string;
  subscription_end_date: string;
}

const MentorDashboard = () => {
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMentorProfile();
  }, []);

  const loadMentorProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Loading profile for user:', user?.id);
      
      if (!user) {
        console.log('No user found');
        return;
      }

      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('Mentor profile query result:', { data, error });

      if (!error && data) {
        setMentorProfile(data);
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error loading mentor profile:', error);
      }
    } catch (error) {
      console.error('Error loading mentor profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your mentor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!mentorProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to ZivAI Mentors</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our platform as a mentor and start sharing your expertise with learners around the world.
            </p>
          </div>
          <MentorRegistrationForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {mentorProfile.first_name}!
          </h1>
          <StatusBadges 
            status={mentorProfile.status} 
            subscriptionTier={mentorProfile.subscription_tier}
          />
        </div>

        {mentorProfile.status === 'pending' && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <p className="text-yellow-800">
                    Your mentor application is under review.
                  </p>
                </div>
                <Button
                  onClick={async () => {
                    const { error } = await supabase.rpc('approve_mentor', { 
                      mentor_user_id: mentorProfile.user_id 
                    });
                    if (!error) {
                      window.location.reload();
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm"
                >
                  Approve for Testing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardStats />
            <QuickActions />
          </TabsContent>

          <TabsContent value="services">
            <ServiceManagement />
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No bookings yet. Create some services to start receiving bookings!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionPlans />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">Profile management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorDashboard;
