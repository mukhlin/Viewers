import React from 'react';
import toolbarModule from './toolbarModule';
import ConnectedObject3DTable from './components/Object3DPanel/ConnectedObject3DTable';
import Object3DPropertiesDialog from './components/Object3DPropertiesDialog/Object3DPropertiesDialog';

const DIALOG_ID = 'object3d-properties';

export default {
  id: 'com.quantumsoft.ohif.3d-objects',

  getToolbarModule() {
    return toolbarModule;
  },

  getPanelModule({ servicesManager, commandsManager }) {
    const { UIDialogService } = servicesManager.services;

    const openPropertiesDialog = (objectData) => {
      if (!UIDialogService) {
        console.warn('Unable to show dialog; no UI Dialog Service available.');
        return;
      }

      UIDialogService.dismiss({ id: DIALOG_ID });
      UIDialogService.create({
        id: DIALOG_ID,
        centralize: true,
        isDraggable: false,
        showOverlay: true,
        content: Object3DPropertiesDialog,
        contentProps: {
          objectData,
          onClose: () => UIDialogService.dismiss({ id: DIALOG_ID }),
          onSubmit: (objectData) => {
            UIDialogService.dismiss({ id: DIALOG_ID });

          },
        },
      });
    };

    const ExtendedConnectedObject3DTable = () => (
      <ConnectedObject3DTable
        onAddClick={() => openPropertiesDialog()}
        onRenameClick={(objectData) => openPropertiesDialog(objectData)}
      />
    );

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
          component: ExtendedConnectedObject3DTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
