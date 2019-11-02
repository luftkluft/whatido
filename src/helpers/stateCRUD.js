import {secondsFormater} from '../helpers/timeFormater';

export const setStateData = (prevState, newData) => {
  let data = [...prevState.data];
  data.push(newData);
  return { ...prevState, data };
}

export const updateStateData = (prevState, newData, oldData) => {
  let data = [...prevState.data];
  data[oldData.tableData.id] = newData;
  return { ...prevState, data };
};

export const deleteStateData = (prevState, oldData) => {
  let data = [...prevState.data];
  data.splice(oldData.tableData.id, 1);
  return { ...prevState, data };
};

export const sumStateDataTime = (prevState = {}, newSeconds = 1) => {
  if(prevState.selectedRow !== null){
    let data = [...prevState.data];
    let appTime = newSeconds;
    const selectedRowId = prevState.selectedRow.tableData.id
    if(data[selectedRowId] === undefined){return { ...prevState}}
    if(!data[selectedRowId].seconds){data[selectedRowId].seconds = 0}
    data[selectedRowId].seconds += appTime;
    data[selectedRowId].time = secondsFormater(data[selectedRowId].seconds);
    return { ...prevState, data, appTime}
  }
}