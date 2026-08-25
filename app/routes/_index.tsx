import { Link } from 'react-router';
import type { Route } from './+types/_index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'X-Api-Key Header sample' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export default function ApiKeyRoute() {
  return (
    <Link
      to={'/x-api-key'}
      className="text-primary pt-8 pl-8 text-xl underline">
      Dirigase a la demostración de X-Api-Key
    </Link>
  );
}
