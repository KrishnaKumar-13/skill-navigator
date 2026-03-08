import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Circle, Star, Award, Medal, Crown, Gem, Rocket, Target, Flame, BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  unlocked: boolean;
}

const defaultAchievements: Omit<Achievement, "unlocked">[] = [
  { id: "first-task", title: "First Steps", description: "Complete your very first daily task.", icon: Star, category: "Getting Started" },
  { id: "week-streak", title: "Week Warrior", description: "Complete tasks for 7 consecutive days.", icon: Flame, category: "Streaks" },
  { id: "road-explorer", title: "Road Explorer", description: "Open and explore 3 different roadmaps.", icon: BookOpen, category: "Exploration" },
  { id: "five-tasks", title: "Task Master", description: "Complete 5 daily tasks in a single day.", icon: Target, category: "Daily Tasks" },
  { id: "python-begin", title: "Pythonista", description: "Start the Python roadmap.", icon: Rocket, category: "Roadmaps" },
  { id: "web-begin", title: "Web Weaver", description: "Start the Web Development roadmap.", icon: Gem, category: "Roadmaps" },
  { id: "ten-tasks", title: "Grinder", description: "Complete a total of 10 daily tasks.", icon: Medal, category: "Daily Tasks" },
  { id: "all-daily", title: "Daily Dominator", description: "Complete all tasks in a single day.", icon: Crown, category: "Daily Tasks" },
  { id: "month-streak", title: "Monthly Legend", description: "Maintain a 30-day learning streak.", icon: Award, category: "Streaks" },
  { id: "five-roads", title: "Pathfinder", description: "Explore 5 different roadmaps.", icon: Trophy, category: "Exploration" },
  { id: "twenty-tasks", title: "Unstoppable", description: "Complete 20 daily tasks total.", icon: Star, category: "Milestones" },
  { id: "fifty-tasks", title: "Half Century", description: "Complete 50 daily tasks total.", icon: Crown, category: "Milestones" },
];

const STORAGE_KEY = "skillpath-achievements";

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: Achievement[] = JSON.parse(saved);
      // Merge with defaults to get icons back (not serializable)
      const merged = defaultAchievements.map((def) => {
        const s = parsed.find((p) => p.id === def.id);
        return { ...def, unlocked: s?.unlocked ?? false };
      });
      setAchievements(merged);
    } else {
      setAchievements(defaultAchievements.map((a) => ({ ...a, unlocked: false })));
    }
  }, []);

  const toggleAchievement = (id: string) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, unlocked: !a.unlocked } : a));
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(({ icon, ...rest }) => rest)));
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const categories = [...new Set(defaultAchievements.map((a) => a.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
              <Trophy className="h-6 w-6 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Achievements & Badges</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Mark milestones as done to unlock badges. Track your learning journey and collect them all!
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-card-foreground">Badges Unlocked</span>
            <span className="text-sm font-bold text-secondary">{unlockedCount}/{achievements.length}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-secondary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Grouped by category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements
                .filter((a) => a.category === category)
                .map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleAchievement(achievement.id)}
                    className={`group cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
                      achievement.unlocked
                        ? "border-secondary/40 bg-secondary/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-secondary/20 scale-110"
                          : "bg-muted group-hover:bg-secondary/10"
                      }`}>
                        <achievement.icon className={`h-5 w-5 transition-colors ${
                          achievement.unlocked ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-card-foreground text-sm">{achievement.title}</h3>
                          {achievement.unlocked ? (
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Achievements;
