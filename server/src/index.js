import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const port = process.env.PORT || 5000;

// Базовая конфигурация Express
app.use(cors());
app.use(express.json());

// Демонстрационные данные о состоянии майнинг-фермы
const stats = [
  {
    label: 'Общий хешрейт',
    value: '28.4 PH/s',
    description: 'Вся инфраструктура Mining Pro объединена в единый кластер с автоматическим распределением нагрузки.'
  },
  {
    label: 'Энергоэффективность',
    value: '27.8 J/TH',
    description: 'Система жидкостного охлаждения снижает энергопотребление и повышает стабильность оборудования.'
  },
  {
    label: 'Доходность за 30 дней',
    value: '312 BTC',
    description: 'Аналитика построена на данных крупнейших пулов и обновляется каждые 15 минут.'
  },
  {
    label: 'Портфель инвесторов',
    value: '480+ проектов',
    description: 'Мы сопровождаем клиентов от MVP до масштабирования промышленной фермы.'
  }
];

// Эндпоинт для получения статистики
app.get('/api/stats', (req, res) => {
  res.json({ stats });
});

// Эндпоинт для получения заявок с фронтенда
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения.' });
  }

  // В реальном проекте здесь можно сохранить данные в БД или отправить в CRM
  const requestId = nanoid();
  console.log('Получена новая заявка на консультацию:', { requestId, name, email, message });

  return res.status(201).json({ requestId, status: 'received' });
});

// Обработчик неизвестных маршрутов для API
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден.' });
});

// Глобальный обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Непредвиденная ошибка сервера', err);
  res.status(500).json({ error: 'На сервере произошла ошибка.' });
});

app.listen(port, () => {
  console.log(`🚀 Сервер майнинга запущен на порту ${port}`);
});
