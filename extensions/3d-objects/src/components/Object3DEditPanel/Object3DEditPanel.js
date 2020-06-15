import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ScrollableArea } from '@ohif/ui';

import './Object3DEditPanel.styl';

const FrameItem = ({
  index,
  active,
  onClick
}) => {
  const classNames = ['frameItem'];
  if (active) {
    classNames.push('active');
  }
  return (
    <button className={classNames.join(' ')} onClick={() => onClick(index)}>
      {index}
    </button>
  );
};

FrameItem.propTypes = {
  index: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ActionButtons = ({
  onSetStartFrameClick,
  onSetFinalFrameClick,
  onCancelClick,
  onSaveClick
}) => {
  return (
    <>
      <div className="frameRangeButtons">
        {typeof onSetStartFrameClick === 'function' && (
          <button className="button" onClick={onSetStartFrameClick}>
            <Icon name="angle-double-up" />
            <span className="text">Set start frame</span>
          </button>
        )}
        {typeof onSetFinalFrameClick === 'function' && (
          <button className="button" onClick={onSetFinalFrameClick}>
            <Icon name="angle-double-down" />
            <span className="text">Set final frame</span>
          </button>
        )}
      </div>
      <div className="actionButtons">
        {typeof onCancelClick === 'function' && (
          <button className="button btn btn-default" onClick={onCancelClick}>Cancel</button>
        )}
        {typeof onSaveClick === 'function' && (
          <button className="button btn btn-primary" onClick={onSaveClick}>Save</button>
        )}
      </div>
    </>
  );
};

ActionButtons.propTypes = {
  onSetStartFrameClick: PropTypes.func,
  onSetFinalFrameClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func,
};

const Object3DEditPanel = ({
  objectData,
  frameCount,
  activeFrame,
  onFrameClick,
  onSetStartFrameClick,
  onSetFinalFrameClick,
  onCancelClick,
  onSaveClick
}) => {
  const { objectName } = objectData;

  const frames = [];
  for (let index = 1; index <= frameCount; index++) {
    frames.push(
      <FrameItem
        key={index}
        index={index}
        active={index === activeFrame}
        onClick={onFrameClick}
      />
    );
  }

  return (
    <div className="object3DEditPanel">
      <div className="headerPanel">
        {objectName}
      </div>
      <div className="frameList">
        <ScrollableArea>
          {frames}
        </ScrollableArea>
      </div>
      <div className="footerPanel">
        <ActionButtons
          onSetStartFrameClick={onSetStartFrameClick}
          onSetFinalFrameClick={onSetFinalFrameClick}
          onCancelClick={onCancelClick}
          onSaveClick={onSaveClick}
        />
      </div>
    </div>
  );
};

Object3DEditPanel.propTypes = {
  objectData: PropTypes.object.isRequired,
  frameCount: PropTypes.number.isRequired,
  activeFrame: PropTypes.number,
  onFrameClick: PropTypes.func.isRequired,
  onSetStartFrameClick: PropTypes.func,
  onSetFinalFrameClick: PropTypes.func,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func,
};

export default Object3DEditPanel;
