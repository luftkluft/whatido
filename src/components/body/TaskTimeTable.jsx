import React, { forwardRef, Fragment } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TimerOff from '@material-ui/icons/TimerOff';
import MaterialTable from "material-table";
import { setStateData } from '../../helpers/stateCRUD';
import { sumStateDataTime } from '../../helpers/stateCRUD';
import { updateStateData } from '../../helpers/stateCRUD';
import { deleteStateData } from '../../helpers/stateCRUD';
import { appTimer } from '../../helpers/appTimer';
import {loadFromLocaleStorage} from '../../helpers/loadFromLocaleStorage';
import {saveToLocaleStorage} from '../../helpers/saveToLocaleStorage';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
  SaveAlt: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  TimerOff: forwardRef((props, ref) => <TimerOff {...props} ref={ref} />)
};

class TaskTimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: 'whatido',
      isTimerRun: false,
      time: Date.now(),
      appTime: 0,
      selectedRow: null,
    }
  }

  componentDidMount(){
    this.setState(loadFromLocaleStorage(this.state.appId));
  }
  componentDidUpdate(){
      // save to LocaleStorage TODO
      saveToLocaleStorage(this.state);
  }

  render() {
    if (this.state.selectedRow === null) { clearInterval(this.interval); 
      appTimer.stopTimer();
      if(this.state.isTimerRun){
        this.setState({isTimerRun: false});
      }
    }

    const currentTime = appTimer.returnCount();
    if (this.state.appTime !== currentTime) {
      this.setState(sumStateDataTime(this.state, currentTime));
      appTimer.resetTimer();
    }

    return (
      <Fragment>
        <MaterialTable
          icons={tableIcons}
          title="Task Time Meter"
          columns={this.state.columns}
          data={this.state.data}

          onRowClick={((evt, selectedRow) => {
            this.setState({ selectedRow });
            if (this.interval) { clearInterval(this.interval) };
            if (!this.state.isTimerRun){
              appTimer.startTimer();
              this.setState({isTimerRun: true});
            }            
            this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
          })}

          options={
            {
              actionsColumnIndex: -1,
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id)
                  ? '#EEE'
                  : '#FFF'
              }),
              exportButton: true
            }
          }

          actions={[
            {
              icon: tableIcons.TimerOff,
              tooltip: 'Timer Off',
              onClick: (event) => { this.setState({ selectedRow: null }) }
            }
          ]}

          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(setStateData(this.state, newData));
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(updateStateData(this.state, newData, oldData));
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(deleteStateData(this.state, oldData));
                }, 600);
              }),
          }}
        />
      </Fragment>
    )
  }
}

export default TaskTimeTable;