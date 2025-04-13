import Image from 'next/image';

function LoadPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-800 p-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logo.png" // Change to your image path
          alt="Loading Logo"
          width={80}
          height={80}
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Just a moment...
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-gray-500 mt-2">
        We&apos;re getting things ready
        <span className="loading-dots ml-1">...</span>
      </p>

      {/* Spinner */}
      <div className="mt-10 w-10 h-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}

export default LoadPage;
