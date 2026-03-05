import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, hsl(40 95% 55%) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">Start your journey today</span>
          </div>

          <h2 className="mb-6 text-3xl font-bold text-primary-foreground sm:text-5xl">
            Ready to Transform Your{" "}
            <span className="text-gradient-gold">Learning Journey</span>?
          </h2>

          <p className="mb-10 text-lg text-primary-foreground/70">
            Join thousands of students who've gone from confused beginners to confident, industry-ready professionals with SkillPath.
          </p>

          <Link to="/auth">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold text-base font-semibold px-10 py-6"
            >
              Get Started — It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <p className="mt-4 text-sm text-primary-foreground/40">No credit card required · Free forever plan available</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
