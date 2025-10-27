import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigation } from './components/Navigation.jsx';
import { StatGrid } from './components/StatGrid.jsx';
import { ServiceList } from './components/ServiceList.jsx';
import { FaqAccordion } from './components/FaqAccordion.jsx';
import { ContactForm } from './components/ContactForm.jsx';
import { faqItems } from './data/faq.js';
import { services } from './data/services.js';

// Главный компонент лендинга по майнингу
function App() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contactRef = useRef(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Сервер вернул ошибку');
        }
        const data = await response.json();
        setStats(data.stats);
      } catch (err) {
        console.error('Не удалось получить статистику', err);
        setError('Сейчас статистика недоступна, но вы можете запросить её у менеджера.');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const heroBackground = useMemo(
    () =>
      'bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.15),_transparent_55%)] bg-slate-950',
    []
  );

  function scrollToContact() {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="relative overflow-hidden">
      <Navigation onContactClick={scrollToContact} />

      <main className="pt-24 space-y-24">
        <section className={`section ${heroBackground}`}>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-primary/80 mb-4">
                Цифровые активы под управлением
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                Ускорьте майнинг криптовалют
                <span className="text-primary"> с Mining Pro</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Мы проектируем, строим и управляем дата-центрами для майнинга с полной технической поддержкой,
                прозрачной аналитикой и гибкими моделями инвестиций.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="bg-primary text-slate-950 font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition"
                >
                  Получить расчёт доходности
                </button>
                <a
                  href="#infrastructure"
                  className="border border-white/20 px-6 py-3 rounded-full text-slate-200 hover:border-primary/60 hover:text-primary transition"
                >
                  Посмотреть инфраструктуру
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/20 blur-3xl opacity-70" aria-hidden="true" />
              <div className="relative bg-slate-900/70 border border-primary/40 rounded-3xl p-6 backdrop-blur">
                <h2 className="text-lg font-semibold text-white mb-4">Архитектура Mining Pro</h2>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li>
                    <span className="text-primary font-semibold">01.</span> Децентрализованная система мониторинга HashWatch™
                  </li>
                  <li>
                    <span className="text-primary font-semibold">02.</span> Интеллектуальное распределение нагрузки между пулами
                  </li>
                  <li>
                    <span className="text-primary font-semibold">03.</span> Холодный и горячий резерв с автоматическим переключением
                  </li>
                  <li>
                    <span className="text-primary font-semibold">04.</span> Прогнозирование хешрейта с помощью ML-модели
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="metrics">
          <h2 className="section-title">Текущие показатели дата-центра</h2>
          <p className="section-subtitle">
            Мы прозрачно делимся ключевыми цифрами: мощностью, доходностью и стабильностью инфраструктуры.
          </p>

          {loading ? (
            <p className="text-slate-300 mt-8">Загрузка статистики...</p>
          ) : error ? (
            <p className="text-red-400 mt-8 max-w-2xl">{error}</p>
          ) : (
            <div className="mt-10">
              <StatGrid stats={stats} />
            </div>
          )}
        </section>

        <section className="section" id="services">
          <h2 className="section-title">Чем мы можем помочь</h2>
          <p className="section-subtitle">
            От подбора оборудования до полного аутсорса майнинговой фермы — мы сопровождаем каждый этап.
          </p>
          <div className="mt-10">
            <ServiceList items={services} />
          </div>
        </section>

        <section className="section" id="infrastructure">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] items-start">
            <div>
              <h2 className="section-title">Инфраструктура премиум-класса</h2>
              <p className="section-subtitle mb-6">
                Мы строим дата-центры в регионах с низкой стоимостью электроэнергии и оптимальным климатом.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  Плотность мощности 24 кВт/стойку и продвинутая система жидкостного охлаждения.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  Сертифицированные каналы связи Tier III и резервирование Tier IV.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  Собственная команда сервис-инженеров и система оповещения SmartAlert.
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 via-slate-900 to-slate-950 border border-primary/30 rounded-3xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Производительность</h3>
              <div className="space-y-3 text-sm text-slate-200">
                <p>Суммарный хешрейт: <span className="text-primary font-semibold">28.4 PH/s</span></p>
                <p>Средняя доходность ASIC S21: <span className="text-accent font-semibold">0.00062 BTC/сутки</span></p>
                <p>Погрешность прогнозов: <span className="text-primary font-semibold">±3.2%</span></p>
                <p>Среднее время простоя в месяц: <span className="text-primary font-semibold">12 минут</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <h2 className="section-title">Ответы на вопросы инвесторов</h2>
          <p className="section-subtitle mb-10">
            Мы собрали наиболее популярные вопросы, которые обсуждаем с клиентами на стратегических сессиях.
          </p>
          <FaqAccordion items={faqItems} />
        </section>

        <section className="section" id="contact" ref={contactRef}>
          <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] items-center">
            <div>
              <h2 className="section-title">Готовы обсудить проект?</h2>
              <p className="section-subtitle">
                Оставьте контакты, и наш менеджер подготовит расчёт окупаемости с учётом ваших требований по бюджету и рискам.
              </p>
              <div className="mt-8 space-y-4 text-slate-300 text-sm">
                <p>• Индивидуальные консультации и аудит текущих мощностей.</p>
                <p>• Настройка и сопровождение программного обеспечения майнинг-пула.</p>
                <p>• Помощь с юридическими и бухгалтерскими вопросами.</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Mining Pro. Все права защищены.
      </footer>
    </div>
  );
}

export default App;
