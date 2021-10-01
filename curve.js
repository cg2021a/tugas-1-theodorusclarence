//#region  //*=========== Loop Function ===========
function topLoop(xIn) {
  const x = xIn * 10;
  const r = 2.75;
  const val = (Math.sqrt(1 - (x * x) / (r * r)) * r) / 2 + 3.55;
  return val / 10;
}
function topLoopB(xIn) {
  const x = xIn * 10;
  const r = 2.75;
  const val = -(Math.sqrt(1 - (x * x) / (r * r)) * r) / 2 + 3.55;
  return val / 10;
}
function innerTopLoop(xIn) {
  const x = xIn * 10;
  const r = 2.45;
  const val = (Math.sqrt(1 - (x * x) / (r * r)) * r) / 2.2 + 3.55;
  return val / 10;
}
function innerTopLoopB(xIn) {
  const x = xIn * 10;
  const r = 2.45;
  const val = -(Math.sqrt(1 - (x * x) / (r * r)) * r) / 2.1 + 3.55;
  return val / 10;
}
function bottomLoop(xIn) {
  const x = xIn * 10;
  const val = -(Math.sqrt(1 - (x * x) / (2 * 2)) * (2 / 1.6)) - 4.2;
  return val / 10;
}
function rObjBottomLoop(xIn) {
  const x = xIn * 10;
  const val = -(Math.sqrt(1 - (x * x) / (2 * 2)) * (2 / 2)) - 4.2;
  return val / 10;
}
//#endregion  //*======== Loop Function ===========

//#region  //?============================== Left Object =========================
//#region  //*=========== Top Circle ===========
const countX = 100;
const topTrianglesX = [...Array(countX)].flatMap((_, i) => [
  -0.275 + (i * 0.55) / countX,
  -0.275 + ((i + 1) * 0.55) / countX,
  0,
]);

const offset = 0.08;
const topHalf = topTrianglesX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, topLoop(x) + offset]
);
const bottomHalf = topTrianglesX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, topLoopB(x) + offset]
);

const topO = {
  count: 100,
  initial: -0.275,
  step: -0.275 * -2,
};
function topOffsetFn(i) {
  return topO.initial + (i * topO.step) / topO.count;
}
const topOffsetX = [...Array(topO.count)].flatMap((_, i) => [
  topOffsetFn(i),
  topOffsetFn(i + 1),
  topOffsetFn(i),
  topOffsetFn(i),
  topOffsetFn(i + 1),
  topOffsetFn(i + 1),
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
//#endregion  //*======== Top Circle ===========

//#region  //*=========== Inner Circle ===========
const innerCount = 100;
const innerX = [...Array(innerCount)].flatMap((_, i) => [
  -0.245 + (i * 0.49) / innerCount,
  -0.245 + ((i + 1) * 0.49) / innerCount,
  0,
]);

const innerTopHalf = innerX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, innerTopLoop(x) + offset]
);
const innerBottomHalf = innerX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [0, +0.355 + offset] : [x, innerTopLoopB(x) + offset]
);
//#endregion  //*======== Inner Circle ===========

//#region  //*=========== Body Left and Right ===========
// prettier-ignore
let bodyLeft = [
  -0.275, topLoopB(-0.275),
  -0.255, topLoopB(-0.255),
  -0.2, -0.42,
]
const bodyCountX = 100;
const bodyLeftX = [...Array(bodyCountX)].flatMap((_, i) => [
  -0.275 + (i * 0.075) / bodyCountX,
  -0.275 + ((i + 1) * 0.075) / bodyCountX,
  0,
]);
const bodyRightX = [...Array(bodyCountX)].flatMap((_, i) => [
  0.275 - (i * 0.075) / bodyCountX,
  0.275 - ((i + 1) * 0.075) / bodyCountX,
  0,
]);

bodyLeft = bodyLeftX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [-0.2, -0.42] : [x, topLoopB(x)]
);
const bodyRight = bodyRightX.flatMap((x, i) =>
  (i + 1) % 3 === 0 ? [0.2, -0.42] : [x, topLoopB(x)]
);
//#endregion  //*======== Body Left and Right ===========

