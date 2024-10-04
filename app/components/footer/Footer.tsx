import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row flex-wrap justify-between pt-16 pb-12">
          <FooterList>
            <h3 className="text-lg font-bold text-white mb-4">Shop Categories</h3>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Sneakers
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Heels
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Men
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Office Shoes
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Women
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Kids
            </Link>
          </FooterList>
          
          <FooterList>
            <h3 className="text-lg font-bold text-white mb-4">Customer Service</h3>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors">
              Contact us
            </Link>
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/shipping-policy" className="hover:text-yellow-400 transition-colors">
              Shipping Policy
            </Link>
            <Link href="return-policy" className="hover:text-yellow-400 transition-colors">
              Return Policy
            </Link>
            <Link href="/faqs" className="hover:text-yellow-400 transition-colors">
              FAQs
            </Link>
          </FooterList>
          
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">About Us</h3>
            <p className="mb-4 text-slate-300">
              At our shoe store, we are dedicated to bringing you the latest fashionable and quality footwear. With us, you will never miss a chance to elevate your style.
            </p>
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} Shoepedi. All Rights Reserved.
            </p>
          </div>
          
          <FooterList>
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-blue-500 transition-colors">
                <MdFacebook size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <AiFillTwitterCircle size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-pink-500 transition-colors">
                <AiFillInstagram size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-red-600 transition-colors">
                <AiFillYoutube size={28} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
