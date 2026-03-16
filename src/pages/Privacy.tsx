import { motion } from "framer-motion";

const Privacy = () => (
  <div className="pt-16">
    <div className="container mx-auto px-4 py-12 max-w-[65ch]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-foreground">Политика конфиденциальности</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта мастерской Ирины Гасниковой.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">1. Сбор информации</h2>
          <p>Мы собираем информацию, которую вы предоставляете при оформлении заказа: имя, номер телефона, адрес электронной почты и адрес доставки.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">2. Использование информации</h2>
          <p>Собранная информация используется исключительно для обработки и доставки заказов, а также для связи с вами по вопросам заказа.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">3. Защита информации</h2>
          <p>Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">4. Передача третьим лицам</h2>
          <p>Мы не передаём ваши персональные данные третьим лицам, за исключением служб доставки для выполнения заказа.</p>
          
          <h2 className="font-serif text-lg font-semibold text-foreground pt-2">5. Контактная информация</h2>
          <p>По вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу: hello@gasnikova.ru</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Privacy;
