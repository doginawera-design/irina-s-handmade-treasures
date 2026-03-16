import { useState } from "react";
import { mockProducts, Product, Order } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, ShoppingCart, Settings, LogOut, Plus, Pencil, Trash2 } from "lucide-react";

type Tab = "orders" | "products" | "settings";

// Mock orders
const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Мария Петрова",
    phone: "+7 (916) 123-45-67",
    email: "maria@example.com",
    deliveryMethod: "СДЭК",
    address: "Москва, ул. Пушкина, д. 10",
    items: [{ productId: "1", quantity: 1 }],
    total: 4950,
    status: "new",
    createdAt: "2026-03-15",
  },
  {
    id: "ORD-002",
    customerName: "Анна Сидорова",
    phone: "+7 (903) 987-65-43",
    email: "anna@example.com",
    deliveryMethod: "Почта России",
    address: "Санкт-Петербург, Невский пр., д. 50",
    items: [{ productId: "2", quantity: 1 }, { productId: "4", quantity: 1 }],
    total: 7050,
    status: "paid",
    createdAt: "2026-03-14",
  },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deliveryCost, setDeliveryCost] = useState("350");
  const { toast } = useToast();

  const statusLabel = (s: string) => {
    if (s === "new") return "Новый";
    if (s === "paid") return "Оплачен";
    return "Отправлен";
  };

  const statusColor = (s: string) => {
    if (s === "new") return "bg-primary/10 text-primary";
    if (s === "paid") return "bg-secondary/50 text-secondary-foreground";
    return "bg-accent text-accent-foreground";
  };

  const cycleStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next = o.status === "new" ? "paid" : o.status === "paid" ? "shipped" : "new";
        return { ...o, status: next as Order["status"] };
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Товар удалён" });
  };

  const saveProduct = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => (p.id === product.id ? product : p));
      return [...prev, product];
    });
    setEditingProduct(null);
    toast({ title: "Товар сохранён" });
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "orders", label: "Заказы", icon: <ShoppingCart className="w-4 h-4" /> },
    { key: "products", label: "Товары", icon: <Package className="w-4 h-4" /> },
    { key: "settings", label: "Настройки", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold text-foreground">Мастерская</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.location.href = "/"}>
            <LogOut className="w-4 h-4 mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setEditingProduct(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {tab === "orders" && (
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-foreground">Заказы</h2>
            {orders.length === 0 && <p className="text-muted-foreground text-sm">Заказов пока нет</p>}
            {orders.map((order) => (
              <div key={order.id} className="p-4 rounded-card border border-border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                    <h3 className="font-medium text-foreground">{order.customerName}</h3>
                    <p className="text-xs text-muted-foreground">{order.phone} · {order.email}</p>
                  </div>
                  <button
                    onClick={() => cycleStatus(order.id)}
                    className={`text-xs px-3 py-1 rounded-full font-medium cursor-pointer ${statusColor(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{order.deliveryMethod} · {order.address}</p>
                  <p className="mt-1">
                    {order.items.map((item) => {
                      const p = mockProducts.find((pr) => pr.id === item.productId);
                      return p?.name || item.productId;
                    }).join(", ")}
                  </p>
                  <p className="mt-1 font-medium text-foreground">{order.total.toLocaleString("ru-RU")} ₽</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{order.createdAt}</p>
              </div>
            ))}
          </div>
        )}

        {/* Products */}
        {tab === "products" && !editingProduct && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-foreground">Товары</h2>
              <Button
                size="sm"
                onClick={() =>
                  setEditingProduct({
                    id: String(Date.now()),
                    name: "",
                    description: "",
                    biography: "",
                    price: 0,
                    category: "dolls",
                    status: "in_stock",
                    materials: [],
                    images: [],
                    height: "",
                    featured: false,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-card border border-border bg-card">
                {product.images[0] && (
                  <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.price.toLocaleString("ru-RU")} ₽ · {product.status === "in_stock" ? "В наличии" : product.status === "to_order" ? "Под заказ" : "Продана"}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditingProduct(product)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product editor */}
        {tab === "products" && editingProduct && (
          <ProductEditor
            product={editingProduct}
            onSave={saveProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        {/* Settings */}
        {tab === "settings" && (
          <div className="max-w-md space-y-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">Настройки</h2>
            <div>
              <Label>Стоимость доставки (Почта России), ₽</Label>
              <Input
                value={deliveryCost}
                onChange={(e) => setDeliveryCost(e.target.value)}
                className="mt-1 rounded-lg"
                type="number"
              />
            </div>
            <Button onClick={() => toast({ title: "Настройки сохранены" })}>Сохранить</Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Product Editor sub-component
const ProductEditor = ({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState(product);
  const [materialsStr, setMaterialsStr] = useState(product.materials.join(", "));
  const [imagesStr, setImagesStr] = useState(product.images.join("\n"));

  const handleSave = () => {
    onSave({
      ...form,
      materials: materialsStr.split(",").map((m) => m.trim()).filter(Boolean),
      images: imagesStr.split("\n").map((u) => u.trim()).filter(Boolean),
    });
  };

  return (
    <div className="max-w-lg space-y-4">
      <h2 className="font-serif text-xl font-semibold text-foreground">
        {product.name ? "Редактировать" : "Новый товар"}
      </h2>
      <div>
        <Label>Название</Label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 rounded-lg" />
      </div>
      <div>
        <Label>Описание</Label>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 rounded-lg" rows={2} />
      </div>
      <div>
        <Label>Биография</Label>
        <Textarea value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })} className="mt-1 rounded-lg" rows={3} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Цена, ₽</Label>
          <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="mt-1 rounded-lg" />
        </div>
        <div>
          <Label>Рост</Label>
          <Input value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} className="mt-1 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Категория</Label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="dolls">Куклы</option>
            <option value="animals">Зверята</option>
          </select>
        </div>
        <div>
          <Label>Статус</Label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="in_stock">В наличии</option>
            <option value="to_order">Под заказ</option>
            <option value="sold">Продана</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Материалы (через запятую)</Label>
        <Input value={materialsStr} onChange={(e) => setMaterialsStr(e.target.value)} className="mt-1 rounded-lg" />
      </div>
      <div>
        <Label>Ссылки на фото (каждая с новой строки)</Label>
        <Textarea value={imagesStr} onChange={(e) => setImagesStr(e.target.value)} className="mt-1 rounded-lg" rows={3} />
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
          Показывать в избранном
        </label>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleSave}>Сохранить</Button>
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
