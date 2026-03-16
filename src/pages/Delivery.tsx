import { deliverySettings } from "@/data/products";
import { motion } from "framer-motion";

const Delivery = () => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-12 max-w-[65ch]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-foreground">Доставка</h1>

          <div className="prose prose-sm max-w-none space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Каждая игрушка бережно упаковывается в крафтовую бумагу и мягкую ткань, 
              чтобы приехать к вам в целости и сохранности.
            </p>

            <div className="space-y-4">
              {Object.values(deliverySettings).map((method) => (
                <div key={method.name} className="p-4 rounded-card bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif font-medium text-foreground">{method.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Сроки: {method.days}</p>
                    </div>
                    <span className="font-medium text-primary text-sm">
                      {method.price === 0 ? "Бесплатно" : formatPrice(method.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-xl font-semibold text-foreground pt-4">Важно знать</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Отправка производится в течение 1–2 рабочих дней после подтверждения заказа</li>
              <li>• Для игрушек «под заказ» срок изготовления — 2–3 недели</li>
              <li>• Трек-номер для отслеживания отправляется на email</li>
              <li>• При самовывозе в Москве — встреча в удобном для вас месте</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Delivery;
