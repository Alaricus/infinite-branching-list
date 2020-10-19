export default (state, action) => {
  const actionTypes = {
    add: () => {
      const tempState = JSON.parse(JSON.stringify(state.records));
      const { ids, id, name, text } = action.payload;
      let currentRecord = tempState;
      ids.forEach((i, index) => {
        const record = currentRecord[currentRecord.findIndex(item => item.id === i)];
        if (record.records?.length) {
          currentRecord = record.records;
        } else {
          currentRecord = record;
        }
        if (index === ids.length - 1) {
          if (Array.isArray(currentRecord)) {
            currentRecord.push({ id, name, text });
          } else {
            currentRecord.records = [{ id, name, text }];
          }
        }
      });
      if (!ids.length) {
        currentRecord.push({ id, name, text });
      }
      return ({ ...state, records: tempState });
    },
    remove: () => {
      const tempState = JSON.parse(JSON.stringify(state.records));
      const ids = action.payload;
      let currentRecord = tempState;
      ids.forEach((id, index) => {
        if (index < ids.length - 1) {
          currentRecord = currentRecord[currentRecord.findIndex(item => item.id === id)].records;
        } else {
          currentRecord.splice(currentRecord.findIndex(i => i.id === id), 1);
        }
      });
      return ({ ...state, records: tempState });
    },
    update: () => {
      const tempState = JSON.parse(JSON.stringify(state.records));
      const { ids } = action.payload;
      let currentRecord = tempState;
      ids.forEach((id, index) => {
        if (index < ids.length - 1) {
          currentRecord = currentRecord[currentRecord.findIndex(item => item.id === id)].records;
        } else {
          currentRecord[currentRecord.findIndex(item => item.id === id)] = action.payload.record;
        }
      });
      return ({ ...state, records: tempState });
    },
    insert: () => {},
  };

  if (actionTypes[action.type]) {
    return actionTypes[action.type]();
  }

  return state;
};
