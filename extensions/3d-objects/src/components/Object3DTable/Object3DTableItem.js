import './Object3DTableItem.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, OverlayTrigger, TableListItem, Tooltip } from '@ohif/ui';

export class Object3DTableItem extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    itemIndex: PropTypes.number.isRequired,
    objectData: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onRenameClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };

  static defaultProps = {
    selected: false,
  };

  render = () => {
    const actionButtons = [];
    const itemClasses = ['object3DTableItem'];
    const { description, tags = [] } = this.props.objectData;

    if (this.props.selected) {
      itemClasses.push('selected');
      if (typeof this.props.onRenameClick === 'function') {
        actionButtons.push(this.getActionButton('Rename', 'inline-edit', this.onRenameClick));
      }
      if (typeof this.props.onEditClick === 'function') {
        actionButtons.push(this.getActionButton('Edit', 'edit', this.onEditClick));
      }
      if (typeof this.props.onDeleteClick === 'function') {
        actionButtons.push(this.getActionButton('Delete', 'trash', this.onDeleteClick));
      }
    }

    return (
      <TableListItem
        itemIndex={this.props.itemIndex}
        itemClass={itemClasses.join(' ')}
        onItemClick={this.onItemClick}
      >
        <div>
          {description || tags.length > 0 ? (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip placement="bottom" className="object3DTableItemTooltip">
                  <div>
                    {description && (
                      <div className="description">{description}</div>
                    )}
                    {tags.length > 0 && (
                      <div className={`tags${description ? ' separator' : ''}`}>
                        {tags.map((tag, index) =>
                          <span key={tag} className={`tag${index === 0 ? ' firstTag' : ''}`}>{tag}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Tooltip>
              }
            >
              {this.getObjectData()}
            </OverlayTrigger>
          ) : (this.getObjectData())}
          {actionButtons.length > 0 && <div className="objectActions">{actionButtons}</div>}
        </div>
      </TableListItem>
    );
  };

  getObjectData = () => {
    const { objectName, startFrame, finalFrame, volume } = this.props.objectData;

    return (
      <div>
        <div className="objectName">{objectName}</div>
        <div className="objectInfo">{`Frames ${startFrame}-${finalFrame}, ${volume} mm3`}</div>
      </div>
    );
  }

  getActionButton = (label, icon, onClick) => {
    return (
      <button key={label} className="actionButton" onClick={onClick}>
        <Icon name={icon} width="14px" height="14px" />
        <span className="label">{label}</span>
      </button>
    );
  };

  onItemClick = () => {
    this.props.onItemClick(this.props.objectData);
  };

  onRenameClick = (event) => {
    // Prevent onItemClick from firing
    event.stopPropagation();

    this.props.onRenameClick(this.props.objectData);
  };

  onEditClick = (event) => {
    // Prevent onItemClick from firing
    event.stopPropagation();

    this.props.onEditClick(this.props.objectData);
  };

  onDeleteClick = (event) => {
    // Prevent onItemClick from firing
    event.stopPropagation();

    this.props.onDeleteClick(this.props.objectData);
  };

}
