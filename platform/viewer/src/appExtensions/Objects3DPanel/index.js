import ConnectedObject3DTable from "./ConnectedObject3DTable";

export default {
  id: 'objects-3d-table',

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
          component: ConnectedObject3DTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
