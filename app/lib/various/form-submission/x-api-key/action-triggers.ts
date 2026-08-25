import {
  useSubmitFromReactRouter,
  type BaseUseFormSubmitOptions,
  type SubmitFunctionAbstraction,
} from '../utils';
import {
  formatDataIntoRequestGetApiData,
  formatDataIntoRequestGetApiHealth,
  formatDataIntoRequestPostApiData,
} from './payload-formatters';

function generateBaseSubmitOptions(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const OPTIONS: BaseUseFormSubmitOptions = {
    method: 'POST' as const,
    action: `/x-api-key` as const,
    contentType: 'application/json' as const,
    submit,
  };

  return OPTIONS;
}

export function triggerGetApiHealth(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = generateBaseSubmitOptions(submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoRequestGetApiHealth();

  submitForm(formattedData);
}

export function triggerGetApiData(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = generateBaseSubmitOptions(submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoRequestGetApiData();

  submitForm(formattedData);
}

export function triggerPostApiData(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = generateBaseSubmitOptions(submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoRequestPostApiData();

  submitForm(formattedData);
}
