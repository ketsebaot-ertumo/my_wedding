import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Couple Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
              <h3 className="text-2xl font-bold text-gray-800">
                Ketsi & Azaria
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Celebrating our love and sharing our special day with you.
              Thank you for being part of our journey.
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ for our wedding
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center md:text-left">
              Quick Links
            </h4>
            <ul className="space-y-2 text-center md:text-left">
              {['Upload Media', 'View Gallery', 'Take Photos', 'Share QR Code', 'Wedding Details'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center md:text-left">
              Contact Us
            </h4>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-rose-500" />
                <span className="text-gray-600">contact@ketsi-azaria.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-rose-500" />
                <span className="text-gray-600">+251 (91) 976-5445</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span className="text-gray-600">Joshua Campaign</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Ketsebaot & Azaria Wedding. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Designed with love for our special day
          </p>
        </div>
      </div>
    </footer>
  )
}