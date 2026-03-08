import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Features", href: "/#features" },
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 shadow-glow">
            <Compass className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">
            Skill<span className="text-gradient-cyan">Path</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
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
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow font-semibold">
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
          className="border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-accent bg-accent/10" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button size="sm" variant="ghost" className="w-full mt-2">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={async () => { await signOut(); setIsOpen(false); navigate("/"); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="mt-3 bg-accent text-accent-foreground w-full shadow-glow">
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
