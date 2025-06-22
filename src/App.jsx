import { useEffect, useState } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputText, setinputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [])
  


  const localStorageTodo = (updatedTodos) => { 
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  const handleInputChange = (e) => {
    setinputText(e.target.value);
  }
  const handleAddTodo = () => {
    if (inputText.length > 3) {
      let newTodos = [...todos, {inputText, id:uuidv4(), isCompleted: false}];
      setTodos(newTodos);
      localStorageTodo(newTodos);
      setinputText("");
    }

  }
  const handleDeleteTodo = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    localStorageTodo(newTodos);
  }
  const handleEditTodo = (id) => {
    setinputText(todos.find(item => item.id === id).inputText);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }
  const handleCheckbox = (id) => {
    let newTodos = [...todos];
    let todoToUpdate = newTodos.find(item => item.id === id);
    todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
    setTodos(newTodos);
    localStorageTodo(newTodos);
  }

  const handleShowfinished = () => { 
    setshowFinished(!showFinished);
   }

  return (
    <main className='flex items-center justify-center h-screen p-4'>
      <div className='w-full h-full rounded-3xl bg-violet-300 border border-violet-800 shadow-xl p-4 sm:w-[80%] sm:h-[80vh] xl:w-1/3'>
        <h2 className='text-2xl font-bold text-center'>Your own Task Manager - Taskify</h2>
        <div className='flex gap-2 w-full my-4'>
          <input type="text" className='bg-white rounded-3xl w-full p-2' onChange={handleInputChange} value={inputText}/>
          <button className='w-1/4 bg-violet-600 text-white rounded-3xl' onClick={handleAddTodo}>Add</button>
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Add your todos</h2>
          <div className='flex items-center gap-2'>
            <input type="checkbox" name="" id="" checked={showFinished} onChange={handleShowfinished}/>
            <h2 className='text-xl font-bold'>Show finished</h2>
          </div>
        </div>
        <div className='w-full h-[1px] bg-violet-600 opacity-80 my-2'></div>
        {
          todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div className='my-2 flex items-center justify-between' id='TodoList' key={item.id}>
              <div className='flex items-center gap-2'>
                <input type="checkbox" name="" id="" onChange={() => handleCheckbox(item.id)} checked={item.isCompleted}/>
                <span className={item.isCompleted?"line-through":""}>{item.inputText}</span>
              </div>
              <div className='flex items-center gap-2'>
                <button className='bg-red-500 text-white rounded-full px-2 py-2' onClick={() => handleDeleteTodo(item.id)}><MdDeleteOutline /></button>
                <button className='bg-violet-600 text-white rounded-full px-2 py-2' onClick={() => handleEditTodo(item.id)}><RiEdit2Fill /></button>
              </div>
            </div>
            )
          })

        }

      </div>

    </main>
  )
}

export default App
