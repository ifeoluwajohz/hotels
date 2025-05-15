"use client";

import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { toast, Toaster } from "sonner";

const { RangePicker } = DatePicker;

const Sidebar_Rooms = ({ room }) => {
  const [bookedRanges, setBookedRanges] = useState([]);
  const [range, setRange] = useState(null);
  const [guests, setGuests] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!room?.id) return;

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("check_in, check_out")
        .eq("room_id", room.id);

      if (error) {
        console.error("Failed to fetch bookings:", error);
        return;
      }

      console.log("Fetched bookings for room:", data); // ✅ Log Supabase data
      setBookedRanges(data || []);
    };

    fetchBookings();
  }, [room.id]);

  const isDateBooked = (date) => {
    return bookedRanges.some(({ check_in, check_out }) => {
      const start = dayjs(check_in);
      const end = dayjs(check_out);
      return (
        date.isSame(start, "day") ||
        (date.isAfter(start, "day") && date.isBefore(end, "day")) ||
        date.isSame(end, "day")
      );
    });
  };

  const disabledDate = (current) => {
    return isDateBooked(current) || current.isBefore(dayjs(), "day");
  };

  const handleRangeChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setRange([dates[0], dates[1]]);
    } else {
      setRange(null);
    }
  };

  const handleBooking = async () => {
    if (!userId) {
      return toast.error("You must be logged in to book.");
    }

    if (!range || !guests) {
      return toast.error("Please select check-in, check-out, and number of guests.");
    }

    const checkIn = range[0].format("YYYY-MM-DD");
    const checkOut = range[1].format("YYYY-MM-DD");

    setLoading(true);

    const { data: existing, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", room.id)
      .or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`);

    if (fetchError) {
      console.error("Availability check failed:", fetchError);
      setLoading(false);
      return toast.error("An error occurred while checking availability.");
    }

    if (existing && existing.length > 0) {
      setLoading(false);
      return toast.error("Room already booked for selected dates.");
    }

    const { data: inserted, error: insertError } = await supabase.from("bookings").insert([
      {
        customer_id: userId,
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        total: Number(room.price),
      },
    ]);

    setLoading(false);

    if (insertError) {
      console.error("Booking insert error:", insertError);
      return toast.error("Booking failed. Try again.");
    }

    console.log("New booking inserted:", inserted); // ✅ Log newly inserted booking
    toast.success("Booking successful!");
    setRange(null);
    setGuests(0);
  };

  return (
    <div className="w-full md:min-w-2xl min-h-screen border rounded-2xl p-6 bg-white shadow-lg space-y-8">
      <Toaster richColors={true} />

      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Availability</h2>
        <p className="text-sm text-gray-500">Self check-in • Great Location</p>
      </div>

      <div className="text-sm text-gray-700">
        <span className="text-lg font-semibold underline">${room.price}</span> per ticket
      </div>

      {/* Date Range Picker */}
      <div>
        <RangePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          value={range}
          onChange={handleRangeChange}
        />
        <p className="text-xs mt-2 text-gray-500">
          Selected: {range ? `${range[0].format("YYYY-MM-DD")} to ${range[1].format("YYYY-MM-DD")}` : "N/A"}
        </p>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">Guests</label>
        <select
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full border rounded-md px-3 py-2 text-xs text-gray-700 bg-gray-50"
        >
          <option value="">Number of guests</option>
          <option value="1">1 Adult</option>
          <option value="2">2 Adults</option>
          <option value="3">3 Adults</option>
        </select>
      </div>

      {/* Cancellation Policy */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Cancellation Policy</h3>
        <div className="border rounded-xl p-4 bg-gray-100 text-xs text-gray-600">
          Non-Refundable — <span className="font-bold text-gray-800">${room.price} Total</span>
        </div>
      </div>

      <button
        className="w-full bg-black text-white rounded-md py-2 font-semibold text-sm hover:bg-gray-800 transition duration-200"
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "Processing..." : "Reserve Now"}
      </button>
    </div>
  );
};

export default Sidebar_Rooms;
