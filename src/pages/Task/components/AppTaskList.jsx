
// import React from "react";
// import { Link } from "react-router-dom";
// import { ReactComponent as AddIcon } from "assets/images/svg/add.svg";
// class AppTaskList extends React.Component {
//   state = { tasks: [] };
//   componentDidMount() {
//     const { tasks } = this.props;
//     this.setState({
//       tasks
//     });
//   }
//   onDragStart = evt => {
//     let element = evt.currentTarget;
//     element.classList.add("dragged");
//     evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
//     evt.dataTransfer.effectAllowed = "move";
//   };
//   onDragEnd = evt => {
//     evt.currentTarget.classList.remove("dragged");
//   };
//   onDragEnter = evt => {
//     evt.preventDefault();
//     let element = evt.currentTarget;
//     element.classList.add("dragged-over");
//     evt.dataTransfer.dropEffect = "move";
//   };
//   onDragLeave = evt => {
//     let currentTarget = evt.currentTarget;
//     let newTarget = evt.relatedTarget;
//     if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
//       return;
//     evt.preventDefault();
//     let element = evt.currentTarget;
//     element.classList.remove("dragged-over");
//   };
//   onDragOver = evt => {
//     evt.preventDefault();
//     evt.dataTransfer.dropEffect = "move";
//   };
//   onDrop = (evt, value, status) => {
//     evt.preventDefault();
//     evt.currentTarget.classList.remove("dragged-over");
//     let data = evt.dataTransfer.getData("text/plain");
//     let tasks = this.state.tasks;
//     let updated = tasks.map(task => {
//       if (task.id.toString() === data.toString()) {
//         task.status = status;
//       }
//       return task;
//     });
//     this.setState({ tasks: updated });
//   };

//   render() {
//     const { tasks } = this.state;
//     let pending = tasks.filter(t => t.status === "pending");
//     let done = tasks.filter(t => t.status === "done");
//     let newOrder = tasks.filter(t => t.status === "new");
//     let status = tasks.filter(t => t.status === "status");
//     return (
//       <div className="d-flex">
//           <div className="blackboard" 
//               onDragLeave={e => this.onDragLeave(e)}
//               onDragEnter={e => this.onDragEnter(e)}
//               onDragEnd={e => this.onDragEnd(e)}
//               onDragOver={e => this.onDragOver(e)}
//               onDrop={e => this.onDrop(e, false, "new")}
//           >
//             <div className="blackboard__heading">
//               <input
//                 className="blackboard__name"
//                 defaultValue="Saralanganlar"
//               />
//               <div className="blackboard__count">{newOrder.length}</div>
//             </div>

//             <div className="blackboard__body">
//                 {newOrder.map(task => (
//                   <Link to="/application/1" className="application__card"
//                       key={task.id}
//                       id={task.id}
//                       draggable
//                       onDragStart={e => this.onDragStart(e)}
//                       onDragEnd={e => this.onDragEnd(e)}
//                     >
//                     <div className="flex-main">
//                       <h4 className="application__client">Izzat Rakhmatov</h4>
//                       <p className="application__date">{task.id}</p>
//                     </div>

//                     <h3 className="application__number">Zayavka № 1494482</h3>

//                     <div className="application__description">
//                       Assalomu alaykum, kontakt markaz tashkillash...
//                     </div>

//                     <div className="application__tags">
//                       <div className="application__tag">call-center</div>
//                       <div className="application__tag">Toshkent</div>
//                       <div className="application__tag">Toshkent</div>
//                     </div>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//           <div className="blackboard"
//              onDragLeave={e => this.onDragLeave(e)}
//              onDragEnter={e => this.onDragEnter(e)}
//              onDragEnd={e => this.onDragEnd(e)}
//              onDragOver={e => this.onDragOver(e)}
//              onDrop={e => this.onDrop(e, false, "pending")}
//           >
//             <div className="blackboard__heading">
//               <input
//                 className="blackboard__name"
//                 defaultValue="Tartiblanganlar"
//               />
//               <div className="blackboard__count">{pending.length}</div>
//             </div>

//             <div className="blackboard__body">
//                {pending.map(task => (
//                  <Link to="/application/1" className="application__card"
//                    key={task.id}
//                    id={task.id}
//                    draggable
//                    onDragStart={e => this.onDragStart(e)}
//                    onDragEnd={e => this.onDragEnd(e)}
//                     >
//                     <div className="flex-main">
//                       <h4 className="application__client">Izzat Rakhmatov</h4>
//                       <p className="application__date">{task.id}</p>
//                     </div>

//                     <h3 className="application__number">Zayavka № 1494482</h3>

//                     <div className="application__description">
//                       Assalomu alaykum, kontakt markaz tashkillash...
//                     </div>

//                     <div className="application__tags">
//                       <div className="application__tag">call-center</div>
//                       <div className="application__tag">Toshkent</div>
//                       <div className="application__tag">Toshkent</div>
//                     </div>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//            <div className="blackboard"
//               onDragLeave={e => this.onDragLeave(e)}
//               onDragEnter={e => this.onDragEnter(e)}
//               onDragEnd={e => this.onDragEnd(e)}
//               onDragOver={e => this.onDragOver(e)}
//               onDrop={e => this.onDrop(e, true, "done")}
//            >
//             <div className="blackboard__heading">
//               <input
//                 className="blackboard__name"
//                 defaultValue="Tartiblanmaganlar"
//               />
//               <div className="blackboard__count">{done.length}</div>
//             </div>

