import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo({transactions}) {
  const [state] = React.useState({
    columns: [
    {
        title : "Transaction Type",
        field : "type",
        headerStyle : {
            backgroundColor : "rgba(63, 81, 181, 0.2784313725490196)" 
        }
    },
    {
        title : "Category",
        field : "category",
        headerStyle : {
            backgroundColor : "rgba(63, 81, 181, 0.2784313725490196)" 
        }
    },
    {
        title : "Amount",
        field : "amount",
        headerStyle : {
            backgroundColor : "rgba(63, 81, 181, 0.2784313725490196)" 
        }
    },
    {
        title : "Note",
        field : "note",
        headerStyle : {
            backgroundColor : "rgba(63, 81, 181, 0.2784313725490196)" 
        }
    },
    {
        title : "Date",
        field : "date",
        headerStyle : {
            backgroundColor : "rgba(63, 81, 181, 0.2784313725490196)" 
        }
    }
    ]
  });

  return (
    <MaterialTable
      title="Transactions History"
      columns={state.columns}
      data={transactions}
    //   editable={{
    //     onRowAdd: newData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data.push(newData);
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //     onRowUpdate: (newData, oldData) =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data[data.indexOf(oldData)] = newData;
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //     onRowDelete: oldData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data.splice(data.indexOf(oldData), 1);
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //   }}
    />
  );
}