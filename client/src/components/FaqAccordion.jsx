import { useState } from 'react';
import PropTypes from 'prop-types';

// Аккордеон FAQ с раскрытием ответов
export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
            <button
              type="button"
              className="w-full flex justify-between items-center px-5 py-4 text-left text-base md:text-lg text-white"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="text-primary text-2xl">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? (
              <p className="px-5 pb-5 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/5">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

FaqAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ).isRequired
};
