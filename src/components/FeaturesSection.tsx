import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Target, Trophy, Brain, Zap, BarChart3, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Map,
    title: "Level-Wise Roadmaps",
    description: "Clear progression from beginner to advanced with structured milestones at every level.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    detail: "Follow structured, level-wise learning paths designed by industry experts. Each roadmap breaks down complex skills into digestible levels — from fundamentals to mastery — so you always know what to learn next.",
    cta: { label: "Browse Roadmaps", path: "/roadmaps" },
  },
  {
    icon: Target,
    title: "Daily Tasks & Challenges",
    description: "Stay consistent with daily practice exercises and real-time coding challenges.",
    color: "text-accent",
    bg: "bg-accent/10",
    detail: "Receive fresh coding challenges every day tailored to your current skill level. Build consistency through daily practice, solve real-world problems, and earn XP to level up your profile.",
    cta: { label: "Start Learning", path: "/roadmaps" },
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, unlock achievements, and compete on leaderboards to stay motivated.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    detail: "Learning should be fun! Earn badges for completing milestones, maintain streaks for consistency, climb leaderboards, and unlock achievements as you progress through your journey.",
    cta: { label: "Get Started", path: "/auth" },
  },
  {
    icon: Brain,
    title: "Curated Resources",
    description: "Hand-picked learning materials from YouTube, Udemy, docs, and more — all in one place.",
    color: "text-accent",
    bg: "bg-accent/10",
    detail: "No more searching across platforms. We curate the best free and paid resources — videos, articles, documentation, and projects — organized by topic and difficulty level.",
    cta: { label: "Explore Resources", path: "/roadmaps" },
  },
  {
    icon: Zap,
    title: "Personalized Paths",
    description: "AI-powered recommendations that adapt to your pace, goals, and learning style.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    detail: "Our AI engine analyzes your progress, strengths, and weak areas to recommend the most effective next steps. Learn at your own pace with a path that adapts to you.",
    cta: { label: "Try It Free", path: "/auth" },
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visual dashboards showing your growth, streaks, and skill proficiency over time.",
    color: "text-accent",
    bg: "bg-accent/10",
    detail: "Track every milestone with beautiful visual dashboards. See your learning streaks, XP growth, skill proficiency charts, and completion rates — all in one place.",
    cta: { label: "View Dashboard", path: "/dashboard" },
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[0] | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              Features
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need to Learn{" "}
              <span className="text-gradient-gold">Effectively</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete ecosystem designed to take you from confused beginner to confident professional.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                onClick={() => setSelectedFeature(feature)}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-secondary/40"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-6 w-6 ${feature.color} transition-transform duration-300 group-hover:rotate-6`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${selectedFeature.bg}`}>
                <selectedFeature.icon className={`h-7 w-7 ${selectedFeature.color}`} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-card-foreground">
                {selectedFeature.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {selectedFeature.detail}
              </p>

              <Button
                onClick={() => {
                  setSelectedFeature(null);
                  navigate(selectedFeature.cta.path);
                }}
                className="w-full gap-2"
              >
                {selectedFeature.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeaturesSection;
