import './Object3DTable.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, ScrollableArea, TableList } from '@ohif/ui';
import { Object3DTableItem } from './Object3DTableItem';

export class Object3DTable extends Component {
  static propTypes = {
    objectCollection: PropTypes.array.isRequired,
    onAddClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onRenameClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };

  state = {
    selectedObjectName: null,
  };

  render = () => {
    return (
      <div className="object3DTable">
        <div className="object3DTableHeader">
          <div className="titleText">
            3D Objects
          </div>
          {this.props.onAddClick && (
            <button className="addButton" onClick={this.onAddClick}>
              <Icon name="plus" />
            </button>
          )}
        </div>
        <ScrollableArea>
          <TableList headless={true}>
            {this.props.objectCollection.map((objectData, index) =>
              <Object3DTableItem
                key={objectData.objectName}
                selected={this.state.selectedObjectName === objectData.objectName}
                itemIndex={index + 1}
                objectData={objectData}
                onItemClick={this.onItemClick}
                onRenameClick={this.props.onRenameClick}
                onEditClick={this.props.onEditClick}
                onDeleteClick={this.props.onDeleteClick}
              />
            )}
          </TableList>
        </ScrollableArea>
      </div>
    );
  };

  onAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };

  onItemClick = (objectData) => {
    this.setState({
      selectedObjectName: objectData.objectName,
    });

    if (this.props.onItemClick) {
      this.props.onItemClick(objectData);
    }
  };

}
