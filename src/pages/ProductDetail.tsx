import { useParams, Link } from "react-router-dom";
import { mockProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Изделие не найдено</h1>
          <Link to="/catalog" className="text-primary hover:underline text-sm">Вернуться в коллекции</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  const statusLabel = (status: string) => {
    if (status === "in_stock") return "В наличии";
    if (status === "to_order") return "Под заказ";
    return "Нашла свой дом";
  };

  const canBuy = product.status !== "sold";

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад к коллекции
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Photos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {product.images.map((img, i) => (
              <div key={i} className="rounded-card overflow-hidden shadow-md">
                <img src={img} alt={`${product.name} — фото ${i + 1}`} className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:sticky md:top-24 md:self-start space-y-6"
          >
            <div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                product.status === "in_stock"
                  ? "bg-primary/10 text-primary"
                  : product.status === "to_order"
                  ? "bg-secondary/50 text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                {statusLabel(product.status)}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{product.name}</h1>

            <p className="text-2xl font-serif font-medium text-primary">{formatPrice(product.price)}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-sm font-semibold text-foreground mb-2">История</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{product.biography}</p>
              </div>

              <div>
                <h3 className="font-serif text-sm font-semibold text-foreground mb-2">Материалы</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m) => (
                    <span key={m} className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground">{m}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-sm font-semibold text-foreground mb-1">Рост</h3>
                <p className="text-sm text-muted-foreground">{product.height}</p>
              </div>
            </div>

            {canBuy ? (
              <Button
                size="lg"
                className="w-full rounded-lg active:scale-[0.98] transition-transform"
                onClick={() => addItem(product)}
              >
                Забрать домой
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground italic text-center py-3">
                Эта игрушка уже нашла свой дом 💛
              </p>
            )}

            {product.status === "to_order" && (
              <p className="text-xs text-muted-foreground text-center">
                Изготовление занимает 2–3 недели
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
