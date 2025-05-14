'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/context/UserContext'
import DataTable from '@/components/DataTable' // adjust path accordingly

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const userId = user?.id

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
    // Add more fields if needed
  ]

  useEffect(() => {
    if (!userId) return

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
      } else {
        console.log(data)
        setBookings(data)
      }

      setLoading(false)
    }

    fetchBookings()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={bookings} />
      )}
    </div>
  )
}

export default Bookings
