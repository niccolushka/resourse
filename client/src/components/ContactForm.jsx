import { useState } from 'react';

// Форма обратной связи, которая отправляет данные на Node.js API
export function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Не удалось отправить форму', error);
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4"
    >
      <div>
        <label className="block text-sm text-slate-300 mb-2" htmlFor="name">
          Имя
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
          placeholder="Например, Иван"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-2" htmlFor="email">
          Электронная почта
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-2" htmlFor="message">
          Сообщение
        </label>
        <textarea
          id="message"
          required
          rows="4"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none resize-none"
          placeholder="Расскажите о вашем проекте"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary text-slate-900 font-semibold py-3 rounded-full hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
      {status === 'success' ? (
        <p className="text-green-400 text-sm">Сообщение успешно отправлено!</p>
      ) : null}
      {status === 'error' ? (
        <p className="text-red-400 text-sm">Не удалось отправить сообщение. Попробуйте позже.</p>
      ) : null}
    </form>
  );
}
