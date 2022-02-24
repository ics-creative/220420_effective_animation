import { appendAll, createElementsWithClass, removeAll } from "./utils";

// stage1
const STAGEID = 'stage3'
const stage = document.querySelector(`#${STAGEID}`)!;
const center = document.querySelector(`#${STAGEID} .center`)!;

// クリック時のアニメーション
const stage1emit = async () => {
  const COUNT = 100;

  // div.dotをCOUNT個作成
  const dots = createElementsWithClass(COUNT, "div", "dot");
  appendAll(center, dots); // 画面に表示

  const animations = dots.map((dot) => {
    const angle = 360 * Math.random();
    const dist = 100 + 50 * Math.random();
    const size = 0.5 + Math.random() * 2;
    const hue = 30 + Math.random() * 25
    dot.style.backgroundColor = `hsl(${hue}, 90%, 60%)`

    const hasBlendmode = Math.random() > 0.5
    const hasBlur = Math.random() > 0.5
    if (hasBlendmode) {
      dot.style.mixBlendMode = 'add'
    }
    if (hasBlur) {
      dot.style.filter = `blur(${Math.random() * 20}px)`
    }
    return dot.animate(
      [
        {
          transform: `rotate(${angle}deg) translateX(0px) scale(${size})`,
          opacity: 0.8,
        },
        {
          transform: `rotate(${angle}deg) translateX(${dist}px) scale(${size})`,
          opacity: 0.8,
          offset: 0.8,
        },
        {
          transform: `rotate(${angle}deg) translateX(${dist}px) scale(${size})`,
          opacity: 0,
        },
      ],
      {
        duration: 500 * Math.random(),
      }
    );
  });

  // 全てのアニメーションが終わるまで待つ
  await Promise.all(animations.map((anim) => anim.finished));
  removeAll(dots); // 削除
};

// クリックでアニメーションを実行
stage?.addEventListener("click", stage1emit);
