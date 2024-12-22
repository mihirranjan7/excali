(function () {
  // Wait for the toolbar to load
  const toolbar = document.querySelector(".composer-toolbar");
  
  if (!toolbar) {
    console.error("Composer toolbar not found");
    return;
  }

  const button = document.createElement("button");
  button.innerText = "🖋️ Excalidraw";
  button.id = "open-excalidraw";
  toolbar.appendChild(button);

  console.log("Excalidraw button added to toolbar");

  button.addEventListener("click", () => {
    const excalidrawContainer = document.getElementById("excalidraw-container");
    if (excalidrawContainer) {
      excalidrawContainer.style.display = "block";
    } else {
      console.error("Excalidraw container not found");
    }
  });
})();
