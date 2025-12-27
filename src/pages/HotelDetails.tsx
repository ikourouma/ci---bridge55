import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  MapPin, Star, Wifi, Coffee, Waves, Wind, Car, Utensils, 
  Dumbbell, Sparkles, Shield, Users, ChevronLeft, ChevronRight,
  Calendar, Phone, Mail, Check, X
} from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ContactCard } from '../components/ContactCard';
import { DatePicker } from '../components/DatePicker';

// Extended hotel data (in real app, this would come from API)
const HOTEL_DETAILS: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Giraffe Manor',
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    rating: 4.9,
    reviews: 2847,
    price: 650,
    originalPrice: 850,
    description: 'Experience the magic of Giraffe Manor, one of Nairobi\'s most iconic buildings. Built in 1932, this elegant manor is set in 12 acres of private land within 140 acres of indigenous forest in the Langata suburb of Nairobi. The manor is famous for its herd of resident Rothschild giraffes who visit the property every morning and evening, poking their long necks into the windows in hopes of a treat. Guests can interact with these gentle giants, feed them at breakfast, and even get a giraffe kiss! The luxurious accommodation features individually decorated rooms with period furniture, Persian rugs, and spacious en-suite bathrooms.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200'
    ],
    amenities: {
      essentials: ['Free WiFi', 'Air Conditioning', 'Heating', 'Private Bathroom', 'Toiletries', 'Hair Dryer'],
      dining: ['Breakfast Included', 'Restaurant', 'Bar', 'Room Service', 'Tea/Coffee Maker'],
      activities: ['Safari Tours', 'Giraffe Feeding', 'Garden Tours', 'Wildlife Viewing', 'Photography Sessions'],
      services: ['Concierge', '24hr Front Desk', 'Laundry', 'Airport Transfer', 'Butler Service', 'Turndown Service'],
      facilities: ['Pool', 'Garden', 'Library', 'Terrace', 'Lounge', 'Gift Shop']
    },
    rooms: [
      {
        id: 1,
        name: 'Deluxe Garden Room',
        capacity: 2,
        beds: '1 King Bed',
        size: '35 m²',
        price: 650,
        features: ['Garden View', 'Giraffe Visits', 'Period Furniture', 'En-suite Bathroom']
      },
      {
        id: 2,
        name: 'Karen Blixen Suite',
        capacity: 2,
        beds: '1 King Bed',
        size: '45 m²',
        price: 850,
        originalPrice: 950,
        features: ['Forest View', 'Separate Sitting Room', 'Luxury Bathroom', 'Private Balcony']
      },
      {
        id: 3,
        name: 'Garden Manor Suite',
        capacity: 3,
        beds: '1 King + 1 Single',
        size: '55 m²',
        price: 1050,
        features: ['Panoramic Views', 'Spacious Living Area', 'Luxury Amenities', 'Walk-in Closet']
      }
    ],
    highlights: [
      'Feed resident Rothschild giraffes at breakfast',
      'Historic 1930s manor house with elegant decor',
      'Set in 140 acres of indigenous forest',
      'Luxurious period-style rooms with modern amenities',
      'Award-winning fine dining restaurant',
      'Exclusive boutique hotel with only 12 rooms'
    ],
    recentReviews: [
      {
        id: 1,
        guest: 'Sarah Johnson',
        rating: 5,
        date: 'Nov 2025',
        comment: 'Absolutely magical experience! Feeding the giraffes at breakfast was a dream come true. The staff was incredibly attentive and the rooms are beautifully appointed. Worth every penny!',
        helpful: 47
      },
      {
        id: 2,
        guest: 'Michael Chen',
        rating: 5,
        date: 'Oct 2025',
        comment: 'Once in a lifetime experience. The manor is stunning, the food is excellent, and waking up to giraffes outside your window is surreal. Highly recommend the butler service.',
        helpful: 32
      },
      {
        id: 3,
        guest: 'Emma Williams',
        rating: 4,
        date: 'Oct 2025',
        comment: 'Beautiful property with amazing giraffe encounters. Rooms are luxurious and historic. Only minor note - book well in advance as it fills up quickly!',
        helpful: 28
      }
    ],
    policies: {
      checkIn: '2:00 PM - 6:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 7 days before arrival',
      children: 'Children 12 years and above are welcome',
      pets: 'Pets are not allowed'
    }
  }
};

