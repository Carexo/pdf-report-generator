const installer = require("electron-installer-windows");
const path = require("path");

const options = {
  src: path.join(__dirname, "/release-builds/PDF-generator-win32-ia32"),
  dest: path.join(__dirname, "dist/installers/"),
};

async function main(options) {
  console.log("Creating package (this may take a while)");
  try {
    await installer(options);
    console.log(`Successfully created package at ${options.dest}`);
  } catch (err) {
    console.error(err, err.stack);
    process.exit(1);
  }
}
main(options);
