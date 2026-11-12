import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { BudgetGuard } from "./budget.js";
import { MockProvider } from "./providers/mock.js";
import { OpenAIProvider } from "./providers/openai.js";
import { toCsv } from "./report.js";
import { runBenchmark } from "./runner.js";
import { summarize } from "./stats.js";
import type { ImageGenerationProvider } from "./types.js";

// Seuls les visages inscrits au registre T-001 (fictifs + adulte consentant) peuvent être envoyés.
const ALLOWED_FACES = ["F1", "F2", "F3", "F5"] as const;

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
}
const flag = (name: string) => process.argv.includes(`--${name}`);

function loadEnv(path: string): void {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && process.env[m[1]!] === undefined)
      process.env[m[1]!] = m[2]!.replace(/^["']|["']$/g, "");
  }
}

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

loadEnv(".env");
const providerArg = arg("provider") ?? "mock";
const mode = arg("mode") ?? "full"; // characters | scenes | full
const repetitions = Number(arg("repetitions") ?? "2");
const faceIds = (arg("faces") ?? "F1,F2,F3").split(",");
const budgetEur = Number(process.env.M0_BUDGET_EUR ?? "50");
const dataDir =
  process.env.M0_DATA_DIR ?? join(homedir(), "Desktop", "dodorea-m0-data");

if (!["characters", "scenes", "full"].includes(mode))
  fail("--mode doit valoir characters, scenes ou full");
const unknown = faceIds.filter(
  (f) => !(ALLOWED_FACES as readonly string[]).includes(f),
);
if (unknown.length)
  fail(`Visages non autorisés par le registre T-001 : ${unknown.join(", ")}`);
if (!(budgetEur > 0 && budgetEur <= 50))
  fail("M0_BUDGET_EUR doit être compris entre 0 et 50 (contrainte M0)");

let provider: ImageGenerationProvider;
if (providerArg === "mock") {
  provider = new MockProvider();
} else if (providerArg === "openai") {
  if (!flag("confirm-paid"))
    fail(
      "Appel payant : relancer avec --confirm-paid après accord du responsable produit.",
    );
  provider = new OpenAIProvider({
    apiKey:
      process.env.OPENAI_API_KEY ?? fail("OPENAI_API_KEY absente de .env"),
    model: process.env.M0_MODEL ?? "gpt-image-2.5-flare",
    quality:
      (process.env.M0_QUALITY as "low" | "medium" | "high" | undefined) ??
      "medium",
    size: "1024x1024",
    estimateEur: Number(process.env.M0_ESTIMATE_EUR ?? "0.25"),
  });
} else {
  fail("--provider doit valoir mock ou openai");
}

async function loadImage(dir: string, id: string): Promise<Uint8Array> {
  for (const ext of ["png", "jpg", "jpeg"]) {
    const p = join(dir, `${id}.${ext}`);
    if (existsSync(p)) return new Uint8Array(await readFile(p));
  }
  return fail(`Image ${id} introuvable dans le dossier de données`);
}

const isMock = providerArg === "mock";
const faces = new Map<string, Uint8Array>();
for (const id of faceIds)
  faces.set(
    id,
    isMock ? new Uint8Array([0]) : await loadImage(join(dataDir, "faces"), id),
  );

const validatedCharacters = new Map<string, Uint8Array>();
if (mode === "scenes" && !isMock) {
  for (const id of faceIds)
    validatedCharacters.set(
      id,
      await loadImage(join(dataDir, "characters"), id),
    );
}

const runDir = join(
  dataDir,
  "runs",
  new Date().toISOString().replace(/[:.]/g, "-"),
);
if (!isMock) await mkdir(runDir, { recursive: true });

const outcome = await runBenchmark({
  provider,
  faces,
  repetitions,
  budget: new BudgetGuard(budgetEur),
  validatedCharacters,
  charactersOnly: mode === "characters",
  saveImage: isMock
    ? undefined
    : (name, bytes) => writeFile(join(runDir, name), bytes),
});

await mkdir("out", { recursive: true });
const csvName = `measurements-${providerArg}-${mode}-${Date.now()}.csv`;
await writeFile(join("out", csvName), toCsv(outcome.measurements));
console.log({
  ...summarize(outcome.measurements),
  stoppedByBudget: outcome.stoppedByBudget,
  csv: `out/${csvName}`,
});
if (!isMock) console.log(`Images enregistrées hors dépôt : ${runDir}`);
