import { useEffect, useState } from 'react';
import { useCart } from '../../cart/useCart';

/** « Vider le panier » avec confirmation en deux temps (évite les clics accidentels) */
const ClearCartButton = ({ className = '' }: { className?: string }) => {
  const { clearCart } = useCart();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  return (
    <button
      type="button"
      onClick={() => (confirming ? clearCart() : setConfirming(true))}
      className={`text-sm underline-offset-4 transition-colors hover:underline ${
        confirming ? 'font-semibold text-red-600' : 'text-gray-500 hover:text-red-600'
      } ${className}`}
    >
      {confirming ? 'Confirmer : vider le panier' : 'Vider le panier'}
    </button>
  );
};

export default ClearCartButton;
