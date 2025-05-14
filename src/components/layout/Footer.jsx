import { Link } from 'react-router-dom';
import { Shield, Twitter, Facebook, Instagram, Github as GitHub } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold text-white">Trust Seal</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Building trust through blockchain-verified reviews and testimonials.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/" target="_blank"  className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/" target="_blank"  className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/" target="_blank"  className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com/" target="_blank"  className="text-gray-400 hover:text-white transition-colors">
                <GitHub className="w-5 h-5" />
             </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors text-sm">Our Team</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/developers" className="text-gray-400 hover:text-white transition-colors text-sm">Developers</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link to="/compliance" className="text-gray-400 hover:text-white transition-colors text-sm">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Trust Seal. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-xs">
                Secured by blockchain technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;