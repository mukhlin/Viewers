import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, OverlayTrigger, TableListItem, Tooltip } from '@ohif/ui';

import './Objects3DTableItem.styl';

const ItemText = ({ objectData }) => {
  const { objectName, startFrame, finalFrame, volume } = objectData;
  return (
    <>
      <div className="objectName">{objectName}</div>
      <div className="objectInfo">{`Frames ${startFrame}-${finalFrame}, ${volume} mm3`}</div>
    </>
  );
};

ItemText.propTypes = {
  objectData: PropTypes.object.isRequired,
};

const ItemTooltip = ({ description, tags = [] }) => {
  return (
    <div>
      {description && (
        <div className="description">{description}</div>
      )}
      {tags.length > 0 && (
        <div className={classNames('tags', description && 'separator')}>
          {tags.map((tag, index) =>
            <span key={tag} className={classNames('tag', index === 0 && 'firstTag')}>{tag}</span>
          )}
        </div>
      )}
    </div>
  );
};

ItemTooltip.propTypes = {
  description: PropTypes.string,
  tags: PropTypes.array,
};

const ActionButton = ({ label, icon, onClick }) => {
  return (
    <button className="actionButton" onClick={onClick}>
      <Icon name={icon} width="14px" height="14px" />
      <span className="label">{label}</span>
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ActionBar = ({
  objectData,
  onRenameClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="objectActions">
      {typeof onRenameClick === 'function' && (
        <ActionButton
          label="Rename"
          icon="inline-edit"
          onClick={(event) => {
            event.stopPropagation();
            onRenameClick(objectData);
          }}
        />
      )}
      {typeof onEditClick === 'function' && (
        <ActionButton
          label="Edit"
          icon="edit"
          onClick={(event) => {
            event.stopPropagation();
            onEditClick(objectData);
          }}
        />
      )}
      {typeof onDeleteClick === 'function' && (
        <ActionButton
          label="Delete"
          icon="trash"
          onClick={(event) => {
            event.stopPropagation();
            onDeleteClick(objectData);
          }}
        />
      )}
    </div>
  );
};

ActionBar.propTypes = {
  objectData: PropTypes.object.isRequired,
  onRenameClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

const Objects3DTableItem = ({
  active,
  itemIndex,
  objectData,
  onItemClick,
  onRenameClick,
  onEditClick,
  onDeleteClick,
}) => {
  const { description, tags = [] } = objectData;
  return (
    <TableListItem
      itemIndex={itemIndex}
      itemClass={classNames('objects3DTableItem', active && 'selected')}
      onItemClick={onItemClick}
    >
      {description || tags.length > 0 ? (
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip placement="bottom" className="objects3DTableItemTooltip">
              <ItemTooltip description={description} tags={tags} />
            </Tooltip>
          }
        >
          <div>
            <ItemText objectData={objectData} />
          </div>
        </OverlayTrigger>
      ) : (
        <div>
          <ItemText objectData={objectData} />
        </div>
      )}
      {active && (
        <ActionBar
          objectData={objectData}
          onRenameClick={onRenameClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </TableListItem>
  );
};

Objects3DTableItem.propTypes = {
  active: PropTypes.bool,
  itemIndex: PropTypes.number.isRequired,
  objectData: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onRenameClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

Objects3DTableItem.defaultProps = {
  active: false,
};

export default Objects3DTableItem;
