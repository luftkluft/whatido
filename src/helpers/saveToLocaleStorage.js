import {CustomError} from '../helpers/customErrors';

export const saveToLocaleStorage = (state) => {
  try {
    if (!state.appId) {
      throw new CustomError("Error data from local state");
    }
    localStorage.setItem(state.appId, JSON.stringify(state)); // TODO
    // const checkState = JSON.parse(localStorage.getItem(state.appId));
    // if (!checkState.appId) {
    //   throw new CustomError("Error data from global storage");
    // }
  } catch (e) {
    console.log(e);
  }
}