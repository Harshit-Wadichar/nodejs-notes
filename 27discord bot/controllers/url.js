const shortid = require("shortid");
const URL = require("../models/url");
let url = null;

async function handleGenerateNewShortURL(inputURL, USER) {
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: inputURL,
    visitHistory: [],
    createdBy: USER,
  });

  return { shortID, redirectURL: inputURL };
}

async function handleGetAnalytics(shortId) {
  const result = await URL.findOne({ shortId });
  if (!result) {
    // Handle the case where no document is found
    throw new Error(`No analytics found for shortId: ${shortId}`);
  }
  return {
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  };
}

async function handleSeeUrls(user) {
  const allurls = await URL.find({ createdBy: user });
  if (!allurls) {
    // Handle the case where no document is found
    throw new Error(`No analytics found for shortId: ${shortId}`);
  }
  return allurls
    .map(
      (url) =>
        `Short id: ${url.shortId} of this url-> ${url.redirectURL}\n have total Clicks: ${url.visitHistory.length}`
    )
    .join("\n\n");
}

async function handleGetResponse(shortId, res) {
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    throw new Error("Short URL not found");
  }
  return entry.redirectURL;
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetResponse,
  handleSeeUrls,
};
