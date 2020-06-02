const definitions = [
  {
    id: 'Polygon',
    label: 'Polygon',
    icon: 'square-o',
    type: 'setToolActive',
    commandName: 'setToolActive',
    commandOptions: { toolName: 'FreehandRoi' },
  },
];

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
