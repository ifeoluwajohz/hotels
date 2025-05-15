'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@/context/UserContext';
import DataTable from '@/components/DataTable'; // Make sure the path is correct

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.id;

  const columns = [
    {
      accessorKey: 'id',
      header: 'Booking ID',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleString(),
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'service_type',
      header: 'Service Type',
    },
  ];

  useEffect(() => {
    if (!userId) return; // ⛏️ FIX: prevent unnecessary query

    const fetchBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error.message);
      } else {
        console.log(data)
        setBookings(data || []);
      }

      setLoading(false);
    };

    fetchBookings();
  }, [userId]); // ⛏️ FIX: run useEffect when userId becomes available

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <DataTable columns={columns} data={bookings} />
      )}
    </div>
  );
};

export default Bookings;
