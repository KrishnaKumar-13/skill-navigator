import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Target, BookOpen, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    display_name: string | null;
    xp_points: number;
    level: number;
    streak_days: number;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("display_name, xp_points, level, streak_days")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const stats = [
    { icon: Trophy, label: "XP Points", value: profile?.xp_points ?? 0, color: "text-secondary bg-secondary/10" },
    { icon: Star, label: "Level", value: profile?.level ?? 1, color: "text-emerald bg-emerald/10" },
    { icon: Flame, label: "Day Streak", value: profile?.streak_days ?? 0, color: "text-orange-500 bg-orange-500/10" },
    { icon: Target, label: "Roadmaps", value: 0, color: "text-blue-500 bg-blue-500/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-gradient-gold">{profile?.display_name || "Learner"}</span>! 👋
            </h1>
            <p className="text-muted-foreground">Here's your learning progress overview.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Continue Learning</h2>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No active roadmaps yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Start your learning journey by enrolling in a roadmap!
            </p>
            <Link to="/roadmaps">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold font-semibold">
                Browse Roadmaps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
