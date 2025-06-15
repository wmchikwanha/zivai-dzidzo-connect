
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, DollarSign, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  price: number;
  mentorName: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: '',
    contactEmail: user?.email || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to book a session.",
          variant: "destructive"
        });
        return;
      }

      // Get the mentor's user_id for this service
      const { data: serviceData, error: serviceError } = await supabase
        .from('services')
        .select('mentors(user_id)')
        .eq('id', service.id)
        .single();

      if (serviceError) throw serviceError;

      const mentorUserId = serviceData?.mentors?.user_id;
      if (!mentorUserId) {
        throw new Error('Could not find mentor for this service');
      }

      // Create the booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          service_id: service.id,
          mentee_user_id: user.id,
          mentor_user_id: mentorUserId,
          scheduled_date: formData.preferredDate,
          scheduled_time: formData.preferredTime,
          contact_email: formData.contactEmail,
          message: formData.message,
          total_price: service.price,
          status: 'pending'
        });

      if (bookingError) throw bookingError;

      toast({
        title: "Booking request submitted!",
        description: `Your request for "${service.title}" has been sent to ${service.mentorName}. They will contact you soon to confirm the session.`
      });

      onClose();
      setFormData({
        preferredDate: '',
        preferredTime: '',
        message: '',
        contactEmail: user?.email || ''
      });

    } catch (error: any) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Session</DialogTitle>
        </DialogHeader>

        {/* Service Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-gray-600 flex items-center mt-1">
                <User className="w-4 h-4 mr-1" />
                with {service.mentorName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">${service.price}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {service.duration_minutes} minutes
            </span>
          </div>
          
          <p className="text-gray-700 mt-3">{service.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time *</Label>
              <Input
                id="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Mentor</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell your mentor what you'd like to focus on in this session..."
              rows={4}
            />
          </div>

          {formData.preferredDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Session Summary</h4>
              <div className="space-y-1 text-blue-800">
                <p><strong>Date:</strong> {formatDate(formData.preferredDate)}</p>
                <p><strong>Time:</strong> {formData.preferredTime}</p>
                <p><strong>Duration:</strong> {service.duration_minutes} minutes</p>
                <p><strong>Total Cost:</strong> ${service.price}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {isLoading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
