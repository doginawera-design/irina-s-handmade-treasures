import { motion } from "framer-motion";

const Offer = () => (
  <div className="pt-16">
    <div className="container mx-auto px-4 py-12 max-w-[65ch]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-foreground">Публичная оферта</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>Настоящий документ является публичной офертой индивидуального предпринимателя Гасниковой Ирины (далее — «Продавец») и определяет условия приобретения авторских текстильных кукол и игрушек ручной работы.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">1. Общие положения</h2>
          <p>1.1. Оформление заказа на сайте означает согласие с условиями настоящей оферты.</p>
          <p>1.2. Каждое изделие является авторской работой ручного производства и может незначительно отличаться от фотографий на сайте.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">2. Оформление заказа</h2>
          <p>2.1. Заказ оформляется через форму на сайте или по электронной почте.</p>
          <p>2.2. После оформления заказа Продавец связывается с Покупателем для подтверждения и уточнения деталей.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">3. Оплата</h2>
          <p>3.1. Оплата производится по реквизитам, предоставленным после подтверждения заказа.</p>
          <p>3.2. Для изделий «под заказ» предусмотрена предоплата 50%.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">4. Доставка</h2>
          <p>4.1. Доставка осуществляется способами, указанными на странице «Доставка».</p>
          <p>4.2. Сроки доставки зависят от выбранного способа и региона.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">5. Возврат и обмен</h2>
          <p>5.1. В связи с авторским характером изделий возврат и обмен возможен только в случае производственного брака.</p>
          <p>5.2. Претензии принимаются в течение 7 дней с момента получения.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">6. Контакты</h2>
          <p>По всем вопросам: hello@gasnikova.ru</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Offer;
