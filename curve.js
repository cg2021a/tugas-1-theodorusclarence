function topLoop(xIn) {
  const x = xIn * 10;
  const val = (Math.sqrt(1 - (x * x) / (2.75 * 2.75)) * 2.75) / 2 + 3.55;
  return val / 10;
}
function topLoopB(xIn) {
  const x = xIn * 10;
  const val = -(Math.sqrt(1 - (x * x) / (2.75 * 2.75)) * 2.75) / 2 + 3.55;
  return val / 10;
}
function bottomLoop(xIn) {
  const x = xIn * 10;
  const val = -(Math.sqrt(1 - (x * x) / (2 * 2)) * (2 / 1.6)) - 4.2;
  return val / 10;
}

// #region circle
const countX = 100;
const topTrianglesX = [...Array(countX)]
  .map((_, i) => [
    -0.275 + (i * 0.55) / countX,
    -0.275 + ((i + 1) * 0.55) / countX,
    0,
  ])
  .flat();

const offset = 0.08;
const topHalf = topTrianglesX
  .map((x, i) =>
    (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, topLoop(x) + offset]
  )
  .flat();
const bottomHalf = topTrianglesX
  .map((x, i) =>
    (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, topLoopB(x) + offset]
  )
  .flat();

const topO = {
  count: 100,
  initial: -0.275,
  step: -0.275 * -2,
};
const topOffsetX = [...Array(topO.count)].flatMap((_, i) => [
  topO.initial + (i * topO.step) / topO.count,
  topO.initial + ((i + 1) * topO.step) / topO.count,
  topO.initial + (i * topO.step) / topO.count,
  topO.initial + (i * topO.step) / topO.count,
  topO.initial + ((i + 1) * topO.step) / topO.count,
  topO.initial + ((i + 1) * topO.step) / topO.count,
]);

const topOffset = topOffsetX.flatMap((x, i) => {
  const compare = i % 6;
  if (compare === 0 || compare === 1 || compare === 4) {
    return [x, topLoopB(x) + offset];
  } else if (compare === 2 || compare === 3 || compare === 5) {
    return [x, topLoopB(x) + 0.01];
  }
});

const top2Offset = topOffsetX.flatMap((x, i) => {
  const compare = i % 6;
  if (compare === 0 || compare === 1 || compare === 4) {
    return [x, topLoopB(x) + 0.01];
  } else if (compare === 2 || compare === 3 || compare === 5) {
    return [x, topLoopB(x)];
  }
});

// #endregion

// #region body
// prettier-ignore
let bodyLeft = [
  -0.275, topLoopB(-0.275),
  -0.255, topLoopB(-0.255),
  -0.2, -0.42,
]
const bodyCountX = 100;
const bodyLeftX = [...Array(bodyCountX)]
  .map((_, i) => [
    -0.275 + (i * 0.075) / bodyCountX,
    -0.275 + ((i + 1) * 0.075) / bodyCountX,
    0,
  ])
  .flat();
const bodyRightX = [...Array(bodyCountX)]
  .map((_, i) => [
    0.275 - (i * 0.075) / bodyCountX,
    0.275 - ((i + 1) * 0.075) / bodyCountX,
    0,
  ])
  .flat();
bodyLeft = bodyLeftX
  .map((x, i) => ((i + 1) % 3 === 0 ? [-0.2, -0.42] : [x, topLoopB(x)]))
  .flat();
const bodyRight = bodyRightX
  .map((x, i) => ((i + 1) % 3 === 0 ? [0.2, -0.42] : [x, topLoopB(x)]))
  .flat();
// #endregion

// #region body
// prettier-ignore
let bodyMid = [
  -0.2, topLoopB(-0.2),
  -0.18, topLoopB(-0.18),
  -0.2, bottomLoop(-0.2),
  
  -0.2, bottomLoop(-0.2),
  -0.18, topLoopB(-0.18),
  -0.18, bottomLoop(-0.18),
  
  -0.18, topLoopB(-0.18),
  -0.16, topLoopB(-0.16),
  -0.18, bottomLoop(-0.18),
  
  -0.18, bottomLoop(-0.18),
  -0.16, topLoopB(-0.16),
  -0.16, bottomLoop(-0.16),
]
/*
aab -0.2 - 0, -0.2 - (0 + 1), -0.2 - 0
bab -0.2 - 0, -0.2 - (0 + 1), -0.2 - (0 + 1),
aab -0.2 - 1, -0.2 - (1 + 1), -0.2 - 1
bab -0.2 - 1, -0.2 - (1 + 1), -0.2 - (1 + 1),
 */

const bodyMidCountX = 20;
const bodyMidX = [...Array(bodyMidCountX)]
  .map((_, i) => [
    -0.2 + (i * 0.4) / bodyMidCountX,
    -0.2 + ((i + 1) * 0.4) / bodyMidCountX,
    -0.2 + (i * 0.4) / bodyMidCountX,
    -0.2 + (i * 0.4) / bodyMidCountX,
    -0.2 + ((i + 1) * 0.4) / bodyMidCountX,
    -0.2 + ((i + 1) * 0.4) / bodyMidCountX,
  ])
  .flat();
bodyMid = bodyMidX
  .map((x, i) => {
    const compare = i % 6;
    if (compare === 0 || compare === 1 || compare === 4) {
      return [x, topLoopB(x)];
    } else if (compare === 2 || compare === 3 || compare === 5) {
      return [x, bottomLoop(x)];
    }
  })
  .flat();
// #endregion

const vertices = [
  ...topHalf,
  ...bottomHalf,
  ...topOffset,
  ...top2Offset,
  ...bodyLeft,
  ...bodyRight,
  ...bodyMid,
];

// COLOR
const topColor = [...Array((topHalf.length + bottomHalf.length) / 2)].flatMap(
  (_, i) => [0.8, 0, 0]
);
const offsetColor = [...Array(topOffset.length / 2)].flatMap((_, i) => [
  0.7, 0, 0,
]);
const offset2Color = [...Array(topOffset.length / 2)].flatMap((_, i) => [
  0.752941176, 0.752941176, 0.752941176,
]);

const bodyColor = [
  ...Array((bodyLeft.length + bodyRight.length + bodyMid.length) / 2),
].flatMap((_, i) => [0.6, 0, 0]);

const shadeColor = [...topColor, ...offsetColor, ...offset2Color, ...bodyColor];
const mixedColor = [...Array(vertices.length / 2)].flatMap((_, i) => [
  Math.random(),
  Math.random(),
  0,
]);

const color = shadeColor;
