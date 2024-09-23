/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import { data } from "../api/data";
import { TaskContext } from "../context";

const TasksMain = () => {
  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`;
  };
  const [show, setshow] = useState(false);
  const { state, dispatch } = useContext(TaskContext);
  const [formdata,setformdata] = useState({
    id:state.task.length,
    title: "",
    description: "",
    priority: "",
    tags: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,  // Spread the existing formdata
      [name]: value // Dynamically update the field based on the input's name
    });
  };
 
  useEffect(() => {
    dispatch({ type: "LOAD_TASKS", payload: data });
  }, []);
  const handleremove = (item) => {
    dispatch({ type: "DELETE_TASK", payload: item.id });
  };
  
  const [showedit,setshowedit]= useState(false)
  const [selecteditem,setseltecteditem] = useState({
    id:"",
    title: "",
    description: "",
    priority: "",
    tags: ""
  })
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setseltecteditem({
      ...selecteditem,  // Spread the existing formdata
      [name]: value // Dynamically update the field based on the input's name
    });
  };
  const selecthandler=(item)=>{
    setshowedit(true)
    setseltecteditem(item)
  }
  const handleedit = () => {
    dispatch({ type: "EDIT_TASK", payload: selecteditem });
    setshowedit(false);
  };
  const handlesubmit=()=>{
    dispatch({ type: "ADD_TASK", payload: formdata });
    setshow(false);
    setformdata({
      title: "",
      description: "",
      priority: "",
      tags: ""
    });
  }
  
  return (
    <>
     {showedit && (
        <div className="modal fixed top-0 left-0 w-screen h-screen black/60 backdrop-blur-sm z-20">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ">
            <div className="inner shadow-md dark:bg-[#12141d] w-[620px] h-[auto] bg-white rounded-md">
              

              <div className="modalcontent">
              
                <div>
                  <form className="mx-auto  my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
                  <div className="flex items-center justify-between gap-5">
                    <h2 className="mb-0 text-center text-2xl font-bold text-white ">
                      Edit the Task 
                    </h2>
                    <span className="p-3 text-lg rounded-lg select-none cursor-pointer bg-green-400 text-white" onClick={()=>setshowedit(false)}>Close</span>

                  </div>
                    <div className="space-y-9 text-white lg:space-y-10">
                      <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                          className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                          type="text"
                          name="title"
                          value={selecteditem.title}
                          required
                          onChange={handleChange2}
                        />
                      </div>

                      <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                          type="text"
                          name="description"
                          value={selecteditem.description}
                          required
                          onChange={handleChange2}
                        ></textarea>
                      </div>

                      <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                          <label htmlFor="tags">Tags</label>
                          <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            value={selecteditem.tags}
                            onChange={handleChange2}
                            required
                          />
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                          <label htmlFor="priority">Priority</label>
                          <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                           value={selecteditem.priority}
                           onChange={handleChange2}
                            required

                          >
                            
                            <option value={selecteditem.priority}>{selecteditem.priority}</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-16 flex justify-center lg:mt-20">
                      <button
                        type="submit"
                        onClick={handleedit}
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                      >
                        Submit Edit
                      </button>
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div className="modal fixed top-0 left-0 w-screen h-screen black/60 backdrop-blur-sm z-20">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ">
            <div className="inner shadow-md dark:bg-[#12141d] w-[620px] h-[auto] bg-white rounded-md">
              

              <div className="modalcontent">
                <div>
                  <form className="mx-auto  my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
                  <div className="flex items-center justify-between gap-5">
                    <h2 className="mb-0 text-center text-2xl font-bold text-white ">
                      Add New Task 
                    </h2>
                    <span className="p-3 text-lg rounded-lg select-none cursor-pointer bg-green-400 text-white" onClick={()=>setshow(false)}>Close</span>

                  </div>

                    <div className="space-y-9 text-white lg:space-y-10">
                      <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                          className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                          type="text"
                          name="title"
                          value={formdata.title}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                          type="text"
                          name="description"
                          value={formdata.description}
                          required
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                          <label htmlFor="tags">Tags</label>
                          <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            value={formdata.tags}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                          <label htmlFor="priority">Priority</label>
                          <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                           value={formdata.priority}
                           onChange={handleChange}
                            required

                          >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-16 flex justify-center lg:mt-20">
                      <button
                        type="submit"
                        onClick={handlesubmit}
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                      >
                        Create new Task
                      </button>
                    </div>
                  </form>
                  ;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#191D26] text-white pb-[200px]">
        <div className="container">
          <div className="grid items-center gap-6 md:grid-cols-3 ">
            <div className="ddfsilf">
              <h1 className="text-5xl">Your Tasks</h1>
            </div>
            <div className="ddfsilf   md:col-span-2">
              <form>
                <div className="flex justify-end gap-3">
                  <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="z-1 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                      placeholder="Search Task"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
                    >
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setshow(true)}
                    className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                  >
                    Add Task
                  </button>
                  <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold">
                    Delete All
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mytable mt-10 table p-10 bg-blue-950 text-white">
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                    {" "}
                    Title{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                    {" "}
                    Description{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                    {" "}
                    Tags{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                    {" "}
                    Priority{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                    {" "}
                    Options{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.task.map((item, key) => {
                  return (
                    <tr className="h-20 border-b border-b-gray-500" key={key}>
                      <td className="h-20">
                        <div className="div" onClick={()=> dispatch({type:"FAVORITE",payload:item.id})}>
                        {
                          item.favorite == true ?
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-star"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="yellow"
                          fill="yellow"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        :
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="white"
                        fill="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                      </svg>
                        }
                        </div>
                        
                      </td>
                      <td className="h-20">{item.title}</td>
                      <td className="h-20">
                        <div>{item.description}</div>
                      </td>
                      <td className="h-20">
                        <ul className="flex justify-center gap-1.5 flex-wrap">
                          {item.tags.split(",").map((keyword, key2) => {
                            return (
                              <li key={key2}>
                                <span style={{ backgroundColor: getRandomColor() }} className="outline outline-2 inline-block h-5 whitespace-nowrap rounded-[45px]  px-2.5 text-sm capitalize text-[#F4F5F6]">
                                  {keyword}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td className="text-center h-20">{item.priority}</td>
                      <td className="h-20">
                        <div className="flex items-center justify-center space-x-3">
                          <button onClick={()=>handleremove(item)} className="text-red-500">Delete</button>
                          <button onClick={()=>selecthandler(item)} className="text-blue-500">Edit</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksMain;
