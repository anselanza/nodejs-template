import { z } from "zod";

export const configSchema = z.object({
  appName: z.string(),
  loglevel: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export const defaults: Config = {
        appName: "myapp",
  loglevel: "info",
};
