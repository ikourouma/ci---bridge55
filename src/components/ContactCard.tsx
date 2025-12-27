import { Star, Clock, MapPin, Shield } from 'lucide-react';

interface ContactCardProps {
  businessName: string;
  businessType: string;
  license: string;
  rating: number;
  reviews: number;
  totalBookings: string;
  location: string;
  phone: string;
  whatsapp: string;
  responseTime: string;
  since: string;
}

export function ContactCard({
  businessName,
  businessType,
  license,
  rating,
  reviews,
  totalBookings,
  location,
  phone,
  whatsapp,
  responseTime,
  since
}: ContactCardProps) {
  return (
    <div className="pt-6 border-t mt-6">
      <h3 className="font-bold text-lg mb-4">Contact {businessType}</h3>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl flex-shrink-0 cursor-pointer hover:scale-110 transition-transform">
          👤
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-bold cursor-pointer hover:text-blue-600 transition-colors">{businessName}</h4>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Verified
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">License #{license}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating}
            </span>
            <span>•</span>
            <span>{reviews} reviews</span>
            <span>•</span>
            <span>{totalBookings}</span>
            <span>•</span>
            <span>Since {since}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-xs">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>{responseTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>{location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <a
          href={`tel:${phone}`}
          className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
            <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.086-1.391l-4.064-3.696z"/>
          </svg>
          Call
        </a>
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
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
        Message
      </button>

      <p className="text-xs text-center text-gray-500 mt-2">
        Contact shows based on your location
      </p>
    </div>
  );
}
