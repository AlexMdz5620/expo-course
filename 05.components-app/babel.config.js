module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Cualquier otro plugin va aquí...
      "react-native-reanimated/plugin", // ¡ESTE SIEMPRE AL FINAL!
    ],
  };
};
