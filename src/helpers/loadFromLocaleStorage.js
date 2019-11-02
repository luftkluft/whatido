import {CustomError} from '../helpers/customErrors';

export const loadFromLocaleStorage = (appId) => {
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem(appId));
    if (!state.appId) {
      throw new CustomError("Error loading from global storage");
    }
  } catch (e) {
    console.log(e);
    state = { // TODO
      appId: 'whatido',
      isTimerRun: false,
      time: Date.now(),
      appTime: 0,
      selectedRow: null,
      columns: [
        { title: 'Task', field: 'task' },
        { title: 'Time', field: 'time' },
        { title: 'from Project', field: 'project' },
      ],
      data: [
        { task: 'EmptyTask', time: '00 00:00:00', project: 'EmptyProject', seconds: 0 },
      ]
    }
  }
  return state;
}