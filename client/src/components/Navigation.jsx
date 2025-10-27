import PropTypes from 'prop-types';

// Простая навигация с якорями по секциям
export function Navigation({ onContactClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-slate-950/80 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold text-primary">Mining Pro</a>
        <div className="hidden md:flex gap-6 text-sm text-slate-200">
          <a href="#services" className="hover:text-primary transition">Услуги</a>
          <a href="#infrastructure" className="hover:text-primary transition">Инфраструктура</a>
          <a href="#faq" className="hover:text-primary transition">FAQ</a>
          <button
            type="button"
            onClick={onContactClick}
            className="bg-primary/10 border border-primary/40 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition"
          >
            Обсудить проект
          </button>
        </div>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  onContactClick: PropTypes.func.isRequired
};
