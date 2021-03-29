import defaults from "./defaults";
import parse from "parse-strings-in-object";
import rc from "rc";

const config: typeof defaults = parse(rc("lights", defaults));

console.log("started with config", config);
