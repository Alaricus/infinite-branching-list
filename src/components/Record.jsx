import React, { useContext, useState } from 'react';

import Context from '../Context';
import InsertRecord from './Insert';
import makeFolder from '../icons/folder-plus.svg';
import deleteRecord from '../icons/circle-x.svg';
import updateRecord from '../icons/circle-check.svg';
import updateInactive from '../icons/circle-check-inactive.svg';

const Record = ({ ids }) => {
  const { state, dispatch } = useContext(Context);
  const [record, setRecord] = useState(() => {
    let currentRecord = state;
    ids.forEach(id => {
      currentRecord = currentRecord.records.find(item => item.id === id);
    });
    return currentRecord;
  });
  const [canUpdate, setCanUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch({ type: 'remove', payload: ids });
  };

  const handleUpdate = () => {
    dispatch({ type: 'update', payload: { record, ids } });
    setCanUpdate(false);
  };

  const handleChange = e => {
    setRecord({ ...record, name: e.target.value });
    setCanUpdate(true);
  };

  return (
    <div className="row">
      <input type="text" value={record?.name} onChange={handleChange} />
      <button type="button" onClick={handleUpdate} disabled={!canUpdate}>
        {
          canUpdate ? <img src={updateRecord} alt="update" /> : <img src={updateInactive} alt="update" />
        }
      </button>
      <button type="button" onClick={handleDelete}>
        <img src={deleteRecord} alt="delete" />
      </button>
      <button type="button" onClick={() => setShowModal(true)}>
        <img src={makeFolder} alt="insert" />
      </button>
      {
        showModal && <InsertRecord closeModal={() => setShowModal(false)} ids={ids} />
      }
    </div>
  );
};

export default Record;
