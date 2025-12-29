chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_PAGE_DATA") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["src/content/content.js"]
        },
        () => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "EXTRACT_DATA" },
            sendResponse
          );
        }
      );
    });
    return true;
  }
});
