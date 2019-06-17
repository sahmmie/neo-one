import { Binary } from '@neo-one/server-plugin';
import {
  DIR_OPTION,
  HTTP_SERVER_PORT_OPTION,
  MIN_PORT_OPTION,
  SERVER_PORT_OPTION,
  STATIC_NEO_ONE_OPTION,
} from '../constants';

export const createBinary = (
  argv: readonly string[],
  {
    dir,
    serverPort,
    httpServerPort,
    minPort,
  }: {
    readonly dir?: string;
    readonly httpServerPort?: number;
    readonly serverPort?: number;
    readonly minPort?: number;
  },
): Binary => {
  const [cmd] = argv;
  const mutableFirstArgs = [argv[1], STATIC_NEO_ONE_OPTION];
  if (dir !== undefined) {
    mutableFirstArgs.push(DIR_OPTION);
    mutableFirstArgs.push(dir);
  }

  if (serverPort !== undefined) {
    mutableFirstArgs.push(SERVER_PORT_OPTION);
    mutableFirstArgs.push(`${serverPort}`);
  }

  if (httpServerPort !== undefined) {
    mutableFirstArgs.push(HTTP_SERVER_PORT_OPTION);
    mutableFirstArgs.push(`${httpServerPort}`);
  }

  if (minPort !== undefined) {
    mutableFirstArgs.push(MIN_PORT_OPTION);
    mutableFirstArgs.push(`${minPort}`);
  }

  return { cmd, firstArgs: mutableFirstArgs };
};
