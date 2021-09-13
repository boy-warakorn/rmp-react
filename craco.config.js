const emotionPresetOptions = {};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  emotionPresetOptions
);

module.exports = {
  babel: {
    plugins: [...emotionBabelPreset.plugins, "babel-plugin-macros"],
  },
  plugins: [
    {
      plugin: require("craco-alias"),
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
    {
      plugin: require("craco-antd"),
    },
  ],
};
