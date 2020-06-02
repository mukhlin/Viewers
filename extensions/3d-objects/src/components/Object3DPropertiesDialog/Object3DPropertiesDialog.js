import './Object3DPropertiesDialog.styl';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog } from '@ohif/ui';

const Object3DPropertiesDialog = (props) => {
  const { objectData = {}, onClose, onSubmit } = props;
  const [ objectName, setObjectName ] = useState(objectData.objectName || '');
  const [ description, setDescription ] = useState(objectData.description || '');
  const [ objectNameId ] = useState(`object-name-${Date.now()}`);

  const onObjectNameChange = (event) => {
    setObjectName(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmitClick = () => {
    if (objectName) {
      onSubmit({ ...objectData, objectName, description });
    } else {
      document.getElementById(objectNameId).focus();
    }
  };

  return (
    <SimpleDialog
      headerTitle="Save Object"
      rootClass="Object3DPropertiesDialog"
      onClose={onClose}
      onConfirm={onSubmitClick}
    >
      <input
        required
        id={objectNameId}
        name="object-name"
        className="input"
        type="text"
        placeholder="Object name"
        value={objectName}
        onChange={onObjectNameChange}
      />
      <textarea
        name="description"
        className="input textarea"
        placeholder="Notes"
        rows="3"
        onChange={onDescriptionChange}
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
