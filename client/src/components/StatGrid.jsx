import PropTypes from 'prop-types';

// Карточка статистики по майнингу
function StatCard({ label, value, description }) {
  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-lg shadow-cyan-500/5">
      <h3 className="text-3xl font-semibold text-primary">{value}</h3>
      <p className="text-slate-200 text-sm uppercase tracking-wide mt-2">{label}</p>
      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{description}</p>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// Сетка карточек статистики
export function StatGrid({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

StatGrid.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};