//             <div className="blackboard__body">
//                 {done.map(task => (
//                   <Link to="/application/1" className="application__card"
//                     key={task.id}
//                     id={task.id}
//                     draggable
//                     onDragStart={e => this.onDragStart(e)}
//                     onDragEnd={e => this.onDragEnd(e)}
//                     >
//                     <div className="flex-main">
//                       <h4 className="application__client">Izzat Rakhmatov</h4>
//                       <p className="application__date">{task.id} </p>
//                     </div>

//                     <h3 className="application__number">Zayavka № 1494482</h3>

//                     <div className="application__description">
//                       Assalomu alaykum, kontakt markaz tashkillash...
//                     </div>

//                     <div className="application__tags">
//                       <div className="application__tag">call-center</div>
//                       <div className="application__tag">Toshkent</div>
//                       <div className="application__tag">Toshkent</div>
//                     </div>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//           <div className="blackboard"
//               onDragLeave={e => this.onDragLeave(e)}
//               onDragEnter={e => this.onDragEnter(e)}
//               onDragEnd={e => this.onDragEnd(e)}
//               onDragOver={e => this.onDragOver(e)}
//               onDrop={e => this.onDrop(e, true, "status")}
//            >
            // <div className="blackboard__heading">
            //   <input
            //     className="blackboard__name"
            //     defaultValue="Tartiblanmaganlar"
            //   />
            //   <div className="blackboard__count">{status.length}</div>
            // </div>

//             <div className="blackboard__body">
//                 {status.map(task => (
                  // <Link to="/application/1" className="application__card"
                  //   key={task.id}
                  //   id={task.id}
                  //   draggable
                  //   onDragStart={e => this.onDragStart(e)}
                  //   onDragEnd={e => this.onDragEnd(e)}
                  //   >
                  //   <div className="flex-main">
                  //     <h4 className="application__client">Izzat Rakhmatov</h4>
                  //     <p className="application__date">{task.id}</p>
                  //   </div>

                  //   <h3 className="application__number">Zayavka № 1494482</h3>

                  //   <div className="application__description">
                  //     Assalomu alaykum, kontakt markaz tashkillash...
                  //   </div>

                  //   <div className="application__tags">
                  //     <div className="application__tag">call-center</div>
                  //     <div className="application__tag">Toshkent</div>
                  //     <div className="application__tag">Toshkent</div>
                  //   </div>
                  // </Link>
//                 ))}
//             </div>
//           </div>

//           <button className="application__add-board">
//             <AddIcon />
//             Yangi doska yaratish
//           </button>
//       </div>
//     );
//   }
// }

// export default AppTaskList;



import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" , status:"pending"},
  { id: uuidv4(), content: "Second task", status:"pending" },
  { id: uuidv4(), content: "Third task", status:"pending" },
  { id: uuidv4(), content: "Fourth task", status:"pending" },
  { id: uuidv4(), content: "Fifth task", status:"fulfiled" },
  { id: uuidv4(), content: "sixth task", status:"fulfiled" },
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function AppTaskBar() {
  // const columnsFromBackend = {
  //  [uuidv4()] : {
  //     name: "Requested",
  //     items: itemsFromBackend.filter(t => t.status === "pending")
  //   },
  //   [uuidv4()] :{
  //     name: "Requested",
  //     items: itemsFromBackend.filter(t => t.status === "fulfiled")
  //   },
  //   [uuidv4()] :{
  //     name: "Requested",
  //     items: []
  //   },
  // };

  const columnsFromBackend = [
    {
       name: "Requested",
       items: itemsFromBackend.filter(t => t.status === "pending")
     },
    {
       name: "Requested",
       items: itemsFromBackend.filter(t => t.status === "fulfiled")
     },
     {
       name: "Requested",
       items: []
     },
   ];

  const [columns, setColumns] = useState(columnsFromBackend);
  const AddHendler = () => {
    let obj = {name:"",items: [] }
    setColumns(prev => ({...prev, [uuidv4()]: obj}))
  }

  return (
    <div className="application">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
            className="blackboard"
            key={columnId}
            >
               <div className="blackboard__heading">
                   <input
                    className="blackboard__name"
                    defaultValue={column.name}
                    />
                  <div className="blackboard__count">{column.items.length}</div>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                         className="blackboard__body"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     
                        
                        > 
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Link to="/application/1" className="application__card" 
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                     >
                                      <div className="flex-main">
                                        <h4 className="application__client">Izzat Rakhmatov</h4>
                                        <p className="application__date">{item.content}</p>
                                      </div>
                                      <h3 className="application__number">Zayavka № 1494482</h3>
                                      <div className="application__description">
                                        Assalomu alaykum, kontakt markaz tashkillash...
                                      </div>
                                      <div className="application__tags">
                                        <div className="application__tag">call-center</div>
                                        <div className="application__tag">Toshkent</div>
                                        <div className="application__tag">Toshkent</div>
                                      </div>
                                   </Link>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                       
                      </div>
                    );
                  }}
                </Droppable>
                
            </div>
          );
        })}
      </DragDropContext>
      <button className="application__add-board" onClick={() => AddHendler()}>
          Yangi doska yaratish
      </button>
    </div>
  );
}

export default AppTaskBar;
