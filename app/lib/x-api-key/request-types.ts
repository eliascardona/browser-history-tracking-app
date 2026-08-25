import { z } from 'zod';

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const RequestActionEnum = z.enum([
  'REQUEST_GET_API_HEALTH',
  'REQUEST_GET_API_DATA',
  'REQUEST_POST_API_DATA',
]);
export type MessagingAction = z.infer<typeof RequestActionEnum>;

/*
  POLYMORPHIC REQUEST SCHEMA
*/
const RequestBaseSchema = z.object({
  intent: RequestActionEnum,
});

export const RequestGetApiHealthSchema = RequestBaseSchema.extend({
  intent: z.literal(RequestActionEnum.enum.REQUEST_GET_API_HEALTH),
});
export type RequestGetApiHealth = z.infer<typeof RequestGetApiHealthSchema>;

export const RequestGetApiDataSchema = RequestBaseSchema.extend({
  intent: z.literal(RequestActionEnum.enum.REQUEST_GET_API_DATA),
});
export type RequestGetApiData = z.infer<typeof RequestGetApiDataSchema>;

export const RequestPostApiDataSchema = RequestBaseSchema.extend({
  intent: z.literal(RequestActionEnum.enum.REQUEST_POST_API_DATA),
});
export type RequestPostApiData = z.infer<typeof RequestPostApiDataSchema>;

export const MessagingRequestBodySchema = z.discriminatedUnion('intent', [
  RequestGetApiHealthSchema,
  RequestGetApiDataSchema,
  RequestPostApiDataSchema,
]);

export type MessagingRequestBody = z.infer<typeof MessagingRequestBodySchema>;
