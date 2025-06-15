
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Clock, DollarSign, User, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BookingModal } from '@/components/booking/BookingModal';

interface MentorWithServices {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  expertise_areas: string[];
  hourly_rate: number;
  rating: number;
  total_reviews: number;
  location: string;
  avatar_url?: string;
  services: Service[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
}

const BrowseMentors = () => {
  const [mentors, setMentors] = useState<MentorWithServices[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<MentorWithServices[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service & { mentorName: string } | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    loadMentors();
  }, []);

  useEffect(() => {
    filterMentors();
  }, [searchTerm, mentors]);

  const loadMentors = async () => {
    try {
      const { data: mentorsData, error: mentorsError } = await supabase
        .from('mentors')
        .select('*')
        .eq('status', 'approved');

      if (mentorsError) throw mentorsError;

      if (!mentorsData) {
        setMentors([]);
        setFilteredMentors([]);
        return;
      }

      // Load services for each mentor
      const mentorsWithServices = await Promise.all(
        mentorsData.map(async (mentor) => {
          const { data: services } = await supabase
            .from('services')
            .select('*')
            .eq('mentor_id', mentor.id)
            .eq('is_active', true);

          return {
            ...mentor,
            services: services || [],
            // Mock data for fields not in the current schema
            expertise_areas: ['Career Coaching', 'Leadership'],
            hourly_rate: 80,
            rating: 4.8,
            total_reviews: 24,
            location: 'Remote'
          };
        })
      );

      setMentors(mentorsWithServices);
      setFilteredMentors(mentorsWithServices);
    } catch (error) {
      console.error('Error loading mentors:', error);
      // Show mock data if there's an error
      setMentors([]);
      setFilteredMentors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterMentors = () => {
    if (!searchTerm) {
      setFilteredMentors(mentors);
      return;
    }

    const filtered = mentors.filter(mentor => 
      mentor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise_areas.some(area => 
        area.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredMentors(filtered);
  };

  const handleBookService = (service: Service, mentorName: string) => {
    setSelectedService({ ...service, mentorName });
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding amazing mentors for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search mentors, skills, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredMentors.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No mentors found</h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? "Try adjusting your search terms or browse all mentors."
                  : "No mentors are available at the moment. Check back soon!"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Mentor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {mentor.first_name} {mentor.last_name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {mentor.location}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {mentor.rating} ({mentor.total_reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${mentor.hourly_rate}/hr
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{mentor.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.expertise_areas.map((area) => (
                          <Badge key={area} variant="secondary">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="lg:w-96">
                      <h4 className="font-semibold text-gray-900 mb-3">Available Services</h4>
                      {mentor.services.length === 0 ? (
                        <p className="text-gray-500 text-sm">No services available</p>
                      ) : (
                        <div className="space-y-3">
                          {mentor.services.slice(0, 2).map((service) => (
                            <div key={service.id} className="border rounded-lg p-3 bg-white">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-gray-900">{service.title}</h5>
                                <span className="text-lg font-semibold text-orange-600">
                                  ${service.price}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {service.description.length > 80 
                                  ? `${service.description.substring(0, 80)}...`
                                  : service.description
                                }
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {service.duration_minutes} min
                                </span>
                                <Button 
                                  size="sm"
                                  onClick={() => handleBookService(service, `${mentor.first_name} ${mentor.last_name}`)}
                                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          ))}
                          {mentor.services.length > 2 && (
                            <p className="text-sm text-gray-500 text-center">
                              +{mentor.services.length - 2} more services
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedService && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedService(null);
            }}
            service={selectedService}
          />
        )}
      </div>
    </div>
  );
};

export default BrowseMentors;
