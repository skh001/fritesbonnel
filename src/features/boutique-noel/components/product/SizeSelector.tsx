import { formatSize } from '../../config/shop';
import type { Size } from '../../types';

interface SizeSelectorProps {
  sizes: readonly Size[];
  value: Size | null;
  onChange: (size: Size) => void;
  error?: string;
}

const SizeSelector = ({ sizes, value, onChange, error }: SizeSelectorProps) =>
  // Taille unique : simple information, rien à choisir
  sizes.length === 1 ? (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-800">Taille</p>
      <span className="inline-flex h-12 items-center rounded-xl border-2 border-red-600 bg-red-600 px-5 font-semibold text-[#fffd67] shadow-md">
        {formatSize(sizes[0])}
      </span>
    </div>
  ) : (
    <fieldset>
      <legend className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-800">
        <span>Taille</span>
        {value && <span className="font-normal text-gray-500">Sélectionnée : {value}</span>}
      </legend>
      <div className="grid grid-cols-4 gap-3" role="radiogroup" aria-label="Choisir une taille">
        {sizes.map((size) => {
          const selected = value === size;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(size)}
              className={`h-12 rounded-xl border-2 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                selected
                  ? 'scale-105 border-red-600 bg-red-600 text-[#fffd67] shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-red-600 hover:text-red-600'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );

export default SizeSelector;
