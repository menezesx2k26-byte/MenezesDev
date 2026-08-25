import { env } from "cloudflare:workers";

export type RuntimeBindings = Pick<Env, "DB" | "MEDIA">;

export const getRuntimeBindings = (): RuntimeBindings => ({
  DB: env.DB,
  MEDIA: env.MEDIA,
});
