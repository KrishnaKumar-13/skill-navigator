import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: "Features", href: "/#features" },
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Compass className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">
            Skill<span className="text-gradient-gold">Path</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => { await signOut(); navigate("/"); }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button size="sm" variant="ghost" className="w-full">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={async () => { await signOut(); setIsOpen(false); navigate("/"); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="mt-2 bg-secondary text-secondary-foreground w-full">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
