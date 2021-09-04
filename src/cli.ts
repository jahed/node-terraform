import { spawn } from "child_process";
import { getOutputs } from "./getOutputs";
import { install } from "./install";

const cli = async () => {
  const args = process.argv.slice(2);
  const outputs = getOutputs();

  await install(outputs);

  const terraform = spawn(outputs.path, args, {
    stdio: [process.stdin, process.stdout, process.stderr],
  });

  terraform.on("close", (code) => process.exit(code || undefined));
};

cli().catch((error) => {
  console.error(error);
  process.exit(1);
});
