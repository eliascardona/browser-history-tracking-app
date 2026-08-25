import { ApiKeySample } from '~/components/xapikey/main-view';
import { MessagingRequestBodySchema } from '~/lib/x-api-key/request-types';
import { serverActionHandler } from '~/lib/x-api-key/server';
import type { Route } from './+types/x-api-key';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'X-Api-Key Header sample' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();

  if (!formData) throw new Error("You didn't send a request body");

  const requestBody = MessagingRequestBodySchema.parse(formData);

  const actionHandlerResult = await serverActionHandler(requestBody);

  return actionHandlerResult;
}

export default function XApiKeyRoute() {
  return <ApiKeySample />;
}
