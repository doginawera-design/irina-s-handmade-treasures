import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Навигация */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-foreground">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Мастерская</Link></li>
              <li><Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Коллекции</Link></li>
              <li><Link to="/delivery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Доставка</Link></li>
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-foreground">Соцсети</h4>
            <ul className="space-y-2">
              <li><a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">ВКонтакте</a></li>
            </ul>
          </div>

          {/* Юридическое */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-foreground">Юридическое</h4>
            <ul className="space-y-2">
              <li><Link to="/offer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Оферта</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* О мастерской */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-foreground">О мастерской</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Каждая игрушка — это история, рассказанная нитками и тканью. Сделано с любовью в мастерской Ирины Гасниковой.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ирина Гасникова · Авторские текстильные куклы и игрушки
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
