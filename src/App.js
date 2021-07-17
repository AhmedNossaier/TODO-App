import React , {useState , useEffect} from 'react';
import './App.css';
//Importing Components

import Form from './Components/Form';
import TodoList from './Components/TodoList';


function App() {

  // state
  const [inputText , setInputText] = useState(" ");
  const [todos , setTodos] = useState([]);
  const [status , setStatus] = useState('all');
  const [filteredTodos , setFilteredTodos] = useState([]);

  //useeffect
  useEffect(() => {
    getLocalTodos();
  },[]);

   useEffect(() =>{
     filterHandler() ;
     saveLocalTodo();
   },[todos , status]);

//functions
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break ;
      
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break ;
      
      default :
        setFilteredTodos(todos);
        break;
    }
  };

  // Save to local Storage 

  const saveLocalTodo = () => {
    localStorage.setItem("todos" , JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return ( 
    <div className="App">

      <header>
        <h1>AHMED Todo List</h1>
      </header>
      <Form 
        setInputText ={setInputText} 
        todos={todos}
        setTodos={setTodos}
        inputText ={inputText}
        setStatus={setStatus}/>

      <TodoList 
        setTodos={setTodos}
        todos={todos} 
        //todo={todo}
        filteredTodos={filteredTodos}
      />
    </div>

    

  )
}

export default App;
