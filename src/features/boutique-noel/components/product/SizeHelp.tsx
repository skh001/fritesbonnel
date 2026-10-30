import { Ruler } from 'lucide-react';

/** Encadré d'aide affiché sous le choix de la taille */
const SizeHelp = () => (
  <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#fffd67]">
      <Ruler className="h-4 w-4 text-red-600" />
    </span>
    <div>
      <p className="text-sm font-semibold text-gray-800">Un doute sur la taille ?</p>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">
        N’hésitez pas à venir nous rendre visite sur l’un de nos emplacements pour essayer nos articles et trouver la
        taille qui vous convient le mieux. Notre équipe sera ravie de vous accueillir, de vous conseiller et
        d’échanger avec vous afin que vous repartiez avec la taille idéale.
      </p>
    </div>
  </div>
);

export default SizeHelp;
