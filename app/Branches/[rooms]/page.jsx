'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { usePathname, useRouter} from 'next/navigation';
import { LoaderPinwheel } from 'lucide-react';


export default function BranchPage() {
  const pathname = usePathname(); // e.g. "/rooms/123"
  const segments = pathname.split('/'); // ['', 'rooms', '123']
  const id = segments[2];
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id)
    const fetchrooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select("*")
          .eq('branch_id', id);
        if (error) {
          console.log('Error fetching rooms:', error.message);
          setRooms([]);
        } else {
          console.log(data)
          setRooms(data);
        }
      } catch (err) {

        console.error('Unexpected error:', err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchrooms();
  }, []);

  if (loading) return <div>
    <LoaderPinwheel />
    Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Branch: </h1>
      {rooms && rooms.length > 0 ? (
        <ul className="space-y-2">
          {rooms.map((branch) => (
            <li 
              key={branch.id} 
              className="p-4 border rounded"
              onClick={() => router.push('/Branches/' + branch.id + '/RoomDetails/' + branch.id)}
              >
              <p><strong>Name:</strong> {branch.room_type}</p>
              <p><strong>Room Type:</strong> {branch.status}</p>
              <p><strong>Price:</strong> {branch.price}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No rooms found. We are Booked Out</p>
      )}
    </div>
  );
}
