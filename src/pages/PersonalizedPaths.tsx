import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: "experience",
    question: "What's your current programming experience?",
    options: [
      { label: "🌱 Complete Beginner", value: "beginner" },
      { label: "📘 Know some basics", value: "basic" },
      { label: "💻 Intermediate coder", value: "intermediate" },
      { label: "🚀 Advanced developer", value: "advanced" },
    ],
  },
  {
    id: "goal",
    question: "What's your primary learning goal?",
    options: [
      { label: "🌐 Web Development", value: "web" },
      { label: "📱 Mobile App Development", value: "mobile" },
      { label: "🤖 AI & Machine Learning", value: "ai" },
      { label: "☁️ Cloud & DevOps", value: "devops" },
    ],
  },
  {
    id: "pace",
    question: "How many hours per week can you dedicate?",
    options: [
      { label: "⏰ 1-3 hours", value: "light" },
      { label: "📅 4-7 hours", value: "moderate" },
      { label: "💪 8-15 hours", value: "dedicated" },
      { label: "🔥 15+ hours", value: "intensive" },
    ],
  },
  {
    id: "style",
    question: "How do you prefer to learn?",
    options: [
      { label: "📺 Video tutorials", value: "video" },
      { label: "📖 Reading docs & articles", value: "reading" },
      { label: "🛠️ Building projects", value: "projects" },
      { label: "🧩 Solving challenges", value: "challenges" },
    ],
  },
];

interface Recommendation {
  roadmap: string;
  slug: string;
  reason: string;
  duration: string;
}

const getRecommendations = (answers: Record<string, string>): Recommendation[] => {
  const recs: Recommendation[] = [];

  if (answers.goal === "web") {
    recs.push(
      { roadmap: "Web Development", slug: "web-development", reason: "Complete full-stack web development path", duration: answers.pace === "intensive" ? "3 months" : "6 months" },
      { roadmap: "React.js", slug: "react", reason: "Master the most popular frontend framework", duration: answers.pace === "intensive" ? "2 months" : "4 months" },
      { roadmap: "Backend Development", slug: "backend", reason: "Build robust server-side applications", duration: answers.pace === "intensive" ? "3 months" : "5 months" }
    );
  } else if (answers.goal === "ai") {
    recs.push(
      { roadmap: "Python", slug: "python", reason: "Essential language for AI/ML", duration: "2 months" },
      { roadmap: "Machine Learning", slug: "machine-learning", reason: "Core ML algorithms and concepts", duration: "4 months" },
      { roadmap: "Deep Learning", slug: "deep-learning", reason: "Neural networks and advanced AI", duration: "5 months" }
    );
  } else if (answers.goal === "devops") {
    recs.push(
      { roadmap: "DevOps", slug: "devops", reason: "CI/CD, containers, and automation", duration: "4 months" },
      { roadmap: "Cloud Computing", slug: "cloud-computing", reason: "AWS, Azure, and cloud architecture", duration: "5 months" },
      { roadmap: "Backend Development", slug: "backend", reason: "Server-side fundamentals", duration: "3 months" }
    );
  } else {
    recs.push(
      { roadmap: "Python", slug: "python", reason: "Versatile language for any path", duration: "2 months" },
      { roadmap: "Java", slug: "java", reason: "Great for mobile and enterprise apps", duration: "4 months" },
      { roadmap: "Web Development", slug: "web-development", reason: "Build apps for any platform", duration: "5 months" }
    );
  }

  return recs;
};

const PersonalizedPaths = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const recommendations = getRecommendations(answers);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-6 pb-20 pt-28 max-w-2xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Personalized Path</h1>
          </div>
          <p className="text-muted-foreground">Answer a few questions and we'll recommend the best learning path for you.</p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-8 flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-secondary" : "bg-muted"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-xl font-bold text-foreground">{questions[step].question}</h2>
                <div className="space-y-3">
                  {questions[step].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(questions[step].id, option.value)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${
                        answers[questions[step].id] === option.value
                          ? "border-secondary bg-secondary/10 text-foreground"
                          : "border-border bg-card text-card-foreground hover:border-secondary/40"
                      }`}
                    >
                      <span className="text-base font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 rounded-xl border border-secondary/30 bg-secondary/5 p-6 text-center">
              <Sparkles className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-1">Your Personalized Path</h2>
              <p className="text-sm text-muted-foreground">Based on your answers, here's what we recommend:</p>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-secondary/40"
                  onClick={() => navigate(`/roadmap/${rec.slug}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <h3 className="font-semibold text-card-foreground">{rec.roadmap}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      <p className="text-xs text-secondary font-medium mt-1">Est. {rec.duration}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => { setStep(0); setAnswers({}); setShowResults(false); }}
            >
              Retake Quiz
            </Button>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PersonalizedPaths;
