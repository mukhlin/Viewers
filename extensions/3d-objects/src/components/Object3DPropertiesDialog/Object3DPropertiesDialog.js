import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog } from '@ohif/ui';

import './Object3DPropertiesDialog.styl';

const Object3DPropertiesDialog = ({ objectData = {}, onClose, onSubmit }) => {
  const [ objectName, setObjectName ] = useState(objectData.objectName || '');
  const [ description, setDescription ] = useState(objectData.description || '');

  return (
    <SimpleDialog
      headerTitle="Save Object"
      rootClass="Object3DPropertiesDialog"
      onClose={onClose}
      onConfirm={() => {
        if (objectName) {
          onSubmit({ ...objectData, objectName, description });
        } else {
          document.getElementById('3d-object-name').focus();
        }
      }}
    >
      <input
        required
        id="3d-object-name"
        className="input"
        type="text"
        placeholder="Object name"
        value={objectName}
        onChange={(event) => setObjectName(event.target.value)}
      />
      <textarea
        className="input textarea"
        placeholder="Notes"
        rows="3"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
    </SimpleDialog>
  );
};

Object3DPropertiesDialog.propTypes = {
  objectData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Object3DPropertiesDialog;
