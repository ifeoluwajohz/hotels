import Image from 'next/image';

const topRooms = [
    { id: 1, title: 'Deluxe Room', image: '/room1.jpg' },
    { id: 2, title: 'Modern Room', image: '/room2.jpg' },
    { id: 3, title: 'Classic Room', image: '/room3.jpg' },
  ];

const features = [
    { id: 4, title: 'Restaurant', image: '/food.jpg' },
    { id: 5, title: 'Bar & Lounge', image: '/bar.jpg' },
    { id: 6, title: 'Outdoor Pool', image: '/pool.jpg' },
  ];

export default function Showcase() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-serif text-[#802020] mb-4">
          Comfortable Stays, Unforgettable Memories
        </h1>
        <p className="text-lg text-[#802020] mb-6">Spanish Hotel, your home away from home.</p>
        <button className="bg-[#802020] text-white px-6 py-2 rounded hover:bg-[#5c1a1a]">
          Book Now
        </button>
      </section>

      <h2 className="text-xl text-[#802020] font-semibold mb-4">Rooms</h2>

      {/* Top Rooms - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {topRooms.map((room) => (
          <div key={room.id} className="relative w-full h-64 rounded overflow-hidden shadow">
            <Image
              src={room.image}
              alt={room.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-4 w-full flex justify-center">
              <button className="bg-black bg-opacity-70 text-white px-4 py-1 rounded">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features - 3 vertical cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((item) => (
          <div key={item.id} className="relative w-full h-[400px] rounded overflow-hidden shadow">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-4 w-full flex justify-center">
              <button className="bg-black bg-opacity-70 text-white px-4 py-1 rounded">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
