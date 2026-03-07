import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, ArrowLeft, CheckCircle2, Circle, ChevronLeft, ChevronRight, CalendarDays, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface DayData {
  date: string;
  completed: boolean;
  tasksCount: number;
}

const STORAGE_KEY = "skillpath-progress";

const getMonthDays = (year: number, month: number): DayData[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const saved: Record<string, DayData> = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const today = new Date();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
    const dayDate = new Date(year, month, i + 1);
    const isPast = dayDate <= today;
    return saved[date] || { date, completed: false, tasksCount: isPast ? 0 : -1 };
  });
};

const ProgressTracker = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [days, setDays] = useState<DayData[]>([]);

  useEffect(() => {
    setDays(getMonthDays(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  const toggleDay = (date: string) => {
    const dayDate = new Date(date);
    if (dayDate > today) return;

    const saved: Record<string, DayData> = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const current = saved[date] || { date, completed: false, tasksCount: 0 };
    current.completed = !current.completed;
    current.tasksCount = current.completed ? 1 : 0;
    saved[date] = current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setDays(getMonthDays(currentYear, currentMonth));
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const completedDays = days.filter((d) => d.completed).length;
  const activeDays = days.filter((d) => d.tasksCount >= 0).length;
  const streak = (() => {
    let count = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      const dayDate = new Date(days[i].date);
      if (dayDate > today) continue;
      if (days[i].completed) count++;
      else break;
    }
    return count;
  })();

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28 max-w-3xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Progress Tracker</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">Track your learning consistency month by month. Click any past day to mark it as completed.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 grid grid-cols-3 gap-4">
          {[
            { icon: CalendarDays, label: "Active Days", value: `${completedDays}/${activeDays}`, color: "text-accent" },
            { icon: TrendingUp, label: "Consistency", value: activeDays > 0 ? `${Math.round((completedDays / activeDays) * 100)}%` : "0%", color: "text-secondary" },
            { icon: Flame, label: "Current Streak", value: `${streak} days`, color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Calendar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-bold text-card-foreground">{MONTHS[currentMonth]} {currentYear}</h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const dayDate = new Date(day.date);
              const isFuture = dayDate > today;
              const isToday = day.date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

              return (
                <button
                  key={day.date}
                  onClick={() => toggleDay(day.date)}
                  disabled={isFuture}
                  className={`relative flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                    isFuture
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : day.completed
                      ? "bg-accent/20 text-accent hover:bg-accent/30"
                      : "text-card-foreground hover:bg-muted"
                  } ${isToday ? "ring-2 ring-secondary ring-offset-1 ring-offset-card" : ""}`}
                >
                  {new Date(day.date).getDate()}
                  {day.completed && (
                    <CheckCircle2 className="absolute -top-0.5 -right-0.5 h-3 w-3 text-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgressTracker;
