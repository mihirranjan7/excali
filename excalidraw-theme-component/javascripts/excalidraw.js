(function () {
  const iframeHtml = `
    <div id="excalidraw-container" style="display:none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999;">
      <iframe src="https://excalidraw.com" style="width: 100%; height: 100%; border: none;"></iframe>
      <button id="attach-excalidraw-image" style="position: absolute; top: 10px; right: 10px;">Attach</button>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", iframeHtml);

  const excalidrawContainer = document.getElementById("excalidraw-container");
  if (!excalidrawContainer) {
    console.error("Excalidraw container not injected");
    return;
  }

  const attachButton = document.getElementById("attach-excalidraw-image");
  if (!attachButton) {
    console.error("Attach button not found");
    return;
  }

  console.log("Excalidraw container and button injected");

  // Open Excalidraw
  document.getElementById("open-excalidraw").addEventListener("click", () => {
    excalidrawContainer.style.display = "block";
  });

  // Handle Export and Attachment
  attachButton.addEventListener("click", async () => {
    const excalidrawIframe = excalidrawContainer.querySelector("iframe");
    const imageBlob = await excalidrawIframe.contentWindow.postMessage(
      { action: "export", type: "blob" },
      "*"
    );

    const formData = new FormData();
    formData.append("file", imageBlob, "excalidraw.png");

    // Upload the image
    const response = await fetch("/uploads.json", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
    });

    const data = await response.json();
    const markdownLink = `![Excalidraw Image](${data.url})`;

    // Insert Markdown Link into Composer
    const composer = Discourse.ComposerController.currentComposer;
    composer.addText(markdownLink);

    // Close Excalidraw
    excalidrawContainer.style.display = "none";
  });
})();
