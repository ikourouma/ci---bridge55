import { Phone, Mail, MessageCircle, MapPin, Shield, Clock } from 'lucide-react';

interface ServiceContactCardProps {
  title: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  verified?: boolean;
  hours?: string;
}

export function ServiceContactCard({
  title,
  name,
  address,
  phone,
  email,
  whatsapp,
  verified = true,
  hours = '24/7 Available'
}: ServiceContactCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Phone className="w-4 h-4 text-white" />
        </div>
        {title}
      </h3>
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
          🏨
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{name}</h4>
            {verified && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
            <MapPin className="w-3 h-3" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Clock className="w-3 h-3" />
            <span>{hours}</span>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      <a
        href={`mailto:${email}`}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-semibold hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700"
      >
        <Mail className="w-4 h-4" />
        {email}
      </a>

      {/* Contact Details */}
      <div className="mt-4 pt-4 border-t text-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="font-mono font-semibold">{phone}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">WhatsApp:</span>
          <span className="font-mono font-semibold">{whatsapp}</span>
        </div>
      </div>
    </div>
  );
}
