import { z } from 'zod';
import { zod_string } from '../shared/types';

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const ActionResponseEnum = z.enum([
  'API_HEALTH_RETRIEVED',
  'API_DATA_RETRIEVED',
  'API_DATA_POSTED',
]);
export type ActionResponse = z.infer<typeof ActionResponseEnum>;

/*
  API RESPONSES
*/

type UnauthorizedResponse = { status: string };

export const GetApiHealthResponseSchema = z.object({
  status: z.literal('ok'),
});
export type GetApiHealthResponse = z.infer<typeof GetApiHealthResponseSchema>;

export const GetApiDataResponseSchema = z.object({
  message: zod_string,
  course: zod_string,
  status: z.literal('success'),
});
export type GetApiDataResponse = z.infer<typeof GetApiDataResponseSchema> | UnauthorizedResponse;

export const PostApiDataResponseSchema = z.object({
  message: zod_string,
});
export type PostApiDataResponse = z.infer<typeof PostApiDataResponseSchema> | UnauthorizedResponse;
