import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Circle, Flame, Zap, ArrowLeft, Star, Award } from "lucide-react";
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
  completed: boolean;
}

const languages = [
  "Python", "Java", "JavaScript", "C++", "C", "TypeScript", "Go", "Rust",
  "Kotlin", "Swift", "PHP", "Ruby", "SQL", "Dart", "C#",
];

const taskBank: Record<string, Omit<Task, "id" | "completed">[]> = {
  Python: [
    { title: "Reverse a string without slicing", description: "Write a function that reverses a string using a loop only.", difficulty: "easy", xp: 10 },
    { title: "Implement a stack using lists", description: "Create a Stack class with push, pop, and peek methods.", difficulty: "medium", xp: 20 },
    { title: "Build a decorator for caching", description: "Write a memoize decorator that caches function results.", difficulty: "hard", xp: 35 },
    { title: "FizzBuzz with generators", description: "Implement FizzBuzz using a Python generator function.", difficulty: "easy", xp: 10 },
    { title: "Parse CSV without libraries", description: "Read and parse a CSV string handling quoted fields.", difficulty: "medium", xp: 25 },
    { title: "Implement merge sort", description: "Write a recursive merge sort algorithm.", difficulty: "medium", xp: 20 },
    { title: "Create a context manager", description: "Build a custom context manager for file handling with error logging.", difficulty: "hard", xp: 30 },
    { title: "List comprehension challenge", description: "Flatten a nested list of arbitrary depth using comprehension.", difficulty: "medium", xp: 20 },
    { title: "Build a simple calculator", description: "Create a CLI calculator supporting +, -, *, / with error handling.", difficulty: "easy", xp: 15 },
    { title: "Implement binary search", description: "Write iterative and recursive binary search functions.", difficulty: "easy", xp: 10 },
  ],
  Java: [
    { title: "Implement ArrayList from scratch", description: "Create a dynamic array class with add, remove, and get.", difficulty: "medium", xp: 25 },
    { title: "Write a Singleton pattern", description: "Implement thread-safe Singleton using double-checked locking.", difficulty: "medium", xp: 20 },
    { title: "Build a linked list", description: "Create a singly linked list with insert, delete, display.", difficulty: "hard", xp: 30 },
    { title: "Reverse an array in-place", description: "Reverse an integer array without using extra space.", difficulty: "easy", xp: 10 },
    { title: "Implement HashMap basics", description: "Build a simple hash map with put, get, and remove.", difficulty: "hard", xp: 35 },
    { title: "String palindrome checker", description: "Check if a string is a palindrome ignoring case and spaces.", difficulty: "easy", xp: 10 },
    { title: "Builder pattern", description: "Create a User class using the Builder design pattern.", difficulty: "medium", xp: 20 },
    { title: "File reader utility", description: "Read a text file and count word frequency using HashMap.", difficulty: "medium", xp: 20 },
    { title: "Implement a queue", description: "Build a queue using two stacks.", difficulty: "medium", xp: 25 },
    { title: "Matrix multiplication", description: "Multiply two NxN matrices.", difficulty: "hard", xp: 30 },
  ],
  JavaScript: [
    { title: "Debounce function", description: "Implement a debounce utility that delays function execution.", difficulty: "medium", xp: 20 },
    { title: "Deep clone an object", description: "Write a function that deep clones any JS object.", difficulty: "medium", xp: 25 },
    { title: "Promise.all polyfill", description: "Implement your own version of Promise.all.", difficulty: "hard", xp: 35 },
    { title: "Array flat method", description: "Implement Array.prototype.flat without using built-in flat.", difficulty: "medium", xp: 20 },
    { title: "Event emitter class", description: "Create an EventEmitter with on, off, and emit methods.", difficulty: "hard", xp: 30 },
    { title: "Curry function", description: "Write a generic curry function for any arity.", difficulty: "hard", xp: 30 },
    { title: "DOM todo list", description: "Build a simple todo list using vanilla JS and DOM APIs.", difficulty: "easy", xp: 15 },
    { title: "Fetch API wrapper", description: "Create a wrapper around fetch with timeout and retry.", difficulty: "medium", xp: 20 },
    { title: "Closure counter", description: "Create a counter function using closures.", difficulty: "easy", xp: 10 },
    { title: "Throttle function", description: "Implement a throttle utility for rate-limiting.", difficulty: "medium", xp: 20 },
  ],
  "C++": [
    { title: "Implement a vector class", description: "Build a dynamic array with push_back, pop_back, and resize.", difficulty: "hard", xp: 35 },
    { title: "Smart pointer basics", description: "Create a simple unique_ptr implementation.", difficulty: "hard", xp: 30 },
    { title: "Bubble sort", description: "Implement bubble sort with optimization for sorted arrays.", difficulty: "easy", xp: 10 },
    { title: "Linked list reversal", description: "Reverse a singly linked list iteratively.", difficulty: "medium", xp: 20 },
    { title: "Template max function", description: "Write a template function that returns the max of two values.", difficulty: "easy", xp: 10 },
    { title: "Binary search tree", description: "Implement BST with insert, search, and inorder traversal.", difficulty: "hard", xp: 35 },
    { title: "String class", description: "Build a simple String class with constructor, copy, and concat.", difficulty: "medium", xp: 25 },
    { title: "File I/O operations", description: "Read from a file and write sorted content to another file.", difficulty: "medium", xp: 20 },
    { title: "Operator overloading", description: "Overload +, -, and << operators for a Complex number class.", difficulty: "medium", xp: 20 },
    { title: "Stack using templates", description: "Create a generic stack class using C++ templates.", difficulty: "medium", xp: 20 },
  ],
  C: [
    { title: "Implement strlen", description: "Write your own string length function.", difficulty: "easy", xp: 10 },
    { title: "Dynamic memory allocator", description: "Build a simple malloc/free using a memory pool.", difficulty: "hard", xp: 35 },
    { title: "Linked list in C", description: "Create a singly linked list with add and delete functions.", difficulty: "medium", xp: 20 },
    { title: "File copy program", description: "Copy contents from one file to another using fread/fwrite.", difficulty: "easy", xp: 15 },
    { title: "Struct sorting", description: "Sort an array of structs by a specific field.", difficulty: "medium", xp: 20 },
    { title: "Pointer arithmetic", description: "Traverse and modify an array using only pointer arithmetic.", difficulty: "medium", xp: 20 },
    { title: "Implement strcat", description: "Write your own string concatenation function.", difficulty: "easy", xp: 10 },
    { title: "Matrix operations", description: "Add and multiply two matrices using 2D arrays.", difficulty: "medium", xp: 25 },
    { title: "Recursive factorial", description: "Compute factorial using recursion with overflow check.", difficulty: "easy", xp: 10 },
    { title: "Hash table in C", description: "Build a basic hash table with chaining for collision handling.", difficulty: "hard", xp: 30 },
  ],
  TypeScript: [
    { title: "Generic utility types", description: "Implement your own Partial, Required, and Pick types.", difficulty: "medium", xp: 25 },
    { title: "Type-safe event bus", description: "Create a strongly typed event emitter.", difficulty: "hard", xp: 35 },
    { title: "Discriminated unions", description: "Model a Shape type using discriminated unions.", difficulty: "easy", xp: 10 },
    { title: "Builder pattern with types", description: "Implement a type-safe builder using method chaining.", difficulty: "hard", xp: 30 },
    { title: "Zod schema validator", description: "Create form validation using Zod schemas.", difficulty: "medium", xp: 20 },
    { title: "Mapped types exercise", description: "Create a ReadonlyDeep type that recursively makes all props readonly.", difficulty: "hard", xp: 30 },
    { title: "Type guards", description: "Write custom type guards for a union of API responses.", difficulty: "medium", xp: 20 },
    { title: "Enum alternatives", description: "Replace enums with const assertions and derive types.", difficulty: "easy", xp: 15 },
    { title: "Generic fetch wrapper", description: "Build a typed fetch function with generic response types.", difficulty: "medium", xp: 20 },
    { title: "Interface vs Type", description: "Refactor a codebase to use interfaces where appropriate.", difficulty: "easy", xp: 10 },
  ],
  Go: [
    { title: "Goroutine ping-pong", description: "Use channels to ping-pong messages between goroutines.", difficulty: "medium", xp: 20 },
    { title: "HTTP server", description: "Build a simple REST API with net/http.", difficulty: "medium", xp: 25 },
    { title: "Implement a stack", description: "Build a stack using slices with push and pop.", difficulty: "easy", xp: 10 },
    { title: "Concurrent web scraper", description: "Fetch multiple URLs concurrently using goroutines.", difficulty: "hard", xp: 35 },
    { title: "Error handling patterns", description: "Implement custom error types with wrapping.", difficulty: "medium", xp: 20 },
    { title: "CLI tool with flags", description: "Build a command-line tool using the flag package.", difficulty: "easy", xp: 15 },
    { title: "Interface polymorphism", description: "Use interfaces to implement a shape area calculator.", difficulty: "easy", xp: 10 },
    { title: "JSON marshal/unmarshal", description: "Parse and serialize JSON with struct tags.", difficulty: "easy", xp: 10 },
    { title: "Worker pool pattern", description: "Implement a worker pool using goroutines and channels.", difficulty: "hard", xp: 30 },
    { title: "Unit testing", description: "Write table-driven tests for a string utility package.", difficulty: "medium", xp: 20 },
  ],
  Rust: [
    { title: "Ownership challenge", description: "Fix a program with ownership and borrowing errors.", difficulty: "medium", xp: 25 },
    { title: "Implement Iterator", description: "Create a custom iterator for a Fibonacci sequence.", difficulty: "medium", xp: 20 },
    { title: "Pattern matching", description: "Use match expressions to parse command-line arguments.", difficulty: "easy", xp: 10 },
    { title: "Error handling with Result", description: "Build a file parser using Result and the ? operator.", difficulty: "medium", xp: 20 },
    { title: "Traits and generics", description: "Implement a generic Sortable trait for custom types.", difficulty: "hard", xp: 35 },
    { title: "Lifetime annotations", description: "Fix lifetime issues in a struct holding references.", difficulty: "hard", xp: 30 },
    { title: "Smart pointers", description: "Use Box, Rc, and RefCell in a tree data structure.", difficulty: "hard", xp: 35 },
    { title: "String manipulation", description: "Implement common string operations using String and &str.", difficulty: "easy", xp: 10 },
    { title: "Closures and iterators", description: "Chain iterator adaptors to process a collection.", difficulty: "medium", xp: 20 },
    { title: "Struct methods", description: "Create a Rectangle struct with area and perimeter methods.", difficulty: "easy", xp: 10 },
  ],
  Kotlin: [
    { title: "Data class operations", description: "Create data classes with copy, destructuring, and equality.", difficulty: "easy", xp: 10 },
    { title: "Coroutines basics", description: "Use launch and async to fetch data concurrently.", difficulty: "medium", xp: 25 },
    { title: "Extension functions", description: "Add utility extension functions to String and List.", difficulty: "easy", xp: 15 },
    { title: "Sealed class state machine", description: "Model a UI state machine using sealed classes.", difficulty: "medium", xp: 20 },
    { title: "Collection operations", description: "Chain map, filter, and reduce on a list of data.", difficulty: "easy", xp: 10 },
    { title: "Null safety patterns", description: "Refactor nullable code using safe calls and Elvis operator.", difficulty: "medium", xp: 20 },
    { title: "DSL builder", description: "Build an HTML DSL using Kotlin's type-safe builders.", difficulty: "hard", xp: 35 },
    { title: "Delegation pattern", description: "Use 'by' keyword for property and class delegation.", difficulty: "medium", xp: 20 },
    { title: "Flow basics", description: "Create a Flow that emits values with delay.", difficulty: "medium", xp: 20 },
    { title: "Companion objects", description: "Implement factory methods using companion objects.", difficulty: "easy", xp: 10 },
  ],
  Swift: [
    { title: "Protocol-oriented design", description: "Define protocols and use protocol extensions.", difficulty: "medium", xp: 20 },
    { title: "Optionals deep dive", description: "Handle optionals with guard, if-let, and nil coalescing.", difficulty: "easy", xp: 10 },
    { title: "Closures and higher-order functions", description: "Use map, filter, reduce with trailing closure syntax.", difficulty: "easy", xp: 15 },
    { title: "Enum with associated values", description: "Model a network response using enums with payloads.", difficulty: "medium", xp: 20 },
    { title: "Codable JSON parsing", description: "Parse nested JSON using Codable protocol.", difficulty: "medium", xp: 25 },
    { title: "Generics", description: "Build a generic Stack and Queue.", difficulty: "medium", xp: 20 },
    { title: "Error handling", description: "Use throws, try, catch for a file processing function.", difficulty: "easy", xp: 10 },
    { title: "Property wrappers", description: "Create a @Clamped property wrapper.", difficulty: "hard", xp: 30 },
    { title: "Struct vs Class", description: "Demonstrate value vs reference semantics with examples.", difficulty: "easy", xp: 10 },
    { title: "Async/Await", description: "Refactor callback-based code to use async/await.", difficulty: "hard", xp: 35 },
  ],
  PHP: [
    { title: "Array manipulation", description: "Sort, filter, and map an associative array.", difficulty: "easy", xp: 10 },
    { title: "OOP basics", description: "Create classes with inheritance and interfaces.", difficulty: "medium", xp: 20 },
    { title: "Build a REST endpoint", description: "Create a simple API endpoint returning JSON.", difficulty: "medium", xp: 25 },
    { title: "String functions", description: "Implement common string operations without built-ins.", difficulty: "easy", xp: 10 },
    { title: "Database CRUD", description: "Write PDO queries for CRUD operations.", difficulty: "medium", xp: 20 },
    { title: "Form validation", description: "Validate and sanitize form input server-side.", difficulty: "easy", xp: 15 },
    { title: "Composer autoloading", description: "Set up PSR-4 autoloading with Composer.", difficulty: "medium", xp: 20 },
    { title: "Traits usage", description: "Create and use traits for shared functionality.", difficulty: "medium", xp: 20 },
    { title: "Design patterns", description: "Implement Observer pattern in PHP.", difficulty: "hard", xp: 30 },
    { title: "Unit testing", description: "Write PHPUnit tests for a utility class.", difficulty: "hard", xp: 30 },
  ],
  Ruby: [
    { title: "Blocks and iterators", description: "Use blocks with each, map, and select.", difficulty: "easy", xp: 10 },
    { title: "Metaprogramming basics", description: "Use method_missing and define_method.", difficulty: "hard", xp: 35 },
    { title: "Module mixins", description: "Create modules and include them in classes.", difficulty: "medium", xp: 20 },
    { title: "File processing", description: "Read, process, and write CSV data.", difficulty: "medium", xp: 20 },
    { title: "Symbol vs String", description: "Demonstrate when to use symbols over strings.", difficulty: "easy", xp: 10 },
    { title: "Hash operations", description: "Merge, transform, and filter hashes.", difficulty: "easy", xp: 10 },
    { title: "Proc and Lambda", description: "Compare Proc and Lambda behavior with examples.", difficulty: "medium", xp: 25 },
    { title: "Class inheritance", description: "Build a class hierarchy with method overriding.", difficulty: "easy", xp: 15 },
    { title: "Enumerable methods", description: "Chain Enumerable methods for data transformation.", difficulty: "medium", xp: 20 },
    { title: "Testing with RSpec", description: "Write RSpec tests with describe, context, and it.", difficulty: "hard", xp: 30 },
  ],
  SQL: [
    { title: "Basic SELECT queries", description: "Write queries with WHERE, ORDER BY, and LIMIT.", difficulty: "easy", xp: 10 },
    { title: "JOIN operations", description: "Write INNER, LEFT, RIGHT, and FULL JOINs.", difficulty: "medium", xp: 20 },
    { title: "Subqueries", description: "Use correlated and non-correlated subqueries.", difficulty: "medium", xp: 25 },
    { title: "Window functions", description: "Use ROW_NUMBER, RANK, and PARTITION BY.", difficulty: "hard", xp: 35 },
    { title: "GROUP BY with HAVING", description: "Aggregate data with GROUP BY and filter with HAVING.", difficulty: "easy", xp: 15 },
    { title: "Index optimization", description: "Analyze and optimize queries using EXPLAIN.", difficulty: "hard", xp: 30 },
    { title: "CRUD operations", description: "Write INSERT, UPDATE, DELETE with constraints.", difficulty: "easy", xp: 10 },
    { title: "Table design", description: "Design normalized tables with foreign keys.", difficulty: "medium", xp: 20 },
    { title: "CTEs and recursive queries", description: "Use WITH clause for complex queries.", difficulty: "hard", xp: 30 },
    { title: "Triggers and procedures", description: "Create triggers for audit logging.", difficulty: "hard", xp: 30 },
  ],
  Dart: [
    { title: "Null safety basics", description: "Use null-safe types and the ?? operator.", difficulty: "easy", xp: 10 },
    { title: "Future and async/await", description: "Fetch data asynchronously using Future.", difficulty: "medium", xp: 20 },
    { title: "Stream processing", description: "Create and transform streams of data.", difficulty: "medium", xp: 25 },
    { title: "Mixins", description: "Use mixins to share behavior between classes.", difficulty: "medium", xp: 20 },
    { title: "Extension methods", description: "Add methods to existing types using extensions.", difficulty: "easy", xp: 15 },
    { title: "Generics", description: "Build a generic repository class.", difficulty: "medium", xp: 20 },
    { title: "Collection operations", description: "Use where, map, and fold on collections.", difficulty: "easy", xp: 10 },
    { title: "Isolates", description: "Run heavy computation in a separate isolate.", difficulty: "hard", xp: 35 },
    { title: "Factory constructors", description: "Implement factory pattern with named constructors.", difficulty: "medium", xp: 20 },
    { title: "JSON serialization", description: "Serialize and deserialize JSON with dart:convert.", difficulty: "easy", xp: 10 },
  ],
  "C#": [
    { title: "LINQ basics", description: "Use LINQ to query and transform collections.", difficulty: "easy", xp: 15 },
    { title: "Async/Await pattern", description: "Implement async methods with Task and await.", difficulty: "medium", xp: 20 },
    { title: "Delegates and events", description: "Create custom events using delegates.", difficulty: "medium", xp: 25 },
    { title: "Generics", description: "Build a generic repository with constraints.", difficulty: "medium", xp: 20 },
    { title: "Interface segregation", description: "Apply ISP with focused interfaces.", difficulty: "medium", xp: 20 },
    { title: "Extension methods", description: "Add extension methods to string and IEnumerable.", difficulty: "easy", xp: 10 },
    { title: "Pattern matching", description: "Use switch expressions and is patterns.", difficulty: "easy", xp: 10 },
    { title: "Dependency injection", description: "Set up DI with Microsoft.Extensions.", difficulty: "hard", xp: 35 },
    { title: "Unit testing with xUnit", description: "Write tests using xUnit and Moq.", difficulty: "hard", xp: 30 },
    { title: "Record types", description: "Use records for immutable data models.", difficulty: "easy", xp: 10 },
  ],
};

