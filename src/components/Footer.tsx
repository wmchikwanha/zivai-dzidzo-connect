
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Z</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">ZivAI</h3>
                <p className="text-orange-400">Transforming Zimbabwe through AI Education</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Accessible AI-powered education for every Zimbabwean. Learn practical skills through WhatsApp 
              in English, Shona, or Ndebele. No barriers, just opportunities.
            </p>
            
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Text "DZIDZO" to Start
            </Button>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#languages" className="text-gray-300 hover:text-white transition-colors">Languages</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">WhatsApp: +263 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">hello@zivai.co.zw</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Harare, Zimbabwe</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ZivAI. Built with ❤️ for Zimbabwe. Kushandira pamwe.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Data Protection</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
