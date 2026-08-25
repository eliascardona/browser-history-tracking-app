import { apiClient } from '../infrastructure/api/client';
import type { ServerActionResult } from '../shared/types';
import { getApiData, getApiHealth, postApiData } from './api';
import { RequestActionEnum, type MessagingRequestBody } from './request-types';
import { ActionResponseEnum, type ActionResponse } from './response-types';

export async function serverActionHandler(
  requestBody: MessagingRequestBody
): Promise<ServerActionResult<ActionResponse>> {
  const intent = requestBody.intent;

  if (!requestBody) return { success: false };

  try {
    switch (intent) {
      case RequestActionEnum.enum.REQUEST_GET_API_HEALTH: {
        const apiResponse = await getApiHealth(apiClient);

        return {
          success: true,
          performedAction: ActionResponseEnum.enum.API_HEALTH_RETRIEVED,
          data: apiResponse,
        };
      }

      case RequestActionEnum.enum.REQUEST_GET_API_DATA: {
        const apiResponse = await getApiData(apiClient);

        return {
          success: true,
          performedAction: ActionResponseEnum.enum.API_DATA_RETRIEVED,
          data: apiResponse,
        };
      }

      case RequestActionEnum.enum.REQUEST_POST_API_DATA: {
        const apiResponse = await postApiData(apiClient);

        return {
          success: true,
          performedAction: ActionResponseEnum.enum.API_DATA_POSTED,
          data: apiResponse,
        };
      }

      default:
        return { success: false };
    }
  } catch (error: any) {
    console.error('Error performing server action:', JSON.stringify({ err: error.message}));
    return { success: false };
  }
}
