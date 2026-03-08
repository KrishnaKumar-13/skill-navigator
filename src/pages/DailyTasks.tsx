import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Circle, Flame, Clock, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  category: string;
  completed: boolean;
}

const generateDailyTasks = (): Task[] => {
  const today = new Date().toDateString();
  const seed = today.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const allTasks: Omit<Task, "id" | "completed">[] = [
    { title: "Write a Python function to reverse a string", description: "Create a function that takes a string and returns it reversed without using built-in reverse methods.", difficulty: "easy", xp: 10, category: "Python" },
    { title: "Build a responsive navbar with CSS Flexbox", description: "Create a navigation bar that collapses into a hamburger menu on mobile screens.", difficulty: "medium", xp: 20, category: "Web Dev" },
    { title: "Implement Binary Search in Java", description: "Write a binary search algorithm that works on a sorted array and returns the index of the target element.", difficulty: "medium", xp: 20, category: "Java" },
    { title: "Create a REST API endpoint with Node.js", description: "Build a simple GET endpoint that returns a list of users from a mock database.", difficulty: "medium", xp: 25, category: "Backend" },
    { title: "Solve Two Sum problem", description: "Given an array of integers, return indices of the two numbers that add up to a specific target.", difficulty: "easy", xp: 15, category: "DSA" },
    { title: "Build a React counter component", description: "Create a counter component with increment, decrement, and reset buttons using useState.", difficulty: "easy", xp: 10, category: "React" },
    { title: "Implement a linked list in C++", description: "Create a singly linked list with insert, delete, and display operations.", difficulty: "hard", xp: 30, category: "C++" },
    { title: "Deploy a static site to Netlify", description: "Take any HTML/CSS project and deploy it using Netlify's drag-and-drop or CLI.", difficulty: "easy", xp: 10, category: "DevOps" },
    { title: "Train a simple neural network with TensorFlow", description: "Build and train a basic neural network to classify handwritten digits using the MNIST dataset.", difficulty: "hard", xp: 35, category: "Deep Learning" },
    { title: "Write SQL queries for data analysis", description: "Write 5 SQL queries including JOIN, GROUP BY, and HAVING clauses on a sample database.", difficulty: "medium", xp: 20, category: "Database" },
    { title: "Create a Docker container for a Node app", description: "Write a Dockerfile and docker-compose.yml to containerize a simple Node.js application.", difficulty: "hard", xp: 30, category: "DevOps" },
    { title: "Implement a Python decorator", description: "Create a custom decorator that logs function execution time.", difficulty: "medium", xp: 20, category: "Python" },
  ];

  const shuffled = [...allTasks].sort((a, b) => {
    const hashA = (seed * a.title.length) % 100;
    const hashB = (seed * b.title.length) % 100;
    return hashA - hashB;
  });

  return shuffled.slice(0, 6).map((t, i) => ({ ...t, id: `task-${i}`, completed: false }));
};

const difficultyColor: Record<string, string> = {
  easy: "text-accent bg-accent/10",
  medium: "text-secondary bg-secondary/10",
  hard: "text-destructive bg-destructive/10",
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const storageKey = `daily-tasks-${new Date().toDateString()}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      const fresh = generateDailyTasks();
      setTasks(fresh);
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    }
  }, [storageKey]);

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalXP = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-6 pb-20 pt-28">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Daily Tasks & Challenges</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">Fresh coding challenges every day. Complete them to earn XP and build consistency. Tasks reset daily!</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 grid grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, label: "Completed", value: `${completedCount}/${tasks.length}`, color: "text-accent" },
            { icon: Zap, label: "XP Earned", value: `${totalXP} XP`, color: "text-secondary" },
            { icon: Flame, label: "Streak", value: `${completedCount === tasks.length ? "🔥" : "Keep going!"}`, color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => toggleTask(task.id)}
              className={`group cursor-pointer rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
                task.completed ? "border-accent/40 bg-accent/5" : "border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className={`font-semibold text-card-foreground ${task.completed ? "line-through opacity-60" : ""}`}>
                      {task.title}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${difficultyColor[task.difficulty]}`}>
                      {task.difficulty}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {task.category}
                    </span>
                  </div>
                  <p className={`text-sm text-muted-foreground ${task.completed ? "opacity-50" : ""}`}>{task.description}</p>
                </div>
                <div className="flex items-center gap-1 text-secondary font-bold text-sm whitespace-nowrap">
                  <Zap className="h-4 w-4" /> {task.xp} XP
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyTasks;
