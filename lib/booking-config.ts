const bookingConfig = {
  // How long each call lasts, in minutes
  slotDurationMin: 30,

  // Gap kept clear before and after each slot, in minutes
  bufferMin: 15,

  // Earliest hour available for bookings (local Romania time, 24h)
  dayStartHour: 10,

  // Latest hour at which a slot can START (local Romania time, 24h)
  // e.g. 18 means the last slot is 18:00–18:30
  dayEndHour: 18,

  // Timezone used for all slot generation and email formatting
  timezone: "Europe/Bucharest",

  // How many hours of advance notice are required before a booking
  noticeHours: 24,

  // How many days ahead the calendar stays open for bookings
  maxDays: 30,
} as const;

export default bookingConfig;