//#region  //*=========== Body Mid ===========
const bodyMidObj = {
  count: 100,
  initial: -0.2,
  step: -0.2 * -2,
};
function bodyMidFn(i) {
  return bodyMidObj.initial + (i * bodyMidObj.step) / bodyMidObj.count;
}
const bodyMidX = [...Array(bodyMidObj.count)].flatMap((_, i) => [
  bodyMidFn(i),
  bodyMidFn(i + 1),
  bodyMidFn(i),
  bodyMidFn(i),
  bodyMidFn(i + 1),
  bodyMidFn(i + 1),
]);

const bodyMid = bodyMidX.flatMap((x, i) => {
  const compare = i % 6;
  if (compare === 0 || compare === 1 || compare === 4) {
    return [x, topLoopB(x)];
  } else if (compare === 2 || compare === 3 || compare === 5) {
    return [x, bottomLoop(x)];
  }
});
//#endregion  //*======== Body Mid ===========
//#endregion  //?=========================== Left Object =========================

//#region  //?============================== Right Object =========================
//#region  //*=========== Top Ridge ===========
const topWidth = 0.205;
const topRidgeObj = {
  width: topWidth,
  bottom: 0.355,
  top: 0.375,
};
// prettier-ignore
const topRidgeVertices = [
  -0.2, topRidgeObj.bottom, 
  -topRidgeObj.width, topRidgeObj.top, 
  0.2, topRidgeObj.top, 

  0.2, topRidgeObj.bottom, 
  topRidgeObj.width, topRidgeObj.top, 
  -0.2, topRidgeObj.bottom, 
]
//#endregion  //*======== Top Ridge ===========

//#region  //*=========== Top Metal List ===========
const topMetalList = topRidgeObj.top + 0.01;
function createSquare(lbx, lby, rtx, rty) {
  // prettier-ignore
  return [
    lbx, lby, 
    lbx, rty,
    -lbx, lby,

    rtx, rty, 
    rtx, lby,
    -rtx, rty,
  ]
}
// left: -topWidth, topRidgeObj.top,
// right: topWidth, topMetalList
// prettier-ignore
const topMetalListVertices = createSquare(-topWidth, topRidgeObj.top, topWidth, topMetalList)
//#endregion  //*======== Top Metal List ===========

//#region  //*=========== Top Cap Square ===========
const topCapSquare = topMetalList + 0.05;
const topCapSquareVertices = createSquare(
  -topWidth,
  topMetalList,
  topWidth,
  topCapSquare
);
//#endregion  //*======== Top Cap Square ===========

//#region  //*=========== Top Smaller Cap ===========
const topSmallerCap = topCapSquare + 0.02;
const topSmallerWOffset = 0.008;
const topSmallerCapVertices = createSquare(
  -(topWidth - topSmallerWOffset),
  topCapSquare,
  topWidth - topSmallerWOffset,
  topSmallerCap
);
//#endregion  //*======== Top Smaller Cap ===========

//#region  //*=========== Body ===========
const rBodyObj = {
  count: 100,
  initial: -0.2,
  step: -0.2 * -2,
  heightPoint: 0.355,
};
function rBodyFn(i) {
  return rBodyObj.initial + (i * rBodyObj.step) / rBodyObj.count;
}
const rBodyX = [...Array(rBodyObj.count)].flatMap((_, i) => [
  rBodyFn(i),
  rBodyFn(i + 1),
  rBodyFn(i),
  rBodyFn(i),
  rBodyFn(i + 1),
  rBodyFn(i + 1),
]);

const rBody = rBodyX.flatMap((x, i) => {
  const compare = i % 6;
  if (compare === 0 || compare === 1 || compare === 4) {
    return [x, rObjBottomLoop(x)];
  } else if (compare === 2 || compare === 3 || compare === 5) {
    return [x, rBodyObj.heightPoint];
  }
});
//#endregion  //*======== Body ===========

//#endregion  //?=========================== Right Object =========================

