import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 rounded-lg shadow-lg overflow-hidden">
      <div className="mx-auto px-4 md:px-8 py-4 flex flex-col-reverse md:flex-row items-center justify-between">
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full text-lg md:text-xl transition-transform transform hover:scale-105 animate-bounce hover:animate-none">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 relative h-56 md:h-80 lg:h-[30rem]">
          <Image
            src="/banner-image.png"
            layout="fill"
            objectFit="contain"
            alt="Banner Image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;





