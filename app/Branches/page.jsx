'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';


const Page = () => {
  const router = useRouter();
  const [branches, setBranches] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data, error } = await supabase.from('branches').select('*');
        if (error) {
          console.log('Error fetching branches:', error.message);
          setBranches([]);
        } else {
          console.log(data)
          setBranches(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) return <div className='items-center justify-center'>Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-600 mb-8 text-center">
          Please Choose a Location
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {branches && branches.length > 0 ? (
            branches.map((branch) => (
              <div
                key={branch.id}
                className="w-full h-64 p-4 bg-slate-200 rounded shadow cursor-pointer hover:bg-slate-300"
                onClick={() => router.push('/Branches/' + branch.id)}
                // onClick={() => router.push({pathname:branch.name,query: branch.id })}

              >
                <h2 className="text-xl font-semibold text-gray-800">{branch.location}</h2>
              </div>
            ))
          ) : (
            <p>No branches found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
