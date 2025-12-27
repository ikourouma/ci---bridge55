import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, MapPin, Calendar, Check, X, Shield, Heart, Share2, ChevronLeft } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';

const EXPERIENCE_DETAILS: Record<string, any> = {
  '1': {
    name: '3-Day Masai Mara Safari',
    location: 'Masai Mara, Kenya',
    rating: 4.9,
    reviews: 284,
    price: 890,
    duration: '3 days / 2 nights',
    groupSize: '4-12 people',
    images: ['🦁', '🐘', '🦒', '🌅', '🏕️'],
    description: 'Experience the magic of the Masai Mara on this unforgettable 3-day safari adventure. Witness the Big Five, stay in luxury tented camps, and immerse yourself in Masai culture.',
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Masai Mara',
        time: '6:00 AM - 8:00 PM',
        activities: [
          '6:00 AM: Hotel pickup in Nairobi',
          '6:30 AM: Depart for Masai Mara (5-hour drive)',
          '11:30 AM: Stop at Great Rift Valley viewpoint',
          '1:00 PM: Arrive at camp, check-in and lunch',
          '4:00 PM: First game drive',
          '7:00 PM: Sundowner and dinner at camp'
        ]
      },
      {
        day: 2,
        title: 'Full Day Game Drive',
        time: '6:00 AM - 8:00 PM',
        activities: [
          '6:00 AM: Early morning game drive',
          '9:00 AM: Return to camp for breakfast',
          '11:00 AM: Visit Masai village (optional)',
          '1:00 PM: Lunch at camp',
          '3:30 PM: Afternoon game drive',
          '6:30 PM: Sunset at Mara River',
          '8:00 PM: Bush dinner under the stars'
        ]
      },
      {
        day: 3,
        title: 'Masai Mara to Nairobi',
        time: '6:00 AM - 6:00 PM',
        activities: [
          '6:00 AM: Final morning game drive',
          '9:00 AM: Return to camp for breakfast',
          '10:00 AM: Check out',
          '11:00 AM: Depart for Nairobi',
          '5:00 PM: Arrive in Nairobi',
          '6:00 PM: Drop-off at your hotel'
        ]
      }
    ],
    included: [
      'Hotel pickup and drop-off in Nairobi',
      '4x4 safari vehicle with pop-up roof',
      'Professional English-speaking guide',
      '2 nights accommodation in luxury tented camp',
      'All meals (breakfast, lunch, dinner)',
      '6 game drives',
      'Park entrance fees',
      'Bottled water during game drives',
      'Flying Doctors insurance'
    ],
    notIncluded: [
      'International flights',
      'Visa fees ($50)',
      'Tips for guide ($10-15/day suggested)',
      'Personal expenses',
      'Alcoholic beverages',
      'Masai village visit ($20)',
      'Hot air balloon safari ($450 optional)'
    ],
    meetingPoint: 'Your hotel in Nairobi or Jomo Kenyatta International Airport',
    languages: ['English', 'Swahili', 'French', 'German'],
    cancellation: 'Free cancellation up to 7 days before the experience starts',
    requirements: [
      'Moderate physical fitness required',
      'Yellow fever vaccination certificate',
      'Valid passport (6+ months validity)',
      'Warm clothing for early mornings',
      'Comfortable walking shoes',
      'Sunscreen and hat',
      'Camera and binoculars'
    ],
    whatToBring: [
      'Passport copy',
      'Camera and extra batteries',
      'Binoculars',
      'Sunglasses and sunscreen',
      'Hat and light jacket',
      'Insect repellent',
      'Personal medications',
      'Small backpack'
    ]
  }
};

export function ExperienceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [showFullItinerary, setShowFullItinerary] = useState(false);

  const experience = EXPERIENCE_DETAILS[id || '1'] || EXPERIENCE_DETAILS['1'];
  const totalPrice = experience.price * travelers;

  const handleBook = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    navigate(`/checkout?service=experience&name=${encodeURIComponent(experience.name)}&date=${selectedDate}&travelers=${travelers}&total=${totalPrice}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />

      {/* Hero Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/experiences/results')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to experiences
          </button>
          <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-9xl">
              {experience.images[0]}
            </div>
            {experience.images.slice(1, 5).map((img: string, i: number) => (
              <div key={i} className="bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-6xl">
                {img}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-3">{experience.name}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{experience.rating}</span>
                    <span className="text-gray-600">({experience.reviews} reviews)</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border rounded-lg hover:bg-gray-50">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 border rounded-lg hover:bg-gray-50">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
                <p className="text-gray-700 leading-relaxed">{experience.description}</p>
              </div>

              {/* Detailed Itinerary */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Detailed Itinerary</h2>
                  <button
                    onClick={() => setShowFullItinerary(!showFullItinerary)}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    {showFullItinerary ? 'Show Less' : 'Show Full Details'}
                  </button>
                </div>
                <div className="space-y-6">
                  {experience.itinerary.map((day: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{day.title}</h3>
                          <p className="text-sm text-gray-600">{day.time}</p>
                        </div>
                      </div>
                      {(showFullItinerary || idx === 0) && (
                        <ul className="space-y-2 ml-2">
                          {day.activities.map((activity: string, i: number) => (
                            <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-600" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {experience.included.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-600" />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {experience.notIncluded.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {experience.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">What to Bring</h3>
                  <ul className="space-y-2">
                    {experience.whatToBring.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meeting Point & Languages */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-1">Meeting Point</h4>
                  <p className="text-sm text-gray-700">{experience.meetingPoint}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Languages</h4>
                  <div className="flex gap-2">
                    {experience.languages.map((lang: string) => (
                      <span key={lang} className="px-3 py-1 bg-white rounded-full text-sm">{lang}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Cancellation Policy</h4>
                  <p className="text-sm text-green-600">{experience.cancellation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24 mb-6">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ${experience.price}
                  <span className="text-lg text-gray-600 font-normal"> / person</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{experience.rating}</span>
                  <span className="text-gray-600">({experience.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'traveler' : 'travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span>${experience.price} × {travelers} travelers</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-blue-600">${totalPrice}</span>
              </div>

              <button
                onClick={handleBook}
                disabled={!selectedDate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed mb-3"
              >
                Reserve Now
              </button>

              <p className="text-xs text-center text-gray-500 mb-4">
                You won't be charged yet
              </p>

              {/* Host/Operator Information - Now inside sticky card */}
              <div className="pt-6 border-t">
                <h3 className="font-bold text-lg mb-4">Your Host</h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-bold">Safari Kings Tours</h4>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">License #KE-2341</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        4.9
                      </span>
                      <span>•</span>
                      <span>284 reviews</span>
                      <span>•</span>
                      <span>1,247 trips</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Responds within 1 hour</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Nairobi, Kenya</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <a
                    href="tel:+254712345678"
                    className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
                      <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.086-1.391l-4.064-3.696z"/>
                    </svg>
                    Call
                  </a>
                  <a
                    href="https://wa.me/254712345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>

                <button className="w-full py-2.5 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Host
                </button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Contact shows based on your location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
