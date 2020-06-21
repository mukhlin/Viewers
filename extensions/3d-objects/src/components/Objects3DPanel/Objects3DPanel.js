import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Objects3DTable from '../Objects3DTable/Objects3DTable';
import Object3DPropertiesDialog from '../Object3DPropertiesDialog/Object3DPropertiesDialog';
import Object3DEditPanel from '../Object3DEditPanel/Object3DEditPanel';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import { TOOL } from '../../index';

const OBJECT_COLLECTION_TEST_DATA = [
  {
    objectName: 'Test Object 0',
    //startFrame: 20,
    //finalFrame: 63,
    //volume: 25.5,
  }, {
    objectName: 'Test Object 1',
    description: 'Description 1',
    startFrame: 20,
    finalFrame: 63,
    volume: 25.5,
  }, {
    objectName: "Test Object 2",
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    startFrame: 10,
    finalFrame: 30,
    volume: 36.5,
  }, {
    objectName: "Test Object 3",
    description: 'Description 3',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    startFrame: 40,
    finalFrame: 50,
    volume: 36.5,
  },
];

const PROPERTIES_DIALOG_ID = '3d-object-properties';

const Objects3DPanel = ({
  servicesManager,
  commandsManager,
  activeViewportIndex,
  viewportSpecificData,
}) => {
  const [ selectedObject, setSelectedObject ] = useState({});

  const openPropertiesDialog = (objectData) => {
    const { UIDialogService } = servicesManager.services;
    if (!UIDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }

    UIDialogService.dismiss({ id: PROPERTIES_DIALOG_ID });
    UIDialogService.create({
      id: PROPERTIES_DIALOG_ID,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: Object3DPropertiesDialog,
      contentProps: {
        objectData,
        onClose: () => UIDialogService.dismiss({ id: PROPERTIES_DIALOG_ID }),
        onSubmit: (newObjectData) => {
          UIDialogService.dismiss({ id: PROPERTIES_DIALOG_ID });
          Object.assign(objectData, newObjectData);
        },
      },
    });
  };

  if (selectedObject.objectName) {
    return (
      <Object3DEditPanel
        objectData={selectedObject}
        frameCount={viewportSpecificData.numImageFrames || 0}
        activeFrame={(viewportSpecificData.frameIndex || 0) + 1}
        onFrameClick={(frameIndex) => {
          const { StudyInstanceUID, SOPInstanceUID } = viewportSpecificData;
          commandsManager.runCommand('jumpToImage', {
            StudyInstanceUID,
            // FIXME It looks like SOPInstanceUID is ID of instance that changes for each image while scrolling
            SOPInstanceUID,
            frameIndex: frameIndex - 1,
            activeViewportIndex,
          });
        }}
        onCancelClick={() => setSelectedObject({})}
        onSaveClick={(objectData) => {
          Object.assign(selectedObject, objectData);
          setSelectedObject({});
        }}
      />
    );
  }

  return (
    <Objects3DTable
      objectCollection={OBJECT_COLLECTION_TEST_DATA}
      onAddClick={() => openPropertiesDialog()}
      onRenameClick={(objectData) => openPropertiesDialog(objectData)}
      onEditClick={(objectData) => setSelectedObject(objectData)}
      onDeleteClick={(objectData) => confirm(`Are you sure you want to delete "${objectData.objectName}" object?`)}
    />
  );
};

Objects3DPanel.propTypes = {
  servicesManager: PropTypes.object.isRequired,
  commandsManager: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  const { activeViewportIndex } = state.viewports;
  const viewportSpecificData = state.viewports.viewportSpecificData[activeViewportIndex] || {};
  return {
    activeViewportIndex,
    viewportSpecificData,
  };
};

cornerstone.events.addEventListener(
    cornerstone.EVENTS.ELEMENT_ENABLED,
    function (event) {
      elementEnabledHandler(event)
    }
);

function elementEnabledHandler(event) {
  const element = event.detail.element;
  element.addEventListener(
      cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
      function (event) {
        onMeasurementCompleted(event)
      }
  );
}

function onMeasurementCompleted(event) {
  const detail = event.detail;
  const toolType = detail.toolType;
  if (toolType === TOOL) {
    const element = cornerstone.getEnabledElement(detail.element);
    // Get full image id
    console.log(element.image.imageId);
    // Get completed object
    console.log(detail.measurementData.handles);
  }
}

export default connect(mapStateToProps)(Objects3DPanel);
