chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getBookmarks") {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const bookmarksJSON = JSON.stringify(bookmarkTreeNodes, null, 2);
      sendResponse({ data: bookmarksJSON });
    });
    return true;
  }
});
