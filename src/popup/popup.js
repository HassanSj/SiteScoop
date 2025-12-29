document.getElementById("extract").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "GET_PAGE_DATA" }, data => {
    const summary = {
      title: data.title,
      url: data.url,
      textSummary: summarizeText(data.text),
      imageCount: data.images.length,
      linkCount: data.links.length,
      videoCount: data.videos.length
    };

    document.getElementById("output").textContent =
      JSON.stringify(summary, null, 2);
  });
});

function summarizeText(text) {
  return text
    .split(".")
    .slice(0, 5)
    .join(".") + "...";
}
