import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import Context from '../Context';
import insertRecord from '../icons/circle-check.svg';
import insertInactive from '../icons/circle-check-inactive.svg';
import cancel from '../icons/circle-x.svg';

const InsertRecord = ({ ids = [], closeModal }) => {
  const { dispatch } = useContext(Context);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleInsert = () => {
    dispatch({
      type: 'add',
      payload: { id: uuid(), name, text, ids },
    });
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <dialog className="form" onClick={e => e.stopPropagation()}>
        <h3>Insert a Record</h3>
        <div className="row">
          name:
          <input type="text" maxLength="5" value={name} onChange={handleNameChange} />
        </div>
        <div className="row">
          text:
          <input type="text" maxLength="19" value={text} onChange={handleTextChange} />
        </div>
        <div className="row">
          <button type="button" onClick={closeModal}>
            <img src={cancel} alt="cancel" />
          </button>
          <button type="button" onClick={handleInsert} disabled={name.length === 0 || text.length === 0}>
            {
              name.length === 0 || text.length === 0
                ? <img src={insertInactive} alt="insert" />
                : <img src={insertRecord} alt="insert" />
            }
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default InsertRecord;
