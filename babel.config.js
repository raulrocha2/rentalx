module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }, loose: true }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@errors": "./src/errors",
          "@utils": "./src/utils",
          "@shared": "./src/shared",
          "@config": "./src/config",
          "@utils": "./src/utils"
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};


