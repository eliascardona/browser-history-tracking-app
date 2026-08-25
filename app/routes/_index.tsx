import type { Route } from './+types/_index';
import { BrowserHistoryApp } from '~/components/browser-history/main-view';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Trailmark — Browser history, made human' },
    { name: 'description', content: 'A private, colorful browser history explorer for CSV exports.' },
  ];
}

export default function HomeRoute() {
  return <BrowserHistoryApp />;
}
