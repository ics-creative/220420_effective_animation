import { appendAll, createElementsWithClass, removeAll } from "./utils";

// stage1
const STAGEID = "stage10";
const stage = document.querySelector(`#${STAGEID}`)!;
const center = document.querySelector(`#${STAGEID} .center`)!;
const star = document.querySelector(`#${STAGEID} .star`)!;

// クリック時のアニメーション
const stage1emit = async () => {
  const COUNT = 8;

  await star.animate([
    {
      transform: `scale(1)`,
    },
    {
      transform: `scale(0.7)`,
    },
    {
      transform: `scale(0.6)`,
    }
  ], {
    duration: 150,
  }).finished
  star.animate([
    {
      transform: `scale(0.7)`,
      easing: 'ease-out'
    },
    {
      transform: `scale(1)`,
    }
  ], {
    duration: 500
  })

  // div.dotをCOUNT個作成
  const dots = createElementsWithClass(COUNT, "div", "dot");
  const wrappers = createElementsWithClass(COUNT, "div", "wrapper");
  wrappers.forEach((wrapper, index) => wrapper.appendChild(dots[index]));

  appendAll(center, wrappers); // 画面に表示

  const wrapperAnimations = wrappers.map((wrapper, index) => {
    const angle = (360 / COUNT) * index + Math.random() * 0;
    const dist = 80;
    const len = 2 + Math.random() * 4
    const delay = Math.random() * 600;

    return wrapper.animate(
      [
        {
          transform: `rotate(${angle}deg) translateX(0px) scaleX(1)`,
          opacity: 1,
          easing: 'ease-out'
        },
        {
          transform: `rotate(${angle}deg) translateX(${
            dist * 0.9
          }px) scaleX(${len})`,
          opacity: 1,
          offset: 0.6,
          easing: 'ease-in'
        },
        {
          transform: `rotate(${angle}deg) translateX(${dist}px)  scaleX(1)`,
          opacity: 1,
        },
      ],
      {
        duration: 500,
        delay,
        fill: 'forwards'
      }
    );
  });

  // 全てのアニメーションが終わるまで待つ
  await Promise.all(wrapperAnimations.map((anim) => anim.finished));


  const dotsAnimations = dots.map((dot) => {
    return dot.animate([
      {
        transform: `scale(1)`,
        easing: 'ease-out'
      },
      {
        transform: `translateX(-20px) scale(1.5)`,
        offset: 0.8
      },
      {
        transform: `translateX(30px) scale(0)`,
      },
    ], {
      duration: 500
    });
  });

  star.animate([
    {
      transform: `scale(0.7)`,
      easing: 'ease-out'
    },
    {
      transform: `scale(1)`,
    }
  ], {
    duration: 500
  })

  await Promise.all(dotsAnimations.map((anim) => anim.finished));

  removeAll(wrappers); // 削除
};

// クリックでアニメーションを実行
stage?.addEventListener("click", stage1emit);