export function HotelDetails() {
  const { id } = useParams();
  const hotel = HOTEL_DETAILS[id || '1'];
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('2025-11-15');
  const [checkOut, setCheckOut] = useState('2025-11-18');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <Link to="/stays/results" className="text-blue-600 hover:underline">
            ← Back to results
          </Link>
        </div>
      </div>
    );
  }

  // Calculate nights from check-in/out (simplified - you'd use proper date parsing)
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const nights = calculateNights();
  
  // Get selected room or default to first room
  const currentRoom = selectedRoom !== null 
    ? hotel.rooms.find((r: any) => r.id === selectedRoom) 
    : hotel.rooms[0];
  
  // Calculate price per night based on selected room and guests
  const basePrice = currentRoom?.price || hotel.price;
  const pricePerNight = basePrice + (guests > 2 ? (guests - 2) * 50 : 0);
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const totalPrice = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <SharedTopNav />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link to="/stays/results" className="hover:text-blue-600">Stays</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{hotel.name}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-2 mb-6">
          {/* Main Image */}
          <div className="md:col-span-3 h-96 relative rounded-xl overflow-hidden group">
            <img 
              src={hotel.images[selectedImage]} 
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setSelectedImage((selectedImage - 1 + hotel.images.length) % hotel.images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setSelectedImage((selectedImage + 1) % hotel.images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="space-y-2">
            {hotel.images.slice(0, 4).map((img: string, idx: number) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === idx ? 'border-blue-600 shadow-lg' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-semibold">{hotel.rating}</span>
                      <span>({hotel.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Property Highlights</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {hotel.highlights.map((highlight: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="space-y-6">
                {Object.entries(hotel.amenities).map(([category, items]: [string, any]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 capitalize">{category}</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {items.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Room Options</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room: any) => (
                  <div 
                    key={room.id} 
                    className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all cursor-pointer ${
                      selectedRoom === room.id 
                        ? 'border-blue-600 shadow-lg bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          {selectedRoom === room.id && (
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Up to {room.capacity} guests
                          </span>
                          <span>{room.beds}</span>
                          <span>{room.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.features.map((feature: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        {room.originalPrice && (
                          <div className="text-gray-400 line-through text-sm mb-1">
                            ${room.originalPrice}
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${room.price}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">per night</div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoom(room.id);
                            // Scroll to booking panel on mobile
                            if (window.innerWidth < 1024) {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
                            selectedRoom === room.id
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {selectedRoom === room.id ? 'Selected' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
              <div className="space-y-4">
                {hotel.recentReviews.map((review: any) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{review.guest}</div>
                        <div className="text-sm text-gray-600">{review.date}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="text-sm text-gray-500">
                      {review.helpful} people found this helpful
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-gray-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">House Rules & Policies</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold mb-1">Check-in</div>
                  <div className="text-gray-700">{hotel.policies.checkIn}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Check-out</div>
                  <div className="text-gray-700">{hotel.policies.checkOut}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Cancellation</div>
                  <div className="text-gray-700">{hotel.policies.cancellation}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Children</div>
                  <div className="text-gray-700">{hotel.policies.children}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {currentRoom?.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ${currentRoom.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">
                    ${basePrice}
                  </span>
                  <span className="text-gray-600">/night</span>
                </div>
                {currentRoom?.originalPrice && (
                  <div className="text-green-600 font-semibold">
                    Save ${currentRoom.originalPrice - basePrice} per night
                  </div>
                )}
                {selectedRoom && (
                  <div className="mt-2 text-sm text-gray-600">
                    Room: <span className="font-semibold">{currentRoom?.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <DatePicker
                  value={checkIn}
                  onChange={setCheckIn}
                  label="Check-in"
                  required
                />

                <DatePicker
                  value={checkOut}
                  onChange={setCheckOut}
                  label="Check-out"
                  min={checkIn}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests (+$50/night)</option>
                    <option value="4">4 Guests (+$100/night)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>${pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>${subtotal}</span>
                </div>
                {guests > 2 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Extra guest fee ({guests - 2} guest{guests - 2 !== 1 ? 's' : ''})</span>
                    <span>${(guests - 2) * 50 * nights}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              <Link 
                to={`/checkout?service=stay&name=${encodeURIComponent(hotel.name)}&checkIn=${checkIn}&checkOut=${checkOut}&total=${totalPrice}`}
                className="block w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl mb-3 text-center"
              >
                Continue to Payment
              </Link>

              <p className="text-center text-sm text-gray-600 mb-4">
                You won't be charged yet
              </p>

              <ContactCard
                businessName="Safari Collection"
                businessType="Hotel"
                license="KE-HTL-1932"
                rating={4.9}
                reviews={2847}
                totalBookings="15,000+ stays"
                location="Nairobi, Kenya"
                phone="+254712345678"
                whatsapp="+254712345678"
                responseTime="Responds within 30 minutes"
                since="1932"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
