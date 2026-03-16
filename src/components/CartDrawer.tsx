import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, total } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Ваш выбор</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Пока здесь пусто</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-card bg-muted/50">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.product.height}</p>
                    <p className="text-sm font-medium text-primary mt-1">{formatPrice(item.product.price)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="self-start p-1 rounded hover:bg-accent transition-colors"
                    aria-label="Убрать"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Итого</span>
                <span className="font-serif text-lg font-semibold">{formatPrice(total)}</span>
              </div>
              <Button
                className="w-full rounded-lg"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/checkout");
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
