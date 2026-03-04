import { Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Compass className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">
              Skill<span className="text-gradient-gold">Path</span>
            </span>
          </div>

          <div className="flex gap-8">
            {["Features", "Roadmaps", "Pricing", "About", "Contact"].map((link) => (
              <a key={link} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 SkillPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
