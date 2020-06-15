import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, ScrollableArea, TableList } from '@ohif/ui';
import Objects3DTableItem from './Objects3DTableItem';

import './Objects3DTable.styl';

const TableHeader = ({ onAddClick }) => {
  return (
    <div className="tableHeader">
      <div className="titleText">3D Objects</div>
      {typeof onAddClick === 'function' && (
        <button className="addButton" onClick={onAddClick}>
          <Icon name="plus" />
        </button>
      )}
    </div>
  );
};

TableHeader.propTypes = {
  onAddClick: PropTypes.func,
};

const Objects3DTable = ({
  objectCollection,
  onAddClick,
  onRenameClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [ activeObjectName, setActiveObjectName ] = useState();
  return (
    <div className="objects3DTable">
      <TableHeader onAddClick={onAddClick} />
      <ScrollableArea>
        <TableList headless={true}>
          {objectCollection.map((objectData, index) =>
            <Objects3DTableItem
              key={objectData.objectName}
              itemIndex={index + 1}
              objectData={objectData}
              active={activeObjectName === objectData.objectName}
              onItemClick={() => setActiveObjectName(objectData.objectName)}
              onRenameClick={onRenameClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          )}
        </TableList>
      </ScrollableArea>
    </div>
  );
};

Objects3DTable.propTypes = {
  objectCollection: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onRenameClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default Objects3DTable;
