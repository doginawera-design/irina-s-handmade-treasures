import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/products";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Index = () => {
  const featured = mockProducts.filter((p) => p.featured);
  const { addItem } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Авторская мастерская</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-foreground mb-6">
              Игрушки с душой<br />и историей
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Каждая кукла и игрушка — единственная в своём роде. Сшита вручную из натуральных тканей, наполнена теплом и вниманием к деталям.
            </p>
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-[0.98]">
                Смотреть коллекцию
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-card overflow-hidden shadow-xl">
              <img
                src={featured[0]?.images[0]}
                alt={featured[0]?.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border/50">
              <p className="font-serif text-sm font-medium">{featured[0]?.name}</p>
              <p className="text-xs text-muted-foreground">В единственном экземпляре</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About workshop */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-foreground">Мастерская</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Меня зовут Ирина Гасникова, и я создаю текстильных кукол и игрушки уже более 10 лет.
              Каждое изделие — это маленькая история, рассказанная через ткань, нитки и пуговицы.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Я использую только натуральные материалы: лён, хлопок, бархат, шерсть.
              Набивка — кедровые опилки и холлофайбер. Каждый шов — ручная работа.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured works */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-4xl font-serif font-semibold mb-10 text-center text-foreground"
        >
          Избранные работы
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="aspect-[3/4] rounded-card overflow-hidden shadow-md mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  </div>
                  <span className="font-medium text-primary text-sm whitespace-nowrap ml-4">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button variant="outline" className="rounded-lg">
              Вся коллекция
            </Button>
          </Link>
        </div>
      </section>

      {/* Custom order CTA */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-foreground">
              Хотите особенную игрушку?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Я создаю игрушки на заказ по вашим пожеланиям. Расскажите, о чём мечтаете, и мы вместе придумаем вашего идеального друга.
            </p>
            <a href="mailto:hello@gasnikova.ru">
              <Button className="rounded-lg active:scale-[0.98] transition-transform">
                Написать мне
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
