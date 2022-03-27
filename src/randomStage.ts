import { createElementsWithClass } from "./utils";

const stage = document.getElementById("randomStage");

const createStage = () => {
  if (!stage) return;
  stage.innerHTML = "";

  const COUNT = 12;
  const dots = createElementsWithClass(COUNT, "div", "dot");

  dots.forEach((dot) => {
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    stage?.appendChild(dot);
  });

  return stage;
};

createStage();
// クリックで再生成
stage?.addEventListener("click", createStage);
