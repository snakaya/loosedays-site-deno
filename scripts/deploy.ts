const ORG = "loosedays";
const APP = "loosedays-site";
const DRY_RUN = Deno.args.includes("--dry-run");

const repoRoot = new URL("../", import.meta.url);
const buildOutput = new URL("_fresh/", repoRoot);

async function run(
  args: string[],
  options: { cwd?: string | URL } = {},
): Promise<void> {
  const status = await new Deno.Command(Deno.execPath(), {
    args,
    cwd: options.cwd,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  }).spawn().status;

  if (!status.success) {
    throw new Error(`Command failed (${status.code}): deno ${args.join(" ")}`);
  }
}

async function copyDirectory(source: URL, destination: string): Promise<void> {
  await Deno.mkdir(destination, { recursive: true });

  for await (const entry of Deno.readDir(source)) {
    const sourceEntry = new URL(entry.name, source);
    const destinationEntry = `${destination}/${entry.name}`;

    if (entry.isDirectory) {
      sourceEntry.pathname += "/";
      await copyDirectory(sourceEntry, destinationEntry);
    } else if (entry.isFile) {
      await Deno.copyFile(sourceEntry, destinationEntry);
    }
  }
}

async function assertFile(path: URL): Promise<void> {
  const info = await Deno.stat(path);
  if (!info.isFile) {
    throw new Error(`Expected build output is not a file: ${path}`);
  }
}

async function verifyProduction(): Promise<void> {
  const checks = [
    "https://loosedays.jp/",
    "https://www.loosedays.jp/",
    "https://loosedays.jp/images/loosedays_logo_light.png",
  ];

  for (const url of checks) {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      throw new Error(
        `Production check failed: ${url} returned ${response.status}`,
      );
    }
    console.log(`Verified ${response.status}: ${url}`);
    await response.body?.cancel();
  }
}

console.log("Building Fresh production output...");
await run(["task", "build"], { cwd: repoRoot });

await assertFile(new URL("server.js", buildOutput));
await assertFile(new URL("compiled-entry.js", buildOutput));

const stagingDirectory = await Deno.makeTempDir({
  prefix: "loosedays-deploy-",
});

try {
  await copyDirectory(buildOutput, `${stagingDirectory}/_fresh`);
  await Deno.mkdir(`${stagingDirectory}/app`, { recursive: true });
  await Deno.writeTextFile(
    `${stagingDirectory}/app/main.ts`,
    `import server from "../_fresh/server.js";

Deno.serve(
  { port: Deno.env.get("PORT"), hostname: Deno.env.get("HOSTNAME") },
  server.fetch,
);
`,
  );

  console.log(`Prepared deployment artifact: ${stagingDirectory}`);

  if (DRY_RUN) {
    console.log("Dry run complete; deployment was skipped.");
  } else {
    await run([
      "deploy",
      stagingDirectory,
      "--org",
      ORG,
      "--app",
      APP,
      "--prod",
    ]);
    await verifyProduction();
  }
} finally {
  await Deno.remove(stagingDirectory, { recursive: true });
}
