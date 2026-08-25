import { useEffect, useState } from 'react';
import { useActionData, useSubmit } from 'react-router';
import {
  triggerGetApiData,
  triggerGetApiHealth,
  triggerPostApiData,
} from '~/lib/various/form-submission/x-api-key/action-triggers';
import type { action } from '~/routes/x-api-key';
import { TriggerButton, TriggerButtonsWrapper } from './ui';

export function ApiKeySample() {
  const submit = useSubmit();
  const [actionDataResult, setActionDataResult] =
    useState<Record<string, string> | null>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success) {
      switch (actionData.performedAction) {
        case 'API_HEALTH_RETRIEVED':
          setActionDataResult(actionData.data);
          break;

        case 'API_DATA_RETRIEVED':
          setActionDataResult(actionData.data);
          break;

        case 'API_DATA_POSTED':
          setActionDataResult(actionData.data);
          break;

        default:
          break;
      }
    }
  }, [actionData?.success]);

  const triggerGetApiHealthWrapper = () => {
    triggerGetApiHealth(submit);
  };

  const triggerGetApiDataWrapper = () => {
    triggerGetApiData(submit);
  };

  const triggerPostApiDataWrapper = () => {
    triggerPostApiData(submit);
  };

  return (
    <div className="space-y-6 pt-8">
      <h1 className="text-3xl">
        Demostración del uso de X-Api-Key en los encabezados
      </h1>

      <TriggerButtonsWrapper>
        <TriggerButton
          text={'GET /api/health'}
          onClick={triggerGetApiHealthWrapper}
        />
        <TriggerButton
          text={'GET /api/data'}
          onClick={triggerGetApiDataWrapper}
        />
        <TriggerButton
          text={'POST /api/data'}
          onClick={triggerPostApiDataWrapper}
        />
        {actionData && (
          <div className="p-4">
            <h3 className="text-lg">Respuesta de la API</h3>
            <pre>{JSON.stringify(actionDataResult, null, 2)}</pre>
          </div>
        )}
      </TriggerButtonsWrapper>
    </div>
  );
}
