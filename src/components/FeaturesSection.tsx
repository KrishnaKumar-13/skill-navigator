import { motion } from "framer-motion";
import { Map, Target, Trophy, Brain, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Level-Wise Roadmaps",
    description: "Clear progression from beginner to advanced with structured milestones at every level.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Target,
    title: "Daily Tasks & Challenges",
    description: "Stay consistent with daily practice exercises and real-time coding challenges.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, unlock achievements, and compete on leaderboards to stay motivated.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Brain,
    title: "Curated Resources",
    description: "Hand-picked learning materials from YouTube, Udemy, docs, and more — all in one place.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Zap,
    title: "Personalized Paths",
    description: "AI-powered recommendations that adapt to your pace, goals, and learning style.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visual dashboards showing your growth, streaks, and skill proficiency over time.",
    color: "text-emerald",
    bg: "bg-emerald/10",
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
  return (
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
              className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
