import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-slate-100 text-center px-6">
      {/* Optional illustration */}
      <Image
        src="https://png.pngtree.com/png-clipart/20250111/original/pngtree-female-chef-cooking-preparing-food-with-skill-and-passion-png-image_19857459.png"
        alt="Coming Soon"
        width={240}
        height={240}
        className="mb-6"
      />

      <h1 className="text-5xl font-bold text-primary-500 mb-4">
        Coming Soon...
      </h1>
      <p className="text-slate-600 text-lg mb-8 max-w-md">
        The page you're looking for is still under development.
      </p>

      <Link href="/">
        <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}
