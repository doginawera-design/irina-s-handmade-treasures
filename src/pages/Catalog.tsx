import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mockProducts, ProductCategory } from "@/data/products";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

type Filter = "all" | ProductCategory | "in_stock";

const Catalog = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return mockProducts;
    if (filter === "in_stock") return mockProducts.filter((p) => p.status === "in_stock");
    return mockProducts.filter((p) => p.category === filter);
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Все" },
    { key: "dolls", label: "Куклы" },
    { key: "animals", label: "Зверята" },
    { key: "in_stock", label: "В наличии" },
  ];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  const statusLabel = (status: string) => {
    if (status === "in_stock") return "В наличии";
    if (status === "to_order") return "Под заказ";
    return "Продана";
  };

  // Alternate card heights for masonry effect
  const heights = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]"];

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-center mb-8 text-foreground"
        >
          Коллекции
        </motion.h1>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
              className="break-inside-avoid"
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className={`${heights[i % 3]} rounded-card overflow-hidden shadow-md relative`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      product.status === "in_stock"
                        ? "bg-primary/90 text-primary-foreground"
                        : product.status === "to_order"
                        ? "bg-secondary/90 text-secondary-foreground"
                        : "bg-muted/90 text-muted-foreground"
                    }`}>
                      {statusLabel(product.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{product.description}</p>
                  </div>
                  <span className="font-medium text-primary text-sm whitespace-nowrap ml-3">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
