import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Header = () => {
  const { itemCount, setIsOpen } = useCart();
  const location = useLocation();

  const links = [
    { to: "/", label: "Мастерская" },
    { to: "/catalog", label: "Коллекции" },
    { to: "/delivery", label: "Доставка" },
  ];

  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Ирина Гасникова
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Корзина"
        >
          <ShoppingBag className="w-5 h-5 text-foreground" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
