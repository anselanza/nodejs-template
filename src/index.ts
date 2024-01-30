import defaults from "./defaults";
import parse from "parse-strings-in-object";
import rc from "rc";
import { getLogger } from "log4js";

const appName = defaults.appName;

const config: typeof defaults = parse(rc(appName, defaults));

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
