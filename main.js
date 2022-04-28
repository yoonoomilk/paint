const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("Color");
const range = document.getElementById("Range");
const mode = document.getElementById("Mode");
const saveBtn = document.getElementById("Save");
const uploadedFile = document.getElementById("upload");

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

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "saves";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
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

function handleFiles() {
  let selectedFile = document.getElementById("upload").files[0];
  const file = URL.createObjectURL(selectedFile);
  document.getElementById("background").src = file;
}

uploadedFile.addEventListener("change", handleFiles);
