import { appendAll, createElementsWithClass } from "./utils";

const STAGEID = "stage5";
const stage = document.querySelector(`#${STAGEID}`)!;
const center = document.querySelector(`#${STAGEID} .center`)!;
const star = document.querySelector(`#${STAGEID} .star`)!;

const randomColor = () => {
  const colors = ["gold", "#f7e486", "#fff9d9", "#ff792b"];
  const borders = [0.6, 0.8, 0.9, 1];

  const r = Math.random();
  const index = borders.findIndex((border) => border > r);
  return colors[index];
};

const pickRandom = <T>(sources: T[], count: number): T[] => {
  const shuffled = [...sources]
    .map((item) => ({ order: Math.random(), item }))
    .sort((a, b) => a.order - b.order)
    .map((wrapper) => wrapper.item);
  shuffled.length = count;
  return shuffled;
};

const popCenterStar = async () => {
  // 中央の星を縮める
  await star.animate([{ transform: `scale(1)` }, { transform: `scale(0.6)` }], {
    duration: 150
  }).finished;

  // 中央の星を下の大きさに戻す
  // このアニメーションは完了を待たずに次の処理に移る
  star.animate(
    [
      { transform: `scale(0.6)` },
      { transform: `scale(1.4)`, offset: 0.3 },
      { transform: `scale(1)` }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );
};

// クリック時のアニメーション
const stage1emit = async () => {
  await popCenterStar();
  // div.dotをCOUNT個作成
  const COUNT = 20;
  const dots = createElementsWithClass(COUNT, "div", "dot");
  appendAll(center, dots); // 画面に表示

  // 大きなドットとボーダーのみのドットを決める
  // 母数（全体のドット数=COUNT）が小さい場合、ドットごとに乱数で決めると発生数の偏りが大きくなる
  // 偏りを避けるため、ここでは必ず一定数を抽出する（どのドットが抽出されるかはランダム）
  const bigDots = pickRandom(dots, Math.round(COUNT * 0.2));
  const borderDots = pickRandom(dots, Math.round(COUNT * 0.2));
  const afterImageDots = pickRandom(dots, Math.round(COUNT * 0.3));

  const animations1 = dots.map((dot, index) => {
    const angle = (360 / COUNT) * index;
    const distRandom = (Math.random() * Math.random()) ** 1.5 * (Math.random() < 0.5 ? -1 : 1)
    const dist = 80 + distRandom * 50;
    const isBig = bigDots.includes(dot);
    const size = isBig ? 2 + Math.random() * 2 : 0.5 + Math.random();
    const color = randomColor();
    const isBorder = borderDots.includes(dot);
    if (isBorder) {
      dot.style.border = `1px solid ${color}`;
      dot.style.background = "transparent";
    } else {
      dot.style.background = color;
    }

    return dot.animate(
      [
        {
          transform: `rotate(${angle}deg) translateX(0px) scale(${size})`,
          opacity: 1
        },
        {
          transform: `rotate(${angle}deg) translateX(${dist * 1.3}px) scale(${
            size * 1.2
          })`,
          opacity: 1,
          offset: 0.7,
          easing: "cubic-bezier(.12,.73,.42,1)"
        },
        {
          transform: `rotate(${angle}deg) translateX(${dist}px) scale(${size})`,
          opacity: 1
        }
      ],
      {
        duration: dist * 4,
        delay: 300 * Math.random(),
        fill: "forwards"
      }
    );
  });

  // 全てのアニメーションが終わるまで待つ
  await Promise.all(animations1.map((anim) => anim.finished));
  animations1.forEach((anim) => anim.commitStyles());

  const animations2 = dots.map((dot, index) => {
    const isAfterImaged = afterImageDots.includes(dot);
    animations1[index].commitStyles();
    return dot.animate(
      [
        {
          opacity: 1,
          filter: "brightness(1)"
        },
        {
          opacity: 0,
          filter: "brightness(3)"
        }
      ],
      {
        duration: isAfterImaged ? 500 + Math.random() * 500 : 200,
        delay: Math.random() * 300,
        fill: "both"
      }
    );
  });
  // 全てのアニメーションが終わるまで待つ
  await Promise.all(animations2.map((anim) => anim.finished));

  // removeAll(dots); // 削除
};

// クリックでアニメーションを実行
stage?.addEventListener("click", stage1emit);
