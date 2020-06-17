import React, { useState, useEffect, useRef } from 'react'
import { useInterval } from './useInterval'
import TimeSet from './TimeSet'
import Timer from './Timer'
import Controls from './Controls'
import alarm from './sounds/alarm.mp3'
import './App.css'

// Pomodoro App

const App = () => {
  const [breakVal, setBreakVal] = useState(5)
  const [sessionVal, setSessionVal] = useState(25)
  const [mode, setMode] = useState('session')
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [active, setActive] = useState(false)
  const beep = useRef()

  useInterval(() => setTime(time-1000), active ? 1000 : null)

  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])

  useEffect(() => {
    if (time === 0 && mode === 'session') {
      beep.current.play()
      setMode('break')
      setTime(breakVal * 60 * 1000)
    } else if (time === 0 && mode === 'break') {
      beep.current.play()
      setMode('session')
      setTime(sessionVal * 60 * 1000)
    }
  }, [time, breakVal, sessionVal, mode])

  const handleReset = () => {
    beep.current.pause()
    beep.current.currentTime = 0
    setActive(false)
    setMode('session')
    setBreakVal(5)
    setSessionVal(25)
    setTime(25 * 60 * 1000)
  }

  return (
    <div className="container">
      <header>
        <h1>Time my work!</h1>
      </header>
      <main>
        <div className="time-wrapper">
          <Timer currentMode={[mode, setMode]} currentTime={[time, setTime]} />
          <Controls
            activeStatus={[active, setActive]}
            handleReset={handleReset}
          />
        </div>
        <div className="timeset-wrapper">
          <TimeSet type={'Break'} value={[breakVal, setBreakVal]} />
          <TimeSet type={'Session'} value={[sessionVal, setSessionVal]} />
        </div>
      </main>
      <audio id="beep" src={alarm} ref={beep} />
      <hr />
      <TodoApp />
    </div>
  )
}

// Todo App
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}
    >
      {todo.text}
      <div>
        <button onClick = {() => completeTodo(index)}>Complete</button>
        <button onClick = {() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function TodoApp() {
  const [todos, setTodos] = useState([
    { 
      text: "Learn about React",
      isCompleted: false 
    },
    { 
      text: "Meet friend for lunch",
      isCompleted: false 
    },
    { 
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Things I have to do</h1>
      <div className="todo-list">
        {todos.map(( todo, index) =>
        <Todo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
        )}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App
