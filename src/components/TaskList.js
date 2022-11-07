import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import '../styles/App.scss';
import AddTask from './AddTask';
import Header from './Header';
import Task from './Task';

const TasksList = ({ token }) => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    const taskListName = () => {
        return ("tklist-" + token);
    }

    const getTasks = () => {
        console.log("recuperando task-list");
        const tsks = JSON.parse(localStorage.getItem(taskListName()));
        if (tsks == null) {
            setTasks([])
        } else {
            setTasks(tsks);
        }
        return tasks;
    }

    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]);
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new task!'
        })
        localStorage.setItem(taskListName(), JSON.stringify([...tasks, newTask]));
    }

    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);
        setTasks(deleteTask);
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a task!'
        })
        localStorage.setItem(taskListName(), JSON.stringify(deleteTask));
    }

    const editTask = (id) => {
        const text = prompt("Task Name");
        const day = prompt("Day and Time");
        let data = JSON.parse(localStorage.getItem(taskListName()));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    id: uuidv4()
                }
            }
            return x;
        })
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully edited an existing task!'
        })
        localStorage.setItem(taskListName(), JSON.stringify(myData));
        window.location.reload();
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            getTasks();
        }
    }, [])

    return (
        <div>
            <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
            {showAddTask && <AddTask onSave={addTask} />}
            <div className='task-list'> Number of Tasks: {tasks.length}
                <div className='container'>
                    {
                        tasks.map((task) => (
                            token === task.author ?
                                <Task key={task.id} task={task} onDelete={deleteTask} onEdit={editTask} />
                                :
                                <>Empty</>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default TasksList;