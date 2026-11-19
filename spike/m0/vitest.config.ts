import { defineConfig } from "vitest/config";

// Empêche Vitest de reprendre la configuration de l'application à la racine.
export default defineConfig({
  test: { include: ["test/**/*.test.ts"] },
});
