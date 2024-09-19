import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-18">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Caregories</h3>
            <Link href="#">Sneakers</Link>
            <Link href="#">Heels</Link>
            <Link href="#">Men</Link>
            <Link href="#">Office Shoes</Link>
            <Link href="#">Women</Link>
            <Link href="#">Kids</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href="#">Contact us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns and Exchanges</Link>
            <Link href="#">Sneakers</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              At our shoe strore we are dedicated to bring to you the latest ,
              fashionable and quality footwear. With us you will never miss a
              chance to drip.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Shoepedi. All Rights reserved
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;