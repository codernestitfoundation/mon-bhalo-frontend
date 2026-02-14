import { FaArrowRight, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Button } from '../ui/button';
import Logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
   <footer className=" font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 ">
          
          {/* Branding Card */}
          <div className="flex flex-col items-center text-center text-primary">
            <div className="flex items-center gap-1 ">
                <img src={Logo} alt="Mon Bhalo Logo" className='w-40 h-40' />
            </div>
            
            <p className="text-primary/80 text-sm leading-relaxed my-4 text-justify">
             Mon Bhalo? is a leading Mental Health Platform in Bangladesh, dedicated to providing accessible and affordable mental health support. 
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-2">
              <a href="#" className="w-12 h-12  hover:bg-primary/10 rounded-full flex items-center justify-center transition">
                <span className="text-3xl"><FaFacebook /></span>
              </a>
              <a href="#" className="w-12 h-12  hover:bg-primary/10 rounded-full flex items-center justify-center transition">
                <span className="text-3xl"><FaInstagram /></span>
              </a>
              <a href="#" className="w-12 h-12  hover:bg-primary/10 rounded-full flex items-center justify-center transition">
                <span className="text-3xl"><FaYoutube /></span>
              </a>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="lg:pl-8">
            <h4 className="text-lg font-bold text-primary/80 mb-8">Get In Touch</h4>
            <div className="flex flex-col gap-6 text-primary/80">
              <a href="mailto:support@monbhalo.com" className="hover:text-primary transition">support@monbhalo.com</a>
              <a href="tel:+8801700000000" className="hover:text-primary transition">+880 17000 00000</a>
              <p>Joydebpur, Gazipur, Dhaka.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-primary/80 mb-8">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-primary/80">
              <a href="#" className="hover:text-primary transition">Home</a>
              <a href="#" className="hover:text-primary transition">Careers</a>
              <a href="#" className="hover:text-primary transition">FAQs</a>
              <a href="#" className="hover:text-primary transition">About</a>
              <a href="#" className="hover:text-primary transition">Price Plan</a>
              <a href="#" className="hover:text-primary transition">Contact</a>
              <a href="#" className="hover:text-primary transition">Features</a>
              <a href="#" className="hover:text-primary transition">Products</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-primary/80 mb-8">Newsletter</h4>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter email.." 
                className="w-full py-3 px-6 border text-primary/80 border-gray-200 rounded-full focus:outline-none focus:border-primary transition"
              />
              <Button className="w-full bg-primary/80 text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary transition">
                Subscribe <FaArrowRight />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-6 py-8 border-t border-primary/10 text-center">
          <p className="text-primary/80 text-sm">
          Copyright © 2026 || Mon Bhalo? All rights reserved. 
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;