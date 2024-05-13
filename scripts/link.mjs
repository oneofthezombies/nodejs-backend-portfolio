import fs from 'fs';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);
  const [source, target] = args;
  if (!source || !target) {
    console.error('Usage: node link.mjs <source> <target>');
    process.exit(1);
  }

  const sourcePath = path.resolve(source);
  const targetPath = path.resolve(target);
  const targetStat = await fs.promises.stat(targetPath).catch(() => null);
  if (targetStat) {
    console.error(`Deleting existing target ${targetPath}...`);
    await fs.promises.rm(targetPath, { force: true, recursive: true });
  }

  await fs.promises.symlink(sourcePath, targetPath);
  console.log(`Symlinked ${sourcePath} to ${targetPath}`);
}

main();
