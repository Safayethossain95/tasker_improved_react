
import { useReducer } from 'react'
import './App.css'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import TasksMain from './components/TasksMain'
import { TaskContext } from './context'
import { initialstate, TaskReducer } from './reducers/TaskReducer'



function App() {
  const [state,dispatch]= useReducer(TaskReducer,initialstate)
  
 
  return (
    <>
    <TaskContext.Provider value={{state,dispatch}}>

      <main>
        <Navbar/>
        <Banner/>
        <TasksMain/>
      </main>
    </TaskContext.Provider>
    </>
  )
}

export default App
