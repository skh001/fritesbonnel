import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { downloadPickupReceipt } from '../../services/pickupReceipt';
import type { ConfirmedOrder } from '../../types';

/** Téléchargement du bon de commande PDF (autant de fois que souhaité) */
const DownloadReceiptButton = ({ order }: { order: ConfirmedOrder }) => {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    setGenerating(true);
    setError(false);
    try {
      await downloadPickupReceipt(order);
    } catch (err) {
      console.error('Échec de la génération du bon de commande :', err);
      setError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={generating}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fffd67] px-6 py-3.5 font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-wait disabled:opacity-80 disabled:hover:scale-100"
      >
        {generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
        Télécharger mon bon de commande (PDF)
      </button>
      {error && (
        <p className="mt-3 text-sm text-white" role="alert">
          Le bon de commande n’a pas pu être généré. Merci de réessayer.
        </p>
      )}
    </div>
  );
};

export default DownloadReceiptButton;
