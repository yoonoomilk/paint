const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("Color");
const range = document.getElementById("Range");
const mode = document.getElementById("Mode");
const saveBtn = document.getElementById("Save");

const INITIAL_COLOR = "#000000";
setInterval(function() {
  CANVAS_ROW = window.innerWidth;
  CANVAS_COL = window.innerHeight;
})

var CANVAS_ROW = window.innerWidth;
var CANVAS_COL = window.innerHeight;

ctx.strokeStyle = "#2c2c2c";

canvas.width = CANVAS_ROW;
canvas.height = CANVAS_COL;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_ROW, CANVAS_COL);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
 if (filling) {
   filling = false;
   mode.innerText = "Fill";
 } else {
  filling = true;
  mode.innerText = "Paint";
 }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "saves";
  link.click();
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_ROW, CANVAS_COL);
  }
  filling = false;
  mode.innerText = "Fill";
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
