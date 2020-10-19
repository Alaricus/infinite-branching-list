import React, { useReducer, useState } from 'react';

import data from './data';
import Context from './Context';
import RecordGroup from './components/RecordGroup';
import Record from './components/Record';
import InsertRecord from './components/Insert';
import reducer from './reducer';
import addRecord from './icons/circle-plus.svg';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, data);
  const [showModal, setShowModal] = useState(false);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1>Infinite Branching List</h1>
        {
          state.records?.map(item => item.records?.length
            ? <RecordGroup ids={[item.id]} key={item.id} />
            : <Record ids={[item.id]} key={item.id} />,
          )
        }
        <div className="row">
          <button onClick={() => setShowModal(true)} type="button"><img src={addRecord} alt="add another" /></button>
        </div>
        {
          showModal && <InsertRecord closeModal={() => setShowModal(false)} />
        }
      </div>
    </Context.Provider>
  );
};

export default App;
