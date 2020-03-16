module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],

    browsers: ["ChromeHeadless"],

    files: [
      // all files ending in "_test"
      { pattern: "test/*_test.js", watched: false },
      { pattern: "test/**/*_test.js", watched: false }
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      "test/*_test.js": ["webpack"],
      "test/**/*_test.js": ["webpack"]
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: "errors-only"
    }
  });
};
