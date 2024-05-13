const siteUrl = "https://www.barbaraguest.com/";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      // {userAgent: "*", disallow: "/somepage"},
      { userAgent: "*", allow: "/" },
    ],
  },
  // exclude: [],
};
