import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deliverySettings } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    delivery: "russiaPost" as keyof typeof deliverySettings,
    address: "",
  });

  const deliveryCost = deliverySettings[form.delivery].price;
  const grandTotal = total + deliveryCost;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Пожалуйста, заполните все обязательные поля", variant: "destructive" });
      return;
    }
    // Mock order submission
    toast({
      title: "Заказ оформлен! 🎉",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Корзина пуста</h1>
          <Button variant="outline" onClick={() => navigate("/catalog")}>Перейти в коллекции</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold mb-8 text-foreground">Оформление заказа</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Как к вам обращаться" className="mt-1 rounded-lg" />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (999) 123-45-67" className="mt-1 rounded-lg" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="mt-1 rounded-lg" />
            </div>
          </div>

          <div>
            <Label>Способ доставки</Label>
            <div className="mt-2 space-y-2">
              {(Object.entries(deliverySettings) as [keyof typeof deliverySettings, typeof deliverySettings[keyof typeof deliverySettings]][]).map(
                ([key, val]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      form.delivery === key ? "border-primary bg-accent" : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={form.delivery === key}
                        onChange={() => setForm({ ...form, delivery: key })}
                        className="accent-primary"
                      />
                      <div>
                        <p className="text-sm font-medium">{val.name}</p>
                        <p className="text-xs text-muted-foreground">{val.days}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{val.price === 0 ? "Бесплатно" : formatPrice(val.price)}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {form.delivery !== "pickup" && (
            <div>
              <Label htmlFor="address">Адрес доставки</Label>
              <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Город, улица, дом, квартира" className="mt-1 rounded-lg" />
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name}</span>
                <span>{formatPrice(item.product.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span>{deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}</span>
            </div>
            <div className="flex justify-between font-serif text-lg font-semibold pt-2 border-t border-border">
              <span>Итого</span>
              <span className="text-primary">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-lg active:scale-[0.98] transition-transform">
            Подтвердить заказ
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/offer" className="underline hover:text-primary">офертой</a> и{" "}
            <a href="/privacy" className="underline hover:text-primary">политикой конфиденциальности</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
