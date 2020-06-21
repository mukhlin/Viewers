import React from 'react';
import Objects3DPanel from './components/Objects3DPanel/Objects3DPanel';

export const TOOL = 'FreehandRoi';
export default {
  id: 'com.quantumsoft.ohif.3d-objects',

  getToolbarModule() {
    return {
      definitions: [
        {
          id: '3DObject',
          label: '3D Object',
          icon: 'ellipse-circle',
          buttons: [
            {
              id: 'Polygon',
              label: 'Polygon',
              icon: 'liver',
              type: 'setToolActive',
              commandName: 'setToolActive',
              commandOptions: {toolName: TOOL},
            }
          ],
        },
      ],
      defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
    };
  },

  getPanelModule({ servicesManager, commandsManager }) {
    return {
      menuOptions: [
        {
          icon: 'cube',
          label: '3D Objects',
          target: 'objects-3d-panel',
        },
      ],
      components: [
        {
          id: 'objects-3d-panel',
          component: () =>
            <Objects3DPanel
              servicesManager={servicesManager}
              commandsManager={commandsManager}
            />,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
