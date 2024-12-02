// https://github.com/plotly/plotly.js/blob/master/dist/README.md#to-support-mathjax
globalThis.PlotlyConfig = { MathJaxConfig: 'local' };

export function jjfx(x) {
  return x + 2;
}
