import React, { useState, useEffect, useCallback, useContext } from 'react';

import Context from '../Context';
import Record from './Record';
import InsertRecord from './Insert';
import deleteFolder from '../icons/folder-x.svg';
import addRecord from '../icons/circle-plus.svg';

const RecordGroup = ({ ids }) => {
  const { state, dispatch } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const getCurrentGroup = useCallback(() => {
    let currentGroup = state;
    ids.forEach(id => {
      currentGroup = currentGroup.records.find(item => item.id === id);
    });
    return currentGroup;
  }, [ids, state]);

  const [group, setGroup] = useState(getCurrentGroup());

  const handleDelete = () => {
    dispatch({ type: 'remove', payload: ids });
  };

  useEffect(() => {
    setGroup(getCurrentGroup());
  }, [setGroup, getCurrentGroup]);

  return (
    <div className="group">
      <div className="header">
        <h3>{`Group: ${group?.name}`}</h3>
        <button type="button" onClick={handleDelete}>
          <img src={deleteFolder} alt="delete group" />
        </button>
      </div>
      {
        group.records?.map(item => item.records?.length
          ? (
            <div key={[...ids, item.id, '-g'].toString()}>
              <RecordGroup ids={[...ids, item.id]} />
            </div>
          )
          : <Record ids={[...ids, item.id]} key={[...ids, item.id, '-p'].toString()} />,
        )
      }
      <div className="row">
        <button onClick={() => setShowModal(true)} type="button"><img src={addRecord} alt="add another" /></button>
      </div>
      {
        showModal && <InsertRecord closeModal={() => setShowModal(false)} ids={ids} />
      }
    </div>
  );
};

export default RecordGroup;
