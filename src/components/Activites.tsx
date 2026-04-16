"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_FR_SHORT = ["jan","fév","mar","avr","mai","juin","juil","août","sep","oct","nov","déc"];
const MONTHS_EN_SHORT = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const DAYS_FR = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const DAYS_EN = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const EVENT_YEAR = 2026;

// Resolve month name (full or short, FR or EN) to 0-indexed month number
function resolveMonthIdx(monthName: string): number {
  const m = monthName.toLowerCase().substring(0, 3);
  let idx = MONTHS_FR_SHORT.findIndex(s => s.startsWith(m) || m.startsWith(s.substring(0, 3)));
  if (idx === -1) idx = MONTHS_FR.findIndex(s => s.toLowerCase().startsWith(m));
  if (idx === -1) idx = MONTHS_EN_SHORT.findIndex(s => s.startsWith(m) || m.startsWith(s.substring(0, 3)));
  if (idx === -1) idx = MONTHS_EN.findIndex(s => s.toLowerCase().startsWith(m));
  return idx;
}

// Returns true if the event date is today or in the future
function isUpcoming(ev: { date: { day: string; month: string } }): boolean {
  const monthIdx = resolveMonthIdx(ev.date.month);
  if (monthIdx === -1) return false;
  const evDate = new Date(EVENT_YEAR, monthIdx, parseInt(ev.date.day));
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  return evDate >= todayStart;
}

export default function Activites() {
  const { t, lang } = useLanguage();
  const today = new Date();

  // Only show upcoming events
  const upcomingEvents = t.activities.events.filter(isUpcoming);

  // Initial calendar: jump to first upcoming event's month, or current month
  const firstEvent = upcomingEvents[0];
  const initMonth = firstEvent ? resolveMonthIdx(firstEvent.date.month) : today.getMonth();
  const initYear  = firstEvent ? EVENT_YEAR : today.getFullYear();

  const [calYear, setCalYear] = useState(initYear);
  const [calMonth, setCalMonth] = useState(initMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(
    firstEvent && resolveMonthIdx(firstEvent.date.month) === initMonth ? parseInt(firstEvent.date.day) : null
  );

  const months = lang === "fr" ? MONTHS_FR : MONTHS_EN;
  const days   = lang === "fr" ? DAYS_FR   : DAYS_EN;

  // Index upcoming events by day for the current calendar month
  const eventsThisMonth: Record<number, typeof t.activities.events[0]> = {};
  upcomingEvents.forEach((ev) => {
    const evMonthIdx = resolveMonthIdx(ev.date.month);
    if (evMonthIdx === calMonth) {
      eventsThisMonth[parseInt(ev.date.day)] = ev;
    }
  });

  // Get first day of month (0=Sun..6=Sat) → convert to Mon-first (0=Mon..6=Sun)
  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const firstDowMon = (firstDow + 6) % 7; // shift so Mon=0
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDay(null);
  };

  const selectedEvent = selectedDay ? eventsThisMonth[selectedDay] : null;

  // Build grid cells
  const cells: (number | null)[] = [
    ...Array(firstDowMon).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section id="activites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#006B3C]/10 text-[#006B3C] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C] inline-block" />
            {t.activities.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a2e] mb-5">{t.activities.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">{t.activities.subtitle}</p>
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {t.activities.items.map((a) => (
            <div key={a.title} className="rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-gray-50 overflow-hidden group">
              <div className="relative overflow-hidden h-40">
                <img src={a.photo} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: a.color }}>{a.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1a1a2e] mb-1 text-base">{a.title}</h3>
                <p className="text-gray-500 text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar section */}
        <div id="evenements">
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-[#C8102E] rounded-full" />
            {t.activities.upcomingTitle}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Calendar */}
            <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="w-9 h-9 rounded-xl border border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h4 className="font-extrabold text-[#1a1a2e] text-lg">
                  {months[calMonth]} <span className="text-[#C8102E]">{calYear}</span>
                </h4>
                <button onClick={nextMonth} className="w-9 h-9 rounded-xl border border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {days.map(d => (
                  <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase py-1">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, idx) => {
                  if (!day) return <div key={idx} />;
                  const hasEvent = !!eventsThisMonth[day];
                  const isSelected = day === selectedDay;
                  const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDay(isSelected ? null : day)}
                      className={`
                        relative h-10 w-full rounded-xl text-sm font-semibold transition-all duration-150
                        ${isSelected ? "bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/30" : ""}
                        ${!isSelected && isToday ? "bg-[#1a1a2e] text-white" : ""}
                        ${!isSelected && !isToday && hasEvent ? "text-[#C8102E] hover:bg-[#C8102E]/10" : ""}
                        ${!isSelected && !isToday && !hasEvent ? "text-gray-600 hover:bg-gray-100" : ""}
                      `}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C8102E]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] inline-block" />{lang === "fr" ? "Événement" : "Event"}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e] inline-block" />{lang === "fr" ? "Aujourd'hui" : "Today"}</span>
              </div>
            </div>

            {/* Event detail panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {selectedEvent ? (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
                  {/* Date badge */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#C8102E] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md shadow-[#C8102E]/30">
                      <span className="font-extrabold text-2xl leading-none">{selectedEvent.date.day}</span>
                      <span className="text-xs text-red-200 mt-0.5">{selectedEvent.date.month}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${selectedEvent.typeColor}15`, color: selectedEvent.typeColor }}>
                        {selectedEvent.type}
                      </span>
                      <h4 className="font-extrabold text-[#1a1a2e] text-base mt-2 leading-snug">{selectedEvent.title}</h4>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-base">📍</span>
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-base">🕐</span>
                      {selectedEvent.time}
                    </div>
                  </div>
                  <a href="#contact" className="mt-2 w-full py-3 rounded-2xl bg-[#1a1a2e] text-white text-sm font-bold text-center hover:bg-[#0f3460] transition-colors">
                    {lang === "fr" ? "Je m'inscris" : "Register"}
                  </a>
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                  <span className="text-4xl mb-3">📅</span>
                  <p className="text-gray-500 text-sm font-medium">
                    {lang === "fr" ? "Cliquez sur une date pour voir les détails de l'événement." : "Click on a date to see event details."}
                  </p>
                </div>
              )}

              {/* Upcoming events list */}
              {upcomingEvents.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {lang === "fr" ? "Prochains événements" : "Upcoming events"}
                  </p>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {upcomingEvents.map((ev) => (
                      <div key={ev.title} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-white text-xs font-extrabold" style={{ background: ev.typeColor }}>
                          <span>{ev.date.day}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1a1a2e] truncate">{ev.title}</p>
                          <p className="text-xs text-gray-400">{ev.date.month} · {ev.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
