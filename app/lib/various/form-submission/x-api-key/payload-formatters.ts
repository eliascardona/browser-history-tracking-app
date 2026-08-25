import {
  RequestActionEnum,
  type RequestGetApiData,
  type RequestGetApiHealth,
  type RequestPostApiData,
} from '~/lib/x-api-key/request-types';

export function formatDataIntoRequestGetApiHealth() {
  const format: RequestGetApiHealth = {
    intent: RequestActionEnum.enum.REQUEST_GET_API_HEALTH,
  };

  return format;
}

export function formatDataIntoRequestGetApiData() {
  const format: RequestGetApiData = {
    intent: RequestActionEnum.enum.REQUEST_GET_API_DATA,
  };

  return format;
}

export function formatDataIntoRequestPostApiData() {
  const format: RequestPostApiData = {
    intent: RequestActionEnum.enum.REQUEST_POST_API_DATA,
  };

  return format;
}
