// scripts/init-project.js
const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function init() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const appName = await new Promise((resolve) => {
      rl.question("What is your app name? ", resolve);
    });

    if (!appName || appName.trim() === "") {
      console.error("[init] Error: App name cannot be empty.");
      process.exit(1);
    }

    const pkgPath = path.join(__dirname, "../package.json");
    const configPath = path.join(__dirname, "../src/config.ts");

    // 1. Update package.json
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = appName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`[init] Updated package.json name to "${appName}"`);

    // 2. Update src/config.ts
    let configContent = fs.readFileSync(configPath, "utf8");
    // Matches appName: "..." or appName: '...'
    const appNameRegex = /appName:\s*["'].*?["']/;
    const newAppNameLine = `  appName: "${appName}"`;

    if (appNameRegex.test(configContent)) {
      configContent = configContent.replace(appNameRegex, newAppNameLine);
      fs.writeFileSync(configPath, configContent);
      console.log(`[init] Updated src/config.ts appName to "${appName}"`);
    } else {
      throw new Error('Could not find "appName" pattern in src/config.ts');
    }

    console.log("[init] Project initialized successfully!");
  } catch (err) {
    console.error(`[init] Error: ${err.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

init();
