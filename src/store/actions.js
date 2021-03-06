import * as actionTypes from './actionTypes';

export const setActiveSuperhero = (dispatch, superheroes, index) => {
  const superheroesUpdated = superheroes.map(item => ({
    ...item,
    active: index === item.index,
  }));

  dispatch({
    type: actionTypes.SET_ACTIVE_SUPERHERO,
    superheroes: superheroesUpdated,
  });
};

export const setMenuDirection = (dispatch, menuDirection) => {
  dispatch({
    type: actionTypes.SET_MENU_DIRECTION,
    menuDirection,
  });
};

export const setActiveTab = (dispatch, tabs, id) => {
  const tabsUpdated = tabs.map(item => ({
    ...item,
    active: id === item.id,
  }));

  dispatch({
    type: actionTypes.SET_ACTIVE_TAB,
    tabs: tabsUpdated,
  });
};