//#region  //*=========== Vertices ===========
const leftObjectVertices = [
  ...topHalf,
  ...bottomHalf,
  ...innerTopHalf,
  ...innerBottomHalf,
  ...topOffset,
  ...top2Offset,
  ...bodyLeft,
  ...bodyRight,
  ...bodyMid,
];
const rightObjectVertices = [
  ...rBody,
  ...topRidgeVertices,
  ...topMetalListVertices,
  ...topCapSquareVertices,
  ...topSmallerCapVertices,
];
// prettier-ignore
const vertices = [
  ...leftObjectVertices,
  ...rightObjectVertices
];
//#endregion  //*======== Vertices ===========

//#region  //?================= Colors ===================
function createColor(length, rgb) {
  return [...Array(length / 2)].flatMap(() => rgb);
}

//#region  //*=========== Left Object Colors ===========
const topColor = createColor(topHalf.length + bottomHalf.length, [0.8, 0, 0]);
const innerColor = createColor(
  innerTopHalf.length + innerBottomHalf.length,
  [0.76, 0, 0]
);
const offsetColor = createColor(topOffset.length, [0.7, 0, 0]);
const offset2Color = createColor(
  top2Offset.length,
  [0.752941176, 0.752941176, 0.752941176]
);
const bodyColor = createColor(
  bodyLeft.length + bodyRight.length + bodyMid.length,
  [0.6, 0, 0]
);

const leftObjectColors = [
  ...topColor,
  ...innerColor,
  ...offsetColor,
  ...offset2Color,
  ...bodyColor,
];
//#endregion  //*======== Left Object Colors ===========

//#region  //*=========== Right Object Colors ===========
const rBodyColor = createColor(rBody.length, [0.6, 0, 0]);
const topRidgeColor = createColor(topRidgeVertices.length, [0.8, 0, 0]);
const topMetalListColor = createColor(
  topMetalListVertices.length,
  [0.752941176, 0.752941176, 0.752941176]
);
const topCapSquareColor = createColor(
  topCapSquareVertices.length,
  [0.74, 0, 0]
);
const topSmallerCapColor = createColor(
  topSmallerCapVertices.length,
  [0.7, 0, 0]
);

const rightObjectColors = [
  ...rBodyColor,
  ...topRidgeColor,
  ...topMetalListColor,
  ...topCapSquareColor,
  ...topSmallerCapColor,
];
//#endregion  //*======== Right Object Colors ===========

const shadeColor = [...leftObjectColors, ...rightObjectColors];
const mixedColor = [...Array(vertices.length / 2)].flatMap(() => [
  Math.random() + 0.3,
  Math.random() + 0.3,
  Math.random() + 0.3,
]);

const color = 0 ? mixedColor : shadeColor;
//#endregion  //?============== Colors ===================

//#region  //*=========== Body Mid Pattern Example ===========
// prettier-ignore
// let bodyMid = [
//   -0.2, topLoopB(-0.2),
//   -0.18, topLoopB(-0.18),
//   -0.2, bottomLoop(-0.2),

//   -0.2, bottomLoop(-0.2),
//   -0.18, topLoopB(-0.18),
//   -0.18, bottomLoop(-0.18),

//   -0.18, topLoopB(-0.18),
//   -0.16, topLoopB(-0.16),
//   -0.18, bottomLoop(-0.18),

//   -0.18, bottomLoop(-0.18),
//   -0.16, topLoopB(-0.16),
//   -0.16, bottomLoop(-0.16),
// ]
/*
aab -0.2 - 0, -0.2 - (0 + 1), -0.2 - 0
bab -0.2 - 0, -0.2 - (0 + 1), -0.2 - (0 + 1),
aab -0.2 - 1, -0.2 - (1 + 1), -0.2 - 1
bab -0.2 - 1, -0.2 - (1 + 1), -0.2 - (1 + 1),
*/

// right Obj
// -0.2, bottomLoop(-0.2),
// -0.18, bottomLoop(-0.18),
// -0.2, 0.355,

// -0.2, 0.355,
// -0.18, bottomLoop(-0.18),
// -0.18, 0.355,

// -0.18, bottomLoop(-0.18),
// -0.16, bottomLoop(-0.16),
// -0.18, 0.355,

// -0.18, 0.355,
// -0.16, bottomLoop(-0.16),
// -0.16, 0.355,
//#endregion  //*======== Body Mid Pattern Example ===========
