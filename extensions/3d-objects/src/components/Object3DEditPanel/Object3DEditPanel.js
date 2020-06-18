import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Icon, ScrollableArea } from '@ohif/ui';

import './Object3DEditPanel.styl';

const FrameItem = ({
  frameIndex,
  activeFrame,
  startFrame,
  finalFrame,
  onClick
}) => {
  const classNames = ['frameItem'];
  if (frameIndex >= startFrame && frameIndex <= finalFrame) {
    classNames.push('highlighted');
  }
  if (frameIndex === activeFrame) {
    classNames.push('active');
  }
  return (
    <button className={classNames.join(' ')} onClick={() => onClick(frameIndex)}>
      {frameIndex}
    </button>
  );
};

FrameItem.propTypes = {
  frameIndex: PropTypes.number.isRequired,
  activeFrame: PropTypes.number.isRequired,
  startFrame: PropTypes.number.isRequired,
  finalFrame: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ActionButtons = ({
  activeFrame,
  startFrame,
  finalFrame,
  onSetStartFrameClick,
  onSetFinalFrameClick,
  onCancelClick,
  onSaveClick
}) => {
  return (
    <>
      <div className="frameRangeButtons">
        {typeof onSetStartFrameClick === 'function' && (
          <button
            className="button"
            disabled={activeFrame > finalFrame || activeFrame === startFrame}
            onClick={() => onSetStartFrameClick(activeFrame)}
          >
            <Icon name="angle-double-up" />
            <span className="text">Set start frame</span>
          </button>
        )}
        {typeof onSetFinalFrameClick === 'function' && (
          <button
            className="button"
            disabled={activeFrame < startFrame || activeFrame === finalFrame}
            onClick={() => onSetFinalFrameClick(activeFrame)}
          >
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
  activeFrame: PropTypes.number.isRequired,
  startFrame: PropTypes.number.isRequired,
  finalFrame: PropTypes.number.isRequired,
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
  onCancelClick,
  onSaveClick
}) => {
  const { objectName } = objectData;
  const [ startFrame, setStartFrame ] = useState(1);
  const [ finalFrame, setFinalFrame ] = useState(1);

  useEffect(() => {
    if (frameCount > 0) {
      setStartFrame(objectData.startFrame || 1);
      setFinalFrame(objectData.finalFrame || frameCount);
    }
  }, [objectData, frameCount]);

  const frames = [];
  for (let index = 1; index <= frameCount; index++) {
    frames.push(
      <FrameItem
        key={index}
        frameIndex={index}
        activeFrame={activeFrame}
        startFrame={startFrame}
        finalFrame={finalFrame}
        onClick={onFrameClick}
      />
    );
  }

  const writeable = typeof onSaveClick === 'function';

  return (
    <div className="object3DEditPanel">
      <div className="headerPanel">
        {objectName}
      </div>
      <div className="frameList">
        <ScrollableArea hideScrollbar={false}>
          {frames}
        </ScrollableArea>
      </div>
      <div className="footerPanel">
        <ActionButtons
          activeFrame={activeFrame}
          startFrame={startFrame}
          finalFrame={finalFrame}
          onSetStartFrameClick={writeable ? (frameIndex) => setStartFrame(frameIndex) : undefined}
          onSetFinalFrameClick={writeable ? (frameIndex) => setFinalFrame(frameIndex) : undefined}
          onCancelClick={onCancelClick}
          onSaveClick={writeable ? () => {
            onSaveClick({ ...objectData, startFrame, finalFrame })
          } : undefined}
        />
      </div>
    </div>
  );
};

Object3DEditPanel.propTypes = {
  objectData: PropTypes.object.isRequired,
  frameCount: PropTypes.number.isRequired,
  activeFrame: PropTypes.number.isRequired,
  onFrameClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func,
};

export default Object3DEditPanel;
