import { appendAll, createElementsWithClass, removeAll } from "./utils";

// stage1
const STAGEID = 'stage1'
const stage = document.querySelector(`#${STAGEID}`)!;
const center = document.querySelector(`#${STAGEID} .center`)!;

// クリック時のアニメーション
const stage1emit = async () => {
  const COUNT = 10;

  // div.dotをCOUNT個作成
  const dots = createElementsWithClass(COUNT, "div", "dot");
  appendAll(center, dots); // 画面に表示

  const animations = dots.map((dot, index) => {
    const angle = (360 / COUNT) * index;
    return dot.animate(
      [
        {
          transform: `rotate(${angle}deg) translateX(0px)`,
          opacity: 1,
        },
        {
          transform: `rotate(${angle}deg) translateX(100px)`,
          opacity: 1,
          offset: 0.8,
        },
        {
          transform: `rotate(${angle}deg) translateX(100px)`,
          opacity: 0,
        },
      ],
      {
        duration: 500,
      }
    );
  });

  // 全てのアニメーションが終わるまで待つ
  await Promise.all(animations.map((anim) => anim.finished));
  removeAll(dots); // 削除
};

// クリックでアニメーションを実行
stage?.addEventListener("click", stage1emit);
