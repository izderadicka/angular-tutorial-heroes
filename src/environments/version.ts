
// TODO - this is not good as it imports whole package.json so it is included in client code  !!!

import packageInfo from "../../package.json";

export const version = packageInfo.version;

export function fullInfo() {return JSON.stringify(packageInfo)};
