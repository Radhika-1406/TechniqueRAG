import { PythonShell } from "python-shell";
import path from "path";
import fs from "fs";
import { spawnSync } from "child_process";

const PYTHON_ENV = path.resolve("venv");

// ----- Ensure virtual environment -----
if (!fs.existsSync(PYTHON_ENV)) {
  console.log("Creating Python virtual environment...");
  spawnSync("python", ["-m", "venv", "venv"], { stdio: "inherit" });
  console.log("Installing Python dependencies...");
  spawnSync(
    path.join(PYTHON_ENV, "Scripts", "pip"),
    ["install", "-r", "requirements.txt"],
    { stdio: "inherit" }
  );
}

const pythonPath = path.join(PYTHON_ENV, "Scripts", "python");

export const runCTIPipeline = async (text) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "json",
      pythonPath,
      scriptPath: path.resolve("models"),
      args: [text],
    };

    PythonShell.run("ctiPipeline.py", options)
      .then((results) => resolve(results[0]))
      .catch((err) => reject(err));
  });
};
