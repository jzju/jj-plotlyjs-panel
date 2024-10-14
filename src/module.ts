import { SimpleOptions, inits, base } from './types';
import { PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
// Import an entire module for side effects only, without importing anything.
// This runs the module's global code, but doesn't actually import any values.
// It sets the global variable for Plotly before loading plotly.js
import 'utils';

import { SimplePanel } from './SimplePanel';
import { PanelOptionCode } from './PanelOptionCode';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel)
  .setDataSupport({ annotations: true })
  .setPanelOptions((builder) => {
    return builder
      .addSelect({
        name: 'Image format',
        description: 'File type of exported image',
        settings: {
          options: [
            { value: 'svg', label: 'SVG' },
            { value: 'png', label: 'PNG' },
            { value: 'jpeg', label: 'JPG' },
            { value: 'webp', label: 'WebP' },
          ],
        },
        path: 'imgFormat',
        defaultValue: 'png',
      })
      .addNumberInput({
        name: 'Exported image width',
        description: 'Defined width of exported image',
        path: 'exportWidth',
      })
      .addNumberInput({
        name: 'Exported image height',
        description: 'Defined height of exported image',
        path: 'exportHeight',
      })
      .addNumberInput({
        name: 'Exported resolution scale',
        description: 'Factor of exported image resolution (may cause odd spacing)',
        path: 'resScale',
        defaultValue: 2,
      })
      .addSelect({
        name: 'Timezone correction',
        description: 'Time column used to correct data received by Plotly into the correct timezone',
        path: 'timeCol',
        defaultValue: '',
        settings: {
          allowCustomValue: true,
          options: [],
          getOptions: async (context: FieldOverrideContext) => {
            const options = [{ value: '', label: 'No correction' }];
            if (context && context.data) {
              for (const frame of context.data) {
                for (const field of frame.fields) {
                  const name = getFieldDisplayName(field, frame, context.data);
                  const value = name;
                  options.push({ value, label: name });
                }
              }
            }
            return Promise.resolve(options);
          },
        },
      })
      .addCustomEditor({
        id: 'layout',
        path: 'layout',
        name: 'Layout',
        description: 'Layout object for the Plotly chart (defaults are applied as base)',
        editor: PanelOptionCode,
        category: ['Layout Editor'],
        settings: {
          language: 'yaml',
          baseValue: base.layout,
          initValue: inits.layout,
        },
        defaultValue: inits.layout,
      })
      .addCustomEditor({
        id: 'script',
        path: 'script',
        name: 'Processing Script',
        description: `
          Script executed whenever new data is available.
          Must return an object with one or more of the following properties:
          data, layout, config.`,
        editor: PanelOptionCode,
        category: ['Script Editor'],
        settings: {
          language: 'javascript',
        },
        defaultValue: inits.script,
      })
      .addCustomEditor({
        id: 'onclick',
        path: 'onclick',
        name: 'On-event Trigger',
        description: `
          Script executed when chart is clicked, a selection is made, or a zoom action occurs.
          The 'eventType' variable will be 'click', 'select', or 'zoom'.`,
        editor: PanelOptionCode,
        category: ['On-event Editor'],
        settings: {
          language: 'javascript',
        },
        defaultValue: inits.onclick,
      })
      .addBooleanSwitch({
        path: 'syncTimeRange',
        name: 'Sync Time Range',
        description: 'Synchronize dashboard time range with chart zoom',
        defaultValue: false,
      });
  });
