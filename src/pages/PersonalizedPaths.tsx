import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

interface Language {
  name: string;
  emoji: string;
  category: string;
  description: string;
  slug: string;
}

const allLanguages: Language[] = [
  { name: "Python", emoji: "🐍", category: "General Purpose", description: "Versatile, beginner-friendly, great for AI/ML and scripting.", slug: "python" },
  { name: "Java", emoji: "☕", category: "General Purpose", description: "Enterprise-grade, cross-platform, strongly typed.", slug: "java" },
  { name: "JavaScript", emoji: "🌐", category: "Web", description: "The language of the web — frontend and backend.", slug: "web-development" },
  { name: "TypeScript", emoji: "🔷", category: "Web", description: "JavaScript with types for safer, scalable code.", slug: "web-development" },
  { name: "C", emoji: "⚙️", category: "Systems", description: "Low-level systems programming and embedded systems.", slug: "cpp" },
  { name: "C++", emoji: "🔧", category: "Systems", description: "High-performance applications, games, and systems.", slug: "cpp" },
  { name: "C#", emoji: "💜", category: "General Purpose", description: "Microsoft ecosystem, game dev with Unity, enterprise apps.", slug: "java" },
  { name: "Go", emoji: "🐹", category: "Systems", description: "Fast, simple, built for cloud and microservices.", slug: "backend" },
  { name: "Rust", emoji: "🦀", category: "Systems", description: "Memory-safe systems programming without garbage collection.", slug: "backend" },
  { name: "Kotlin", emoji: "🟣", category: "Mobile", description: "Modern Android development, concise and safe.", slug: "java" },
  { name: "Swift", emoji: "🍎", category: "Mobile", description: "iOS and macOS app development by Apple.", slug: "java" },
  { name: "Dart", emoji: "🎯", category: "Mobile", description: "Powers Flutter for cross-platform mobile apps.", slug: "web-development" },
  { name: "PHP", emoji: "🐘", category: "Web", description: "Server-side scripting, powers WordPress and Laravel.", slug: "backend" },
  { name: "Ruby", emoji: "💎", category: "Web", description: "Elegant syntax, great for web apps with Rails.", slug: "backend" },
  { name: "SQL", emoji: "🗃️", category: "Data", description: "Query and manage relational databases.", slug: "data-science" },
  { name: "R", emoji: "📊", category: "Data", description: "Statistical computing and data visualization.", slug: "data-science" },
  { name: "Scala", emoji: "🔴", category: "General Purpose", description: "Functional + OOP on the JVM, big data with Spark.", slug: "java" },
  { name: "Perl", emoji: "🐪", category: "General Purpose", description: "Text processing and system administration.", slug: "backend" },
  { name: "Haskell", emoji: "λ", category: "Functional", description: "Pure functional programming with strong types.", slug: "backend" },
  { name: "Elixir", emoji: "💧", category: "Functional", description: "Scalable, fault-tolerant apps on the Erlang VM.", slug: "backend" },
  { name: "Lua", emoji: "🌙", category: "Scripting", description: "Lightweight scripting for games and embedded systems.", slug: "python" },
  { name: "MATLAB", emoji: "📐", category: "Data", description: "Numerical computing and engineering simulations.", slug: "data-science" },
  { name: "Shell/Bash", emoji: "🖥️", category: "DevOps", description: "Automate tasks and manage servers via command line.", slug: "devops" },
];

const categories = [...new Set(allLanguages.map(l => l.category))];

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

const PersonalizedPaths = () => {
  const [mode, setMode] = useState<"choose" | "quiz" | "results">("choose");
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [filterCat, setFilterCat] = useState<string>("All");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const filteredLangs = filterCat === "All" ? allLanguages : allLanguages.filter(l => l.category === filterCat);

  const handleSelectLang = (lang: Language) => {
    setSelectedLang(lang);
    setStep(0);
    setAnswers({});
    setMode("quiz");
  };

  const handleAnswer = (qId: string, value: string) => {
    const updated = { ...answers, [qId]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300);
    } else {
      setTimeout(() => setMode("results"), 400);
    }
  };

  const getDuration = () => {
    if (answers.pace === "intensive") return "2-3 months";
    if (answers.pace === "dedicated") return "3-4 months";
    if (answers.pace === "moderate") return "5-6 months";
    return "6-8 months";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-6 pb-20 pt-28 max-w-4xl">
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
          <p className="text-muted-foreground">Choose a language, answer a few questions, and get your tailored learning roadmap.</p>
        </motion.div>

        {mode === "choose" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    filterCat === cat
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card text-muted-foreground border-border hover:border-secondary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Language grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLangs.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleSelectLang(lang)}
                  className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-secondary/40"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{lang.emoji}</span>
                    <h3 className="font-semibold text-card-foreground">{lang.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{lang.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-secondary font-medium">
                    <Code2 className="h-3.5 w-3.5" /> {lang.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {mode === "quiz" && selectedLang && (
          <>
            <div className="mb-6 rounded-xl border border-secondary/20 bg-secondary/5 p-4 flex items-center gap-3">
              <span className="text-2xl">{selectedLang.emoji}</span>
              <div>
                <p className="font-semibold text-foreground">{selectedLang.name}</p>
                <p className="text-xs text-muted-foreground">{selectedLang.description}</p>
              </div>
            </div>

            <div className="mb-8 flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-secondary" : "bg-muted"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="mb-6 text-xl font-bold text-foreground">{questions[step].question}</h2>
                <div className="space-y-3">
                  {questions[step].options.map(option => (
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
        )}

        {mode === "results" && selectedLang && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 rounded-xl border border-secondary/30 bg-secondary/5 p-6 text-center">
              <Sparkles className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-1">Your {selectedLang.name} Learning Path</h2>
              <p className="text-sm text-muted-foreground">Estimated duration: <span className="text-secondary font-medium">{getDuration()}</span></p>
            </div>

            <div className="space-y-4">
              {[
                { title: `${selectedLang.name} Fundamentals`, desc: "Core syntax, data types, and basic concepts.", duration: "2-3 weeks" },
                { title: "Intermediate Concepts", desc: "OOP, data structures, error handling, and modules.", duration: "3-4 weeks" },
                { title: "Advanced Topics", desc: "Design patterns, testing, performance optimization.", duration: "4-6 weeks" },
                { title: "Build Real Projects", desc: "Apply your skills by building hands-on projects.", duration: "4-8 weeks" },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-secondary/40"
                  onClick={() => navigate(`/roadmap/${selectedLang.slug}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <h3 className="font-semibold text-card-foreground">{phase.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.desc}</p>
                      <p className="text-xs text-secondary font-medium mt-1">Est. {phase.duration}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full" onClick={() => { setMode("choose"); setSelectedLang(null); setAnswers({}); setStep(0); }}>
              Choose Another Language
            </Button>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PersonalizedPaths;
