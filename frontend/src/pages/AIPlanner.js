import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { MapPin, Calendar, Users, IndianRupee, Sparkles } from 'lucide-react';

const AIPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: '',
    groupSize: '',
    travelStyle: 'balanced',
    interests: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const travelStyles = [
    {
      id: 'relaxed',
      title: 'Relaxed',
      description: 'Fewer activities, more leisure time'
    },
    {
      id: 'balanced',
      title: 'Balanced',
      description: 'Mix of activities and relaxation'
    },
    {
      id: 'packed',
      title: 'Packed',
      description: 'Maximum activities and experiences'
    }
  ];

  const interestOptions = [
    'Adventure Sports',
    'Cultural Sites',
    'Nature & Wildlife',
    'Photography',
    'Food & Cuisine',
    'Shopping',
    'Nightlife',
    'Religious Sites',
    'Museums',
    'Beaches',
    'Mountains',
    'Historical Places'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const mockPlan = {
        destination: formData.destination || 'Jharkhand',
        duration: formData.duration || '3 days',
        totalBudget: formData.budget || '₹25,000',
        itinerary: [
          {
            day: 1,
            title: 'Arrival & City Exploration',
            activities: [
              { time: '10:00 AM', activity: 'Arrive at Ranchi Airport', location: 'Ranchi' },
              { time: '12:00 PM', activity: 'Check-in at Hotel', location: 'Ranchi City' },
              { time: '2:00 PM', activity: 'Visit Tagore Hill', location: 'Morabadi' },
              { time: '4:00 PM', activity: 'Explore Rock Garden', location: 'Ranchi' },
              { time: '7:00 PM', activity: 'Dinner at local restaurant', location: 'Main Road' }
            ]
          },
          {
            day: 2,
            title: 'Nature & Waterfalls',
            activities: [
              { time: '8:00 AM', activity: 'Breakfast at hotel', location: 'Hotel' },
              { time: '9:30 AM', activity: 'Drive to Hundru Falls', location: 'Hundru' },
              { time: '11:00 AM', activity: 'Explore Hundru Falls', location: 'Hundru Falls' },
              { time: '1:00 PM', activity: 'Lunch at local dhaba', location: 'Highway' },
              { time: '3:00 PM', activity: 'Visit Jonha Falls', location: 'Jonha' },
              { time: '6:00 PM', activity: 'Return to hotel', location: 'Ranchi' }
            ]
          },
          {
            day: 3,
            title: 'Cultural Experience & Departure',
            activities: [
              { time: '9:00 AM', activity: 'Visit Tribal Museum', location: 'Ranchi' },
              { time: '11:00 AM', activity: 'Shopping at local markets', location: 'Main Road' },
              { time: '1:00 PM', activity: 'Traditional lunch', location: 'Local Restaurant' },
              { time: '3:00 PM', activity: 'Check-out from hotel', location: 'Hotel' },
              { time: '4:00 PM', activity: 'Departure', location: 'Ranchi Airport' }
            ]
          }
        ]
      };
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your AI Generated Itinerary
              </h1>
              <p className="text-lg text-muted-foreground">
                Personalized travel plan for {generatedPlan.destination}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Trip Summary */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-semibold">Duration</p>
                        <p className="text-muted-foreground">{generatedPlan.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IndianRupee className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-semibold">Total Budget</p>
                        <p className="text-muted-foreground">{generatedPlan.totalBudget}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="font-semibold">Destination</p>
                        <p className="text-muted-foreground">{generatedPlan.destination}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Itinerary */}
              <div className="space-y-6">
                {generatedPlan.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-4">
                        Day {day.day}: {day.title}
                      </h3>
                      <div className="space-y-4">
                        {day.activities.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                              {activity.time}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{activity.activity}</p>
                              <p className="text-muted-foreground text-sm flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {activity.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  onClick={() => setGeneratedPlan(null)}
                  variant="outline" 
                  className="mr-4"
                >
                  Generate New Plan
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  Download Itinerary
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Travel Planner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let our AI create a personalized itinerary based on your preferences, budget, and interests
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Destination Input */}
                <div>
                  <Label htmlFor="destination" className="text-lg font-semibold mb-3 block">
                    Where do you want to go?
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination (e.g., Kashmir Valley, Goa, Rajasthan)"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="text-base"
                  />
                </div>

                {/* Duration, Budget, Group Size */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-base font-medium mb-2 block">Duration (days)</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="3 days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 days">2 days</SelectItem>
                        <SelectItem value="3 days">3 days</SelectItem>
                        <SelectItem value="5 days">5 days</SelectItem>
                        <SelectItem value="7 days">7 days</SelectItem>
                        <SelectItem value="10 days">10 days</SelectItem>
                        <SelectItem value="14 days">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block">Budget (₹)</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="₹25,000 - Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="₹15,000 - Budget">₹15,000 - Budget</SelectItem>
                        <SelectItem value="₹25,000 - Standard">₹25,000 - Standard</SelectItem>
                        <SelectItem value="₹50,000 - Premium">₹50,000 - Premium</SelectItem>
                        <SelectItem value="₹75,000 - Luxury">₹75,000 - Luxury</SelectItem>
                        <SelectItem value="₹1,00,000+ - Ultra Luxury">₹1,00,000+ - Ultra Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block">Group Size</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, groupSize: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="2 persons" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 person">1 person</SelectItem>
                        <SelectItem value="2 persons">2 persons</SelectItem>
                        <SelectItem value="3-4 persons">3-4 persons</SelectItem>
                        <SelectItem value="5-6 persons">5-6 persons</SelectItem>
                        <SelectItem value="7+ persons">7+ persons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Travel Style</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {travelStyles.map((style) => (
                      <div
                        key={style.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.travelStyle === style.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, travelStyle: style.id }))}
                      >
                        <h4 className="font-semibold mb-2">{style.title}</h4>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    Your Interests (select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer p-3 text-center justify-center ${
                          formData.interests.includes(interest)
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center pt-6">
                  <Button
                    onClick={generateItinerary}
                    disabled={isGenerating}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                        Generating Your Itinerary...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate My Itinerary with AI
                      </>
                    )}
                  </Button>
                  {!isGenerating && (
                    <p className="text-sm text-muted-foreground mt-3">
                      This will take about 30 seconds to create your personalized plan
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AIPlanner;