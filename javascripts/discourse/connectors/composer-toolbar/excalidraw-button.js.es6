(function () {
    const toolbar = document.querySelector(".composer-toolbar");
    const button = document.createElement("button");
    button.innerText = "🖋️ Excalidraw";
    button.id = "open-excalidraw";
    toolbar.appendChild(button);
  
    button.addEventListener("click", () => {
      const excalidrawContainer = document.getElementById("excalidraw-container");
      excalidrawContainer.style.display = "block";
    });
  })();
  