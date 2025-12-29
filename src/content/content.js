function extractPageData() {
  const text = document.body.innerText;

  const images = Array.from(document.images).map(img => ({
    src: img.src,
    alt: img.alt
  }));

  const links = Array.from(document.querySelectorAll("a")).map(a => ({
    text: a.innerText,
    href: a.href
  }));

  const videos = Array.from(document.querySelectorAll("video")).map(v => ({
    src: v.currentSrc || v.src
  }));

  return {
    title: document.title,
    url: window.location.href,
    text,
    images,
    links,
    videos
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "EXTRACT_DATA") {
    sendResponse(extractPageData());
  }
});
