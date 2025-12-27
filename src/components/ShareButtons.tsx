import { Download, Mail, MessageSquare, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  confirmationNumber: string;
  service: string;
}

export function ShareButtons({ confirmationNumber, service }: ShareButtonsProps) {
  const handleDownload = () => {
    // In production, this would generate and download a PDF
    alert(`Downloading ${service} confirmation ${confirmationNumber}...`);
  };

  const handleEmail = () => {
    const subject = `Your ${service} Confirmation - ${confirmationNumber}`;
    const body = `Your ${service} has been confirmed. Confirmation number: ${confirmationNumber}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSMS = () => {
    const message = `Your ${service} is confirmed! Confirmation: ${confirmationNumber}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${service} Confirmation`,
          text: `Confirmation number: ${confirmationNumber}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleEmail();
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        <span className="text-sm">Download</span>
      </button>
      
      <button
        onClick={handleEmail}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span className="text-sm">Email</span>
      </button>
      
      <button
        onClick={handleSMS}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm">Text</span>
      </button>
      
      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>
    </div>
  );
}
