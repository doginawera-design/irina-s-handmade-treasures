export type ProductCategory = "dolls" | "animals";
export type ProductStatus = "in_stock" | "to_order" | "sold";

export interface Product {
  id: string;
  name: string;
  description: string;
  biography: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  materials: string[];
  images: string[];
  height: string;
  featured: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryMethod: string;
  address: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: "new" | "paid" | "shipped";
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Агата",
    description: "Текстильная кукла в льняном платье с кружевным воротничком",
    biography: "Агата родилась в солнечный весенний день. Её платье сшито из старинного льна, найденного на антикварной ярмарке. Каждая складочка — ручная работа. Она любит сидеть на подоконнике и наблюдать за птицами.",
    price: 4500,
    category: "dolls",
    status: "in_stock",
    materials: ["Лён", "Хлопок", "Кружево", "Опилки"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=800&fit=crop",
    ],
    height: "35 см",
    featured: true,
  },
  {
    id: "2",
    name: "Мишка Теодор",
    description: "Плюшевый медведь из винтажного бархата с подвижными лапками",
    biography: "Теодор — задумчивый медведь. Его бархатная шкурка помнит тепло многих рук. Набит опилками и немного — лавандой, чтобы сны были сладкими.",
    price: 3800,
    category: "animals",
    status: "in_stock",
    materials: ["Бархат", "Опилки", "Лаванда", "Пуговицы"],
    images: [
      "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602734846297-9299fc2d4f38?w=600&h=800&fit=crop",
    ],
    height: "28 см",
    featured: true,
  },
  {
    id: "3",
    name: "Полина",
    description: "Кукла-девочка с рыжими косичками и корзинкой земляники",
    biography: "Полина — вечное лето. Она пахнет нагретой травой и немного — земляникой. Её косички заплетены из натуральной пряжи, а платье — из хлопка в мелкий цветочек.",
    price: 5200,
    category: "dolls",
    status: "to_order",
    materials: ["Хлопок", "Пряжа", "Опилки", "Сухоцветы"],
    images: [
      "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=600&h=800&fit=crop",
    ],
    height: "40 см",
    featured: true,
  },
  {
    id: "4",
    name: "Зайка Соня",
    description: "Сонный зайчик в ночном колпачке и пижаме",
    biography: "Соня всегда немного сонная. Её ушки чуть помяты от подушки, а в лапках — крошечная подушечка с вышитой звездой. Идеальный друг для сладких снов.",
    price: 2900,
    category: "animals",
    status: "in_stock",
    materials: ["Фланель", "Хлопок", "Холлофайбер"],
    images: [
      "https://images.unsplash.com/photo-1585155770913-5f0ecc0b7318?w=600&h=800&fit=crop",
    ],
    height: "25 см",
    featured: false,
  },
  {
    id: "5",
    name: "Василиса",
    description: "Кукла в русском стиле с длинной косой и сарафаном",
    biography: "Василиса хранит тепло русской избы. Её сарафан расшит вручную, а длинная коса перевита атласной лентой. Она смотрит на мир мудрыми глазами-пуговками.",
    price: 6000,
    category: "dolls",
    status: "sold",
    materials: ["Лён", "Атлас", "Опилки", "Пуговицы"],
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=800&fit=crop",
    ],
    height: "42 см",
    featured: false,
  },
  {
    id: "6",
    name: "Лисичка Фокси",
    description: "Рыжая лисичка из шерсти с шарфиком",
    biography: "Фокси — самая хитрая и обаятельная лисичка. Её шерстка — натуральная шерсть рыжего оттенка, а шарфик связан крошечными спицами.",
    price: 3200,
    category: "animals",
    status: "in_stock",
    materials: ["Шерсть", "Хлопок", "Опилки"],
    images: [
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=600&h=800&fit=crop",
    ],
    height: "22 см",
    featured: true,
  },
];

export const deliverySettings = {
  russiaPost: { name: "Почта России", price: 350, days: "5–10 дней" },
  cdek: { name: "СДЭК", price: 450, days: "3–5 дней" },
  pickup: { name: "Самовывоз (Москва)", price: 0, days: "По договорённости" },
};
