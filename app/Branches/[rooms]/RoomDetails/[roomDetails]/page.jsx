'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { usePathname, useSearchParams } from 'next/navigation';
import { AirVent, LocateFixed} from 'lucide-react';
import { SkeletonCard } from '@/components/Skeleton';
import Sidebar_Rooms from './_components/Sidebar_Rooms';
import AmazonStyleCarousel from './_components/RoomImg';



const BranchPage = ({branch}) => {
  const router = useSearchParams();
  const BranchName = router.getAll('branch')
  const pathname = usePathname();
  const segments = pathname.split('/');
  const room_id = segments[4];
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(BranchName)


  useEffect(() => {
    console.log(BranchName)
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', room_id);

        if (error) {
          console.error('Error fetching rooms:', error.message);
          setRooms([]);
        } else {
          console.log(data);
          setRooms(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [room_id]);

  if (loading) return <SkeletonCard />  ;

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Branch: {Branch}</h1> */}
      {rooms && rooms.length > 0 ? (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="p-4 ">
              <AmazonStyleCarousel room={room}  />


              <div className="my-8">
              <h3 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">{room.room_type.toUpperCase()} ROOM</h3>
              <p className="flex items-center gap-2 text-gray-700 font-medium text-sm mb-6">
                <LocateFixed className="w-4 h-4 text-primary" />
                {room.branch_name}
              </p>
            <div className="flex flex-wrap gap-x-2 my-4">
              <div className="room-details  min-h-screen pt-4">
              <div>
                <p className="font-bold text-black-600 font-lg my-5">Room Overview</p>
                <p className="text-sm font-normal tracking-wider leading-6">{room.room_description}</p>
              </div>
              <div className='my-6'>
                <p className="font-bold text-black-600 font-lg  mb-5">Room Facilities</p>
                <div className="flex flex-wrap flex-between gap-x-10 md:gap-10 gap-y-8 md:gap-y-4">
                {room.facilities.map((facility, index) => (
                  <p key={index} className='flex items-center gap-2 text-sm'>
                    <AirVent className='w-4 h-4' /> {facility}
                  </p>
                ))}
                </div>
              </div>
              </div>
              <div>
                <Sidebar_Rooms room={room} />
              </div>

            </div>
          </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
        <p>No room found.</p>
        </div>
      )}
    </div>
  );
}
export default BranchPage
