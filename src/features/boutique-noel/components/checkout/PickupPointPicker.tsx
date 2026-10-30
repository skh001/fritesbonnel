import { Check, Clock, MapPin } from 'lucide-react';
import { PICKUP_GROUPS, PICKUP_POINTS } from '../../config/pickupPoints';

interface PickupPointPickerProps {
  value: string;
  onChange: (pickupPointId: string) => void;
  error?: string;
}

/** Choix du point de retrait, groupé par type d'emplacement (généré depuis la config) */
const PickupPointPicker = ({ value, onChange, error }: PickupPointPickerProps) => (
  <div className="space-y-6" role="radiogroup" aria-label="Point de retrait" aria-invalid={Boolean(error)}>
    {PICKUP_GROUPS.map((group) => {
      const points = PICKUP_POINTS.filter((point) => point.groupId === group.id);
      if (points.length === 0) return null;
      return (
        <div key={group.id}>
          <div className="mb-3">
            <h5 className="text-sm font-bold uppercase tracking-wide text-red-600">{group.label}</h5>
            {group.description && <p className="text-xs italic text-gray-500">{group.description}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => {
              const selected = value === point.id;
              return (
                <label
                  key={point.id}
                  className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 ${
                    selected
                      ? 'border-red-600 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="pickupPointId"
                    value={point.id}
                    checked={selected}
                    onChange={() => onChange(point.id)}
                    className="sr-only"
                  />
                  <span
                    className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      selected ? 'border-red-600 bg-red-600 text-[#fffd67]' : 'border-gray-300 bg-white text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fffd67] px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                    <Clock className="h-3 w-3" />
                    {point.period}
                  </span>
                  <span className="pr-6 font-semibold text-gray-800">{point.day}</span>
                  <span className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                    <span>
                      {point.place}
                      {point.address && <span className="block text-gray-500">{point.address}</span>}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    })}
    {error && (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default PickupPointPicker;
