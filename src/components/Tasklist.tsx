import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Tasklist = ({walletAddress,walletAmount,contract}) => {

    const [task, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("")
   

    
    const getAllTask=async()=>{
        const res=await contract.getMyTasks();
        setTasks(res);
       
    }

    useEffect(()=>{
       
        getAllTask()
    },[])
    const deleteItem = async(id) => {



        const res=await contract.deleteTask(id,true);
        console.log(res);
        toast.info('Task Delete Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

            getAllTask();
           
    }

    const addTask=async(e)=>{
        e.preventDefault();
        let ContractTask={
            taskText:newTask,
            isDeleted:false
        }

       const addContractResult=await contract.addTask(ContractTask.taskText,ContractTask.isDeleted);
        console.log(addContractResult);
        setTasks([...task, newTask]),
        toast.success('Enter Task Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setNewTask("")
        getAllTask()
        
    }
    return (
        <>
            <ToastContainer />

            <div className="p-7" >
                <div className="enter-task flex flex-row space-x-5 justify-center items-center " >
                    <input type="text" className="flex-1 p-3 rounded bg-blue-500  outline-none text-white" placeholder="Add Tasks For Today..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <BsFillPlusCircleFill size={35} color={"hotpink"} onClick={
                        (e) => {
                            newTask == "" ? (
                                toast.error('Please Enter Some Task', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",

                                }))
                                :
                                (  
                                    
                                   addTask(e) 
                                )
                        }
                    } className="hover:cursor-pointer" />
                </div>

                <div className="mt-5">
                    {
                        task.map((value, index) => {
                            return (
                                    <div className="flex items-center space-x-5" key={index} >
                                        <div className="task-list flex-1 mt-5 mb-5 flex items-center bg-blue-500 p-3 rounded ">
                                            <p className="text-white font-bold" >{value.taskText}</p>
                                            
                                        </div>
                                        <div>
                                            <AiFillDelete size={35} color={"white"} onClick={() => deleteItem(value.id)} className="hover:cursor-pointer" />
                                        </div>
                                    </div>)
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Tasklist;