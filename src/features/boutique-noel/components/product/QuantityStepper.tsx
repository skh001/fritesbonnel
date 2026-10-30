import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY_PER_LINE } from '../../config/shop';

interface QuantityStepperProps {
  value: number;
  onChange: (quantity: number) => void;
  /** Quantité minimale (1 sur la page produit, 1 dans le panier : la suppression a son propre bouton) */
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
}

const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY_PER_LINE,
  size = 'md',
  label = 'Quantité',
}: QuantityStepperProps) => {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
  const valueSize = size === 'sm' ? 'w-8 text-sm' : 'w-12 text-lg';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const buttonClass = `${buttonSize} flex items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-[#fffd67] hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500`;

  return (
    <div className="inline-flex items-center rounded-full border-2 border-gray-200 bg-white" role="group" aria-label={label}>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <Minus className={iconSize} />
      </button>
      <span className={`${valueSize} text-center font-semibold tabular-nums text-gray-800`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
};

export default QuantityStepper;
