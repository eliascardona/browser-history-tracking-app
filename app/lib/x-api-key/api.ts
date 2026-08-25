import { type ApiClient } from '../infrastructure/api/client';
import type {
  GetApiDataResponse,
  GetApiHealthResponse,
  PostApiDataResponse,
} from './response-types';

export async function getApiHealth(
  client: ApiClient
): Promise<GetApiHealthResponse> {
  try {
    const response = await client.get<GetApiHealthResponse>(`/health`);
    console.log('[API] - GET /api/health:', response);

    return response;
  } catch (error) {
    console.error('Error while performing HTTP GET /api/health:', error);
    throw error;
  }
}

export async function getApiData(
  client: ApiClient
): Promise<GetApiDataResponse> {
  try {
    const response = await client.get<GetApiDataResponse>(
      `/data`,
      { 'X-Api-Key': '' }
    );
    console.log('[API] - GET /api/data:', response);

    return response;
  } catch (error) {
    console.error('Error while performing HTTP GET /api/data:', error);
    throw error;
  }
}

export async function postApiData(
  client: ApiClient
): Promise<PostApiDataResponse> {
  try {
    const response = await client.post<PostApiDataResponse>(
      `/data`,
      {},
      { 'X-Api-Key': '' }
    );
    console.log('[API] - POST /api/data:', response);

    return response;
  } catch (error) {
    console.error('Error while performing HTTP POST /api/data:', error);
    throw error;
  }
}
