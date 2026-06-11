import { type Config, configSchema, defaults } from "./config";
import convertFromStrings from "parse-strings-in-object";
import rc from "rc";
import { getLogger } from "log4js";
import { z } from "zod";

const appName = defaults.appName;

const configObject = convertFromStrings(rc(appName, defaults));

const config = configSchema.parse(configObject);

const logger = getLogger(appName);
logger.level = config.loglevel;

logger.info("started with config", config);
logger.debug("Debug logging enabled; output could be verbose!");

const main = async () => {
  // Do some async stuff in here!
};

// ================================================
// Kick off main process here
main();
