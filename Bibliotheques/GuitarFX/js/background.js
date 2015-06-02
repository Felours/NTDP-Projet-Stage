

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    bounds: {
      width: 1200,
      height: 680
    },
    minWidth: 1200,
    minHeight: 680,
    resizable:false,
    singleton: true,
    id:'gfx-window'
  });
});