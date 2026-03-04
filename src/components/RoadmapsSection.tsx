import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const roadmaps = [
  { name: "Python", levels: 8, learners: "3.2K", emoji: "🐍", progress: 75 },
  { name: "React.js", levels: 7, learners: "2.8K", emoji: "⚛️", progress: 60 },
  { name: "Data Science", levels: 10, learners: "1.9K", emoji: "📊", progress: 45 },
  { name: "DevOps", levels: 9, learners: "1.5K", emoji: "🔧", progress: 55 },
  { name: "Machine Learning", levels: 10, learners: "2.1K", emoji: "🤖", progress: 40 },
  { name: "Cloud Computing", levels: 8, learners: "1.8K", emoji: "☁️", progress: 50 },
];

const RoadmapsSection = () => {
  return (
    <section id="roadmaps" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
            Skill Roadmaps
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Popular Learning{" "}
            <span className="text-gradient-gold">Paths</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from 50+ structured roadmaps across in-demand technical skills.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{roadmap.emoji}</span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {roadmap.levels} levels
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-card-foreground">{roadmap.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{roadmap.learners} learners</p>

              {/* Progress bar */}
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${roadmap.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-emerald"
                />
              </div>
              <p className="text-xs text-muted-foreground">{roadmap.progress}% avg completion</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" className="font-semibold">
            View All Roadmaps
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapsSection;