const generateDailyTasks = (language: string): Task[] => {
  const today = new Date().toDateString();
  const seed = (today + language).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const tasks = taskBank[language] || taskBank["Python"];
  const shuffled = [...tasks].sort((a, b) => {
    const hashA = (seed * a.title.length) % 100;
    const hashB = (seed * b.title.length) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, 5).map((t, i) => ({ ...t, id: `task-${i}`, completed: false }));
};

const difficultyColor: Record<string, string> = {
  easy: "text-accent bg-accent/10 border-accent/20",
  medium: "text-secondary bg-secondary/10 border-secondary/20",
  hard: "text-destructive bg-destructive/10 border-destructive/20",
};

const BADGE_KEY = "skillpath-task-badges";

const getBadgeLevel = (totalCompleted: number): { stars: number; label: string } => {
  if (totalCompleted >= 50) return { stars: 3, label: "Master" };
  if (totalCompleted >= 20) return { stars: 3, label: "Expert" };
  if (totalCompleted >= 10) return { stars: 2, label: "Intermediate" };
  if (totalCompleted >= 5) return { stars: 2, label: "Learner" };
  if (totalCompleted >= 1) return { stars: 1, label: "Beginner" };
  return { stars: 0, label: "Newcomer" };
};

const DailyTasks = () => {
  const [selectedLang, setSelectedLang] = useState(() => localStorage.getItem("skillpath-daily-lang") || "Python");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showBadge, setShowBadge] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const storageKey = `daily-tasks-${selectedLang}-${new Date().toDateString()}`;

  useEffect(() => {
    const badgeData = JSON.parse(localStorage.getItem(BADGE_KEY) || '{"total":0}');
    setTotalCompleted(badgeData.total || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("skillpath-daily-lang", selectedLang);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      const fresh = generateDailyTasks(selectedLang);
      setTasks(fresh);
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    }
  }, [selectedLang, storageKey]);

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const wasCompleted = task.completed;
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Update total completed count
    const badgeData = JSON.parse(localStorage.getItem(BADGE_KEY) || '{"total":0}');
    const newTotal = (badgeData.total || 0) + (wasCompleted ? -1 : 1);
    localStorage.setItem(BADGE_KEY, JSON.stringify({ total: Math.max(0, newTotal) }));
    setTotalCompleted(Math.max(0, newTotal));

    if (!wasCompleted) {
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2000);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalXP = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0);
  const badge = getBadgeLevel(totalCompleted);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-6 pb-20 pt-28">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Daily Tasks</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">Pick a language, solve daily challenges, earn XP and badges!</p>
        </motion.div>

        {/* Language Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedLang === lang
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-glow"
                    : "bg-card text-muted-foreground border-border hover:border-secondary/40 hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: CheckCircle2, label: "Completed", value: `${completedCount}/${tasks.length}`, color: "text-accent" },
            { icon: Zap, label: "XP Earned", value: `${totalXP} XP`, color: "text-secondary" },
            { icon: Flame, label: "Total Done", value: `${totalCompleted}`, color: "text-destructive" },
            { icon: Award, label: "Badge", value: `${badge.label}`, color: "text-secondary" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Badge Display */}
        {badge.stars > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 rounded-xl border border-secondary/30 bg-secondary/5 p-5 flex items-center gap-4">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((s) => (
                <Star key={s} className={`h-6 w-6 transition-all ${s <= badge.stars ? "text-secondary fill-secondary" : "text-muted-foreground/20"}`} />
              ))}
            </div>
            <div>
              <p className="font-semibold text-card-foreground">{badge.label} Badge</p>
              <p className="text-xs text-muted-foreground">{totalCompleted} tasks completed lifetime</p>
            </div>
          </motion.div>
        )}

        {/* Badge popup */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -30 }}
              className="fixed bottom-8 right-8 z-50 rounded-2xl border border-secondary/40 bg-card p-5 shadow-glow flex items-center gap-3"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3].map((s) => (
                  <motion.div key={s} initial={{ rotate: -30, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: s * 0.1 }}>
                    <Star className={`h-5 w-5 ${s <= badge.stars ? "text-secondary fill-secondary" : "text-muted-foreground/20"}`} />
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="font-bold text-card-foreground text-sm">Task Completed! 🎉</p>
                <p className="text-xs text-muted-foreground">{badge.label} • {totalCompleted} total</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${difficultyColor[task.difficulty]}`}>
                      {task.difficulty}
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
