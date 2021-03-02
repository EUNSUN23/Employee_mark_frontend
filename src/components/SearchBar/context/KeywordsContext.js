import React, { useReducer, createContext, useMemo } from "react";

const initState = ["recent keyword"];

const keywordsReducer = (state = initState, action) => {
  const storage = JSON.parse(localStorage.getItem("RECENT"));

  switch (action.type) {
    case "init":
      let initializedState;
      if (storage === null) {
        return;
      } else if (state.length === 1 && storage !== null) {
        initializedState = state.concat(storage);
        return initializedState;
      } else {
        return;
      }

    case "add":
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
    case "delete":
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
    default:
      return state;
  }
};
/*이제, state 와 dispatch 를 Context 통하여 다른 컴포넌트에서 바로 사용 할 수 있게 해줄건데요, 우리는 하나의 Context 를 만들어서 state 와 dispatch 를 함께 넣어주는 대신에, 두개의 Context 를 만들어서 따로 따로 넣어줄 것입니다. 이렇게 하면 dispatch 만 필요한 컴포넌트에서 불필요한 렌더링을 방지 할 수 있습니다. 추가적으로, 사용하게 되는 과정에서 더욱 편리하기도 합니다.

 */
export const KeywordsStateContext = createContext();
export const KeywordsDispatchContext = createContext();

export const KeywordsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(keywordsReducer, initState);

  return (
    <KeywordsStateContext.Provider value={state}>
      <KeywordsDispatchContext.Provider value={dispatch}>
        {children}
      </KeywordsDispatchContext.Provider>
    </KeywordsStateContext.Provider>
  );
};
