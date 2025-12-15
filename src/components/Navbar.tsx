import { Button } from "@/components/ui/button";
import LumioLogo from "./LumioLogo";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <LumioLogo />
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" className="font-bold text-base px-6">
            Login
          </Button>
          <Button variant="lumio-primary" size="lg" className="text-base px-8">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;