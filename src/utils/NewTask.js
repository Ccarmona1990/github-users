import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

const NewTask = ({state, dispatch, setTask}) => {

    const handleDelete = (id)=>{
        const newtasks = state.tasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        dispatch({type: 'DELETE_TASK', deleteUncompletedTaskPayload: newtasks })
    }
    const handleEdit = (id, index)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[1];
        setTask(currentTaskToEdit.innerHTML);
        dispatch({type: 'EDIT_TASK', payload2:{...currentTaskToEdit, idx: index }})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
    }
    const toggleChecked= (id, index)=>{
        const currentTaskInfo = state.tasks[index];
        const currentTaskToEdit = document.getElementById(id);
        const currentCheckbox= currentTaskToEdit.children[0].children[0];
        const uncompletedTasks = state.tasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        if(currentCheckbox.checked){
            currentTaskToEdit.className += ' completedTask ';
            dispatch({type: 'COMPLETED_TASK', completedTaskPayload: currentTaskInfo, uncompletedTaskPayload: uncompletedTasks })
        } 
    }
    return (
        <section className='tasksContainer'>
            {state?.tasks?.map((newTask,i)=>{
                const {id, task} = newTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className='task'
                    >
                        <aside >
                            <input type='checkbox' 
                            name={task}
                            id='checkbox'
                            onClick={()=>toggleChecked(id,i)}
                            />
                        <h4>{task}</h4>
                        </aside>
                        <aside className='nTaskBtnContainer'>
                        <button 
                        className="nTaskBtn"
                        onClick={()=>handleEdit(id, i)}
                        ><FontAwesomeIcon icon={faEdit}
                        color='darkgreen'
                        size='1x'/></button>

                        <button className="nTaskBtn"
                        onClick={()=>handleDelete(id)}
                        ><FontAwesomeIcon icon={faTrash}
                        color='red'
                        size='1x'/></button>
                        </aside>
                    </div>
                )
            })}
            </section>
    )
}

export default NewTask
