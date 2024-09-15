import merge from 'deepmerge';
import { useMemo } from 'react';
import { SimpleOptions, base } from './types';
import { fmtValues, combineMerge } from './dataUtils';

export const useChartConfig = (
  options: SimpleOptions,
  evaluatedScript: any,
  replaceVariables: (str: string) => string,
  width: number,
  height: number,
  theme: any,
  data: any
) => {
  return useMemo(() => {
    const textColor = theme.colors.text.primary;
    const backgroundColor = theme.colors.background.primary;
    const altbackgroundColor = theme.colors.background.secondary;

    const themedLayout = {
      font: {
        color: textColor,
      },
      paper_bgcolor: backgroundColor,
      plot_bgcolor: backgroundColor,
      hoverlabel: {
        bgcolor: textColor,
      },
      xaxis: {
        gridcolor: altbackgroundColor,
      },
      yaxis: {
        gridcolor: altbackgroundColor,
      },
    };

    const mergedLayout = merge(themedLayout, options.layout ?? {});
    let layout = fmtValues(mergedLayout, replaceVariables);
    let data = evaluatedScript.data;
    let config = evaluatedScript.config;

    const updatedConfig = {
      ...config,
      imgFormat: options.imgFormat,
      exportWidth: options.exportWidth,
      exportHeight: options.exportHeight,
      resScale: options.resScale,
    };

    return { data, layout, config: updatedConfig };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, evaluatedScript, replaceVariables, width, height, theme, data]);
};
