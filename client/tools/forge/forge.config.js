// Forge Configuration
const path = require("path");
const rootDir = process.cwd();

module.exports = {
  // Packager Config
  packagerConfig: {
    extraResource: [
      "src/main/irisSTT-v2"
    ],
    // Create asar archive for main, renderer process files
    asar: true,
    // Set executable name
    executableName: "iris",
    // Set application copyright
    appCopyright: "iris",
    // Set application icon
    icon: path.resolve("assets/images/appIcon.ico"),
  },
  // Forge Makers(윈도우 제외하고 다 삭제)
  makers: [
    {
      // Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing
      // Windows applications and is therefore the most user friendly you can get.
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "iris",
      },
    },
  ],
  // Forge Plugins
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        // Fix content-security-policy error when image or video src isn't same origin
        // Remove 'unsafe-eval' to get rid of console warning in development mode.
        devContentSecurityPolicy: `default-src 'self' http://j8b102.p.ssafy.io:9000 * 'unsafe-inline' data:; script-src 'self'  'unsafe-inline' data:`,
        // Ports
        port: 3000, // Webpack Dev Server port
        loggerPort: 9000, // Logger port
        // Main process webpack configuration
        mainConfig: path.join(rootDir, "tools/webpack/webpack.main.js"),
        // Renderer process webpack configuration
        renderer: {
          // Configuration file path
          config: path.join(rootDir, "tools/webpack/webpack.renderer.js"),
          // Entrypoints of the application
          entryPoints: [
            {
              // Window process name
              name: "app_window",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/app.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/appRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/appPreload.tsx"),
              },
            },
            {
              // Window process name
              name: "response",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/response.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/responseRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/responsePreload.tsx"),
              },
            },
          ],
        },
        devServer: {
          liveReload: false,
        },
      },
    },
  ],
};
