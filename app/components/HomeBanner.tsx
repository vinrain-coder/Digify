import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 rounded-lg shadow-lg overflow-hidden">
      <div className="mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:mr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Step Into Fashion Today
          </h1>
          <p className="text-lg md:text-xl text-white mb-4">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-yellow-500 font-bold mb-6">
            GET 50% OFF!
          </p>
          <Link href="/shop">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full text-lg md:text-xl transition-transform transform hover:scale-105 animate-bounce hover:animate-none">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 relative h-64 md:h-80 lg:h-96">
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

