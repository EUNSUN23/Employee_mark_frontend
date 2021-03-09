const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("RECENT"));
};

export const initKeywords = (state) => {
  const storage = getLocalStorage();
  if (!storage || state.length !== 1) return;
  const initializedState = state.concat(storage);
  return initializedState;
};

export const addKeywords = (state, action) => {
  const storage = getLocalStorage();
  const newKeyword = {
    category: action.category,
    index: Date.now(),
    value: action.keyword,
  };
  const addedState = state.concat(newKeyword);
  if (storage === null) {
    localStorage.setItem("RECENT", JSON.stringify(addedState.slice()));
  } else {
    const addedStorage = storage.slice();
    addedStorage.push(newKeyword);
    localStorage.setItem("RECENT", JSON.stringify(addedStorage));
  }

  return addedState;
};

export const deleteKeywords = (state, action) => {
  const storage = getLocalStorage();
  console.log("DELETE", action.identifier);
  const deletedState = state.filter((el, idx) => {
    return el.index !== action.identifier;
  });
  console.log("deletedState", deletedState);
  const deletedStorage = storage.filter((el, idx) => {
    return el.index !== action.identifier;
  });
  localStorage.setItem("RECENT", JSON.stringify(deletedStorage));
  return deletedState;
};
