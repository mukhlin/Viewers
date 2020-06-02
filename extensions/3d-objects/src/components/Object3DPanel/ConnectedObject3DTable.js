import React from 'react';
import { connect } from 'react-redux';
import { Object3DTable } from '../Object3DTable/Object3DTable';

const mapStateToProps = state => {
  // UI test data to be removed
  return {
    objectCollection: [{
      objectName: 'Test Object 0',
      startFrame: 20,
      finalFrame: 63,
      volume: 25.5,
    }, {
      objectName: 'Test Object 1',
      description: 'Description 1',
      startFrame: 20,
      finalFrame: 63,
      volume: 25.5,
    }, {
      objectName: "Test Object 2",
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      startFrame: 20,
      finalFrame: 63,
      volume: 36.5,
    }, {
      objectName: "Test Object 3",
      description: 'Description 3',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      startFrame: 20,
      finalFrame: 63,
      volume: 36.5,
    }],
    onEditClick: (objectData) => alert(`Edit ${objectData.objectName} object`),
    onDeleteClick: (objectData) => alert(`Delete ${objectData.objectName} object`),
  };
};

const ConnectedObject3DTable = connect(mapStateToProps)(Object3DTable);

export default ConnectedObject3DTable;
