import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'e3e0cbc8440d8d546465b595856a4af20225a0fd', queries,  });
export default client;
  