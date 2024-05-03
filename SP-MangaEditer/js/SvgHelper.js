/** Load SVG(Verfical, Landscope) */
function loadSVGPlusReset(svgString) {
  allRemove();
  fabric.loadSVGFromString(svgString, function (objects, options) {
    var canvasUsableHeight = canvas.height - svgPagging;
    var overallScaleX = canvas.width / options.width;
    var overallScaleY = canvasUsableHeight / options.height;
    var scaleToFit = Math.min(overallScaleX, overallScaleY);
    var offsetX = (canvas.width - options.width * scaleToFit) / 2;
    var offsetY =
      svgPagging / 2 + (canvasUsableHeight - options.height * scaleToFit) / 2;

    clipAreaCoords.left = offsetX;
    clipAreaCoords.top = offsetY;
    clipAreaCoords.width = options.width * scaleToFit + 4;
    clipAreaCoords.height = options.height * scaleToFit + 4;
    canvas.backgroundColor = "white";

    objects.forEach(function (obj) {
      obj.scaleX = scaleToFit;
      obj.scaleY = scaleToFit;
      obj.top = obj.top * scaleToFit + offsetY;
      obj.left = obj.left * scaleToFit + offsetX;
      obj.setCoords();

      obj.selectable = true;
      obj.hasControls = true;
      obj.lockMovementX = false;
      obj.lockMovementY = false;
      obj.lockRotation = false;
      obj.lockScalingX = false;
      obj.lockScalingY = false;

      canvas.add(obj);
    });
    changeStrokeWidth( document.getElementById("strokeWidth").value );
    canvas.renderAll();
  });
}

/** Sppech bubble */
function loadSVGReadOnly(svgString) {
  fabric.loadSVGFromString(svgString, function (objects, options) {
    var canvasUsableHeight = canvas.height * 0.3 - svgPagging;
    var overallScaleX = (canvas.width * 0.3) / options.width;
    var overallScaleY = canvasUsableHeight / options.height;
    var scaleToFit = Math.min(overallScaleX, overallScaleY);
    var offsetX = (canvas.width - options.width * scaleToFit) / 2;
    var offsetY =
      svgPagging / 2 + (canvasUsableHeight - options.height * scaleToFit) / 2;

    var scaledObjects = objects.map(function (obj) {
      obj.scaleX = scaleToFit;
      obj.scaleY = scaleToFit;
      obj.top = obj.top * scaleToFit + offsetY;
      obj.left = obj.left * scaleToFit + offsetX;
      return obj;
    });

    var group = new fabric.Group(scaledObjects, {
      left: offsetX,
      top: offsetY,
      selectable: true,
      hasControls: true,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
    });

    canvas.add(group);
    canvas.renderAll();
    updateLayerPanel();
  });
}

/** load svg. */
const previewAreaVertical = document.getElementById(
  "svg-preview-area-vertical"
);
const previewAreaLandscape = document.getElementById(
  "svg-preview-area-landscape"
);
const speechBubbleArea = document.getElementById(
  "speech-bubble-svg-preview-area1"
);

window.onload = function () {
  previewAreaVertical.innerHTML = "";

  /** Load vertical manga panel image. */
  MangaPanelsImage_Vertical.forEach((item) => {
    const img = document.createElement("img");
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(item.svg);
    img.classList.add("svg-preview");
    img.alt = item.name;
    img.addEventListener("click", function () {
      loadSVGPlusReset(item.svg);
    });
    previewAreaVertical.appendChild(img);
  });

  /** Load landscape manga panel image. */
  previewAreaLandscape.innerHTML = "";
  MangaPanelsImage_Landscape.forEach((item) => {
    const img = document.createElement("img");
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(item.svg);
    img.classList.add("svg-preview");
    img.alt = item.name;
    img.addEventListener("click", function () {
      loadSVGPlusReset(item.svg);
    });
    previewAreaLandscape.appendChild(img);
  });

  /** Load speech bubble manga panel image. */
  // speechBubbleArea.innerHTML = "";
  SpeechBubble.forEach((item) => {
    const img = document.createElement("img");
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(item.svg);
    img.classList.add("svg-preview");
    img.alt = item.name;
    img.addEventListener("click", function () {
      loadSVGReadOnly(item.svg);
    });
    speechBubbleArea.appendChild(img);
  });
};

/** Disallow drag-on-drop. */
document.addEventListener("DOMContentLoaded", function () {
  var svgPreviewArea = document.getElementById("svg-container-vertical");
  svgPreviewArea.addEventListener(
    "mousedown",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
});

/** Disallow drag-on-drop. */
document.addEventListener("DOMContentLoaded", function () {
  var svgPreviewArea = document.getElementById("svg-container-landscape");
  svgPreviewArea.addEventListener(
    "mousedown",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
});

/** Disallow drag-on-drop. */
document.addEventListener("DOMContentLoaded", function () {
  var svgPreviewArea = document.getElementById("speech-bubble-area1");

  svgPreviewArea.addEventListener(
    "mousedown",
    function (event) {
      // スライダーの要素上でのマウスダウンイベントは許可する
      if (!event.target.closest("input[type='range']")) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    false
  );
});