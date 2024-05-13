const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "main.scss";`,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    SPARK_TOKEN: process.env.SPARK_TOKEN,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    WALK_SCORE: process.env.WALK_SCORE,
  },
  images: {
    domains: [
      "cdn.resize.sparkplatform.com",
      "cdn.photos.sparkplatform.com",
      "cdn.sanity.io",
      "api.east.floplan.io",
    ],
  },
};
