import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle, hsl(40 95% 55%) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Personalized Learning Roadmaps</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Master Any Skill with a{" "}
              <span className="text-gradient-gold">Clear Roadmap</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-primary-foreground/70">
              Stop watching random tutorials. Get a structured, level-wise learning path with daily tasks,
              real-time challenges, and gamified progress tracking.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold text-base font-semibold px-8"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base"
              >
                Explore Roadmaps
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[
                { value: "50+", label: "Skill Paths" },
                { value: "10K+", label: "Learners" },
                { value: "95%", label: "Completion Rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="animate-float">
              <img
                src={heroImage}
                alt="Learning roadmap illustration showing a winding path through floating islands with coding icons"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
