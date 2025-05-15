'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/context/UserContext'

const BookingDetailPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const booking_id = segments[segments.length - 1] // safer in case route changes

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true) // ❌ FIXED: was incorrectly using useState destructuring
  const { user } = useUser()
  const userId = user?.id

  const fetchBooking = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .eq('customer_id', userId)
      .single()

    if (error) {
      console.error('Error fetching booking:', error.message)
      setBooking(null)
    } else {
      setBooking(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!userId) {
      router.push('/profile')
      return
    }

    fetchBooking()
  }, [userId]) // ✅ FIX: added dependency

  if (loading) return <p className="p-4">Loading...</p>
  if (!booking) return <p className="p-4 text-red-500">Booking not found.</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking ID: {booking.id}</h1>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <p><strong>Created At:</strong> {new Date(booking.created_at).toLocaleString()}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Service Type:</strong> {booking.service_type}</p>
          <p>Total {booking.total}</p>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailPage
