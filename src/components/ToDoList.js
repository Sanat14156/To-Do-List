import React, { useState } from "react";
import { Form } from "./Form";


const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
 

  const addTask = (task) => {
    if(task!=="")
    {
       const newTask = {
         mainTask: task,
         sbTask: [],
         isEditing: false,
         isSubEditing: false,
       };
        setTasks((prev) => [...prev, newTask]);
    }
   
   
  };

  console.log(tasks);

  const toggleEdit = (index) => {
    const editTask = tasks.map((v, i) =>
      i === index ? { ...v, isEditing: !v.isEditing } : v
    );
    setTasks(editTask);
  };

  const updateTask = (index, task) => {
    if (task !== "") {
      // const editTodo = tasks.map((v, i) =>
      //   i === index ? { ...v, isEditing: false, mainTask: task } : v
      // );

      setTasks((prev) => {
        const tsks = [...prev];
        tsks[index] = { ...tsks[index], isEditing: false, mainTask: task };
        return tsks;
      });
    }
  };
  console.log(tasks);
  const subTask = (index) => {
    const addSub = tasks.map((v, i) =>
      i === index ? { ...v, isSubEditing: !v.isSubEditing } : v
    );
    setTasks(addSub);
  };

  const addSTask = (index, task) => {
    if (task !== "") {
      const ss = {
        mainSubTask: task,
        isSEditing: false,
      };

      setTasks((tasks) =>
      
        tasks.map((tsk, i) =>
          i === index
            ? { ...tsk, isSubEditing: false, sbTask: [...tsk.sbTask, ss] }
            : tsk
        )
      );
      console.log(tasks);
    }
  };

  const handleSubEdit = (index, subIndex) => {
    setTasks((prev) => {
      const tasks = [...prev];
      tasks[index].sbTask[subIndex] = {
        ...tasks[index].sbTask[subIndex],
        isSEditing: true,
      };
      return tasks;
    });
    console.log(tasks);
  };

  const updateSub = (index, subIndex, task) => {
    if (task !== "") {
      setTasks((prev) => {
        const tasks = [...prev];
        tasks[index].sbTask[subIndex] = {
          ...tasks[index].sbTask[subIndex],
          isSEditing: false,
          mainSubTask: task,
        };
        return tasks;
      });
    }
  };

  return (
    <div className="sub-main">
      <Form handleSubmit={addTask} buttonLabel="Add Task" />
      <div className="list">
      {tasks.map((task, index) => (
        <div>
          {task.isEditing ? (
            <Form
              handleSubmit={(task) => updateTask(index, task)}
              buttonLabel="update"
              defaultValue={task.mainTask}
            />
          ) : (
            <div className="main-task">
              <span>⦿ {task.mainTask}</span>
              <div className="main-buttons">
                <button className="add" onClick={() => subTask(index)}>Add sub Task</button>
                <button className="edit" onClick={() => toggleEdit(index)}>Edit</button>
                <button className="close"
                  onClick={() =>
                    setTasks((tasks) => tasks.filter((v) => v !== task))
                  }
                >
                  X
                </button>
              </div>
            </div>
          )}
          {task.isSubEditing && (
            <Form
              handleSubmit={(task) => addSTask(index, task)}
              buttonLabel="Add"
            />
          )}
          <div className="sub-tasks">
            {task.sbTask.map((sb, subIndex) => (
              <div>
                {sb.isSEditing ? (
                  <Form
                    defaultValue={sb.mainSubTask}
                    handleSubmit={(task) => updateSub(index, subIndex, task)}
                    buttonLabel="update sub"
                  />
                ) : (
                  <li>
                    <span>➼ {sb.mainSubTask}</span>
                    <div>
                      <button className="edit"
                        onClick={() => handleSubEdit(index, subIndex, task)}
                      >
                        edit sub
                      </button>
                      <button className="close"
                        onClick={() => {
                          setTasks((prev) => {
                            const tasks = [...prev];
                            tasks[index].sbTask = tasks[index].sbTask.filter(
                              (v) => v !== sb
                            );
                            return tasks;
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ToDoList;
