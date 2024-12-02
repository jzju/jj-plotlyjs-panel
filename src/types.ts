export interface SimpleOptions {
  imgFormat: 'svg' | 'png' | 'jpeg' | 'webp';
  exportWidth: number | null;
  exportHeight: number | null;
  resScale: number;
  timeCol: string;
  syncTimeRange: boolean;
  title: string;
  allData: object;
  data: any[];
  layout: object;
  config: object;
  script: string;
  onclick: string;
}

export interface SimpleBase {
  allData: object;
  data: any[];
  layout: object;
  config: object;
}

export type EditorCodeType = string | undefined;

export type EditorLanguageType = 'javascript' | 'html' | 'yaml' | undefined;

const defaultLayout = {
  xaxis: {
    autorange: true,
    automargin: true,
  },
  yaxis: {
    autorange: true,
    automargin: true,
  },
  title: {
    automargin: true,
  },
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
  },
  font:{
    size: 16
  }
};

// Defaults that Plotly falls back to
export const base: SimpleBase = {
  allData: {},
  data: [],
  layout: defaultLayout,
  config: {},
};

// Defaults that Plotly begins with as an example
export const inits: SimpleOptions = {
  imgFormat: 'svg',
  exportWidth: null,
  exportHeight: null,
  resScale: 2,
  timeCol: '',
  syncTimeRange: true,
  title: 'Plotly panel',
  allData: {},
  data: [],
  layout: defaultLayout,
  config: {},
  script: `\
let fields = data.series[0].fields;
return {
  data: [{
    x: fields[0].values,
    y: fields[1].values,
    type: 'bar',
    marker: {
      color: 'green',
    }
  }]
}
  `,
  onclick: ``,
};
