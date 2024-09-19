import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  return (
    <div
      className="
        sticky
        top-0
        w-full
        bg-slate-200
        z-30
        shadow-sm
        "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-3xl text-indigo-600`}
            >
              Shoepedi
            </Link>
            <div className="flex items-center gap-6 md:gap-12">
              <button className="text-gray-700 hover:text-indigo-600 transition font-semibold">
                Wishlist
              </button>
              <button className="text-gray-700 hover:text-indigo-600 transition font-semibold">
                Cart (0)
              </button>
              <button className="text-gray-700 hover:text-indigo-600 transition font-semibold">
                Menu
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
