import type { ProductCategory } from '../../types';

export type CategoryFilterValue = ProductCategory | 'all';

interface CategoryFilterProps {
  options: { value: CategoryFilterValue; label: string; count: number }[];
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

const CategoryFilter = ({ options, value, onChange }: CategoryFilterProps) => (
  <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
    <div className="flex w-max gap-2 sm:mx-auto" role="tablist" aria-label="Filtrer la collection">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
              active
                ? 'bg-red-600 text-[#fffd67] shadow-md'
                : 'bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 hover:text-red-600 hover:ring-red-300'
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-[#fffd67] text-red-600' : 'bg-gray-100 text-gray-500'}`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default CategoryFilter;
