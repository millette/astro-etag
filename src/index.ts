import type { AstroIntegration } from "astro";
import { glob, readFile, writeFile } from "fs/promises";
import path from "path";

const createPlugin = (): AstroIntegration => ({
  name: "astro-etag",
  hooks: {
    async "astro:build:done"({ dir, logger }) {
      let written = 0;

      for await (const file of glob(path.join(dir.pathname, "**/*"), {
        withFileTypes: true,
        exclude: ["**/*.etag"],
      })) {
        if (!file.isFile()) continue;
        const inputPath = `${file.parentPath}/${file.name}`;
        const outputPath = `${inputPath}.etag`;
        const input = await readFile(inputPath);
        const digest = await crypto.subtle.digest("SHA-256", input);
        const hash = Buffer.from(digest).toString("hex");

        await writeFile(outputPath, hash, { encoding: "utf8" });
        written++;
      }

      logger.info(`Create ETags for ${written} files`);
    },
  },
});

export default createPlugin;
