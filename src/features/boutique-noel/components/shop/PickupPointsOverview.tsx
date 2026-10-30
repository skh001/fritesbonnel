import { Clock, MapPin } from 'lucide-react';
import { PICKUP_GROUPS, PICKUP_POINTS } from '../../config/pickupPoints';
import Reveal from '../decor/Reveal';

/** Liste informative des points de retrait (générée depuis la config) */
const PickupPointsOverview = () => (
  <div className="grid gap-8 md:grid-cols-2">
    {PICKUP_GROUPS.map((group, index) => (
      <Reveal key={group.id} delay={index * 120}>
        <div className="h-full rounded-xl border-2 border-[#fffd67] bg-[#fffd67]/30 p-6 shadow-md">
          <h4 className="mb-4 border-b-2 border-[#fffd67] pb-2 text-lg font-semibold text-red-600">{group.label}</h4>
          <ul className="space-y-4">
            {PICKUP_POINTS.filter((point) => point.groupId === group.id).map((point) => (
              <li key={point.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                  <Clock className="h-4 w-4 text-[#fffd67]" />
                </span>
                <div>
                  <p className="font-semibold text-gray-800">
                    {point.day} · <span className="text-red-600">{point.period}</span>
                  </p>
                  <p className="flex items-start gap-1 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    {point.place}
                    {point.address ? ` — ${point.address}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    ))}
  </div>
);

export default PickupPointsOverview;
