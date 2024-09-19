import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 py-4 md:py-8">
        <div className="text-center md:text-left md:mr-8 max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Step Into Fashion Today
          </h1>
          <p className="text-lg md:text-xl text-white mb-4">
            Discover exclusive collections and enjoy unbeatable discounts!
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold mb-6">
            GET 50% OFF ON YOUR FIRST ORDER!
          </p>
          <Link href="/shop">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full text-lg md:text-xl transition-transform transform hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="hidden md:block relative w-full md:w-1/2 lg:w-2/5 h-full">
          <Image
            src="/banner-image.png"
            layout="fill"
            objectFit="cover"
            alt="Banner Image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;





