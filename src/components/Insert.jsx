import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import Context from '../Context';

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
          <button type="button" onClick={closeModal} className="cancel">cancel</button>
          <button type="button" onClick={handleInsert} className="submit" disabled={name.length === 0 || text.length === 0}>insert</button>
        </div>
      </dialog>
    </div>
  );
};

export default InsertRecord;
