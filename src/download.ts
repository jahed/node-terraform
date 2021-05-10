import { reason, rejected, relay, waterfall } from "@jahed/promises";
import fetch from "node-fetch";

const download = waterfall(
  relay((args) => console.log("downloading", args)),
  ({ url }) => fetch(url),
  (res) =>
    res.ok ? res : rejected(reason(`status was not okay (${res.status})`))
);

export { download };
