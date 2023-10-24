import z from 'zod';

const envSchema = z.object({
  /**
   * @description Graphql endpoint
   */
  SERVER_ENDPOINT: z.string().url(),
  STAGE          : z.enum(['production', 'development', 'preview'])
});


export const environment = envSchema.parse({
  SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
  STAGE          : process.env.STAGE,
});

