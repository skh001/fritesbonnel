// Badge produit : vert sapin pour les éditions de Noël, rouge Bonnel sinon
const ProductBadge = ({ label, className = '' }: { label: string; className?: string }) => {
  const festive = /noël|limitée/i.test(label);
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm ${
        festive ? 'bg-green-700 text-white' : 'bg-red-600 text-[#fffd67]'
      } ${className}`}
    >
      {label}
    </span>
  );
};

export default ProductBadge;
