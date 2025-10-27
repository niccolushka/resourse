import PropTypes from 'prop-types';

// Карточка описания услуги
function ServiceCard({ title, description }) {
  return (
    <article className="group bg-slate-900/60 border border-white/5 rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/60">
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition">
        {title}
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
    </article>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// Список услуг в сетке
export function ServiceList({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <ServiceCard key={item.title} {...item} />
      ))}
    </div>
  );
}

ServiceList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};
