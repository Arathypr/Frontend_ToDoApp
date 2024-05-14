import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import axios from "axios";
import "./Style.css";

function ToDoList() {
  const location = useLocation();
  const projectId = location.state && location.state.projectId;
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [updatedTodoDescription, setUpdatedTodoDescription] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, [projectId]);

  //get
  const fetchTodoList = async () => {
    try {
      console.log("Fetching todo list...");
      const response = await axios.get(
        `http://localhost:8080/getToDoList?projetId=${projectId}`
      );
      console.log("Response:", response.data);

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  // Add ToDo
  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:8080/postTodo?projectId=${projectId}`,

          [newTodo, false]
        );
        console.log("Response:", response.data);

        fetchTodoList();

        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  //Update the ToDo
  const handleEditTodo = async (todoId, description) => {
    if (!todoId) {
      console.error("Invalid todo ID.");
      return;
    }

    setUpdatedTodoDescription(description);
    setEditingTodoId(todoId); // Set the todo ID being edited
  };

  // Function to handle saving edited todo
  const handleSaveTodo = async (todoId) => {
    try {
      await axios.put(`http://localhost:8080/updateToDo?todoId=${todoId}`, [
        updatedTodoDescription,
        false,
      ]);
      console.log("Todo updated successfully");

      fetchTodoList();

      setEditingTodoId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete ToDo
  const handleDeleteTodo = async (todoToDelete) => {
    if (!todoToDelete) {
      console.error("Invalid todo.");
      return;
    }

    const todoId = todoToDelete.todoId;
    console.log("Deleting todo with ID:", todoId);
    try {
      await axios.delete(
        `http://localhost:8080/deleteToDoList?todoId=${todoId}`
      );
      console.log("Todo deleted successfully");

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todoId !== todoId)
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  // Handle Todo Completion
  const handleTodoCompletion = async (todoId, isCompleted) => {
    try {
      await axios.put(`http://localhost:8080/updateToDo?todoId=${todoId}`, [
        updatedTodoDescription,
        isCompleted,
      ]);
      console.log("Todo completion updated successfully");

      const updatedTodos = todos.map((todo) => {
        if (todo.todoId === todoId) {
          return {
            ...todo,
            completed: isCompleted,
          };
        }
        return todo;
      });

      setTodos(updatedTodos);

      if (isCompleted) {
        const completedTodo = todos.find((todo) => todo.todoId === todoId);
        setCompletedTodos((prevCompletedTodos) => [
          ...prevCompletedTodos,
          completedTodo,
        ]);

        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.todoId !== todoId)
        );
      } else {
        setCompletedTodos((prevCompletedTodos) =>
          prevCompletedTodos.filter((todo) => todo.todoId !== todoId)
        );
      }
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  };
  return (
    <div
      className="App bg-blue-950 h-screen pt-10 font-Poppins"
      projectid={projectId}
    >
      <h1 className="text-xl text-white">My Todos</h1>

      <div className="todo-wrapper w-screen overflow-hidden">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn bg-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        <div className="todo-list w-[100%] p-3 capitalize">
          {todos.map((todo, index) => (
            <div
              className={`todo-item flex items-center justify-between border-b border-gray-200 py-2 ${
                todo.completed ? "line-through" : ""
              }`}
              key={index}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() =>
                    handleTodoCompletion(todo.todoId, !todo.completed)
                  }
                />
                {editingTodoId === todo.todoId ? (
                  <div>
                    <input
                      className="p-2 text-sm font-Poppins"
                      type="text"
                      value={updatedTodoDescription}
                      onChange={(e) =>
                        setUpdatedTodoDescription(e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleSaveTodo(todo.todoId)}
                      className="ml-3 pl-3 pr-3 p-1 bg-blue-500 text-white font-Poppins"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="text-sm text-sky-900 font-semibold mr-3">
                      {todo.description}
                    </p>
                    <p className="text-[11px] text-gray-600">
                      Created: {new Date(todo.createdDate).toLocaleDateString()}
                      {todo.updatedDate && (
                        <>
                          <br />
                          Updated:{" "}
                          {new Date(todo.updatedDate).toLocaleDateString()}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <AiFillEdit
                  className="cursor-pointer text-sky-900"
                  onClick={() => handleEditTodo(todo.todoId, todo.description)}
                />
                <BsFillTrashFill
                  className="cursor-pointer text-sky-900"
                  onClick={() => handleDeleteTodo(todo)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Completed Todos Section */}
        {completedTodos.length > 0 && (
          <div className="completed-todos mt-4">
            <h2 className="text-xl text-white">Completed Todos</h2>
            <ul className="list-disc pl-4">
              {completedTodos.map((todo) => (
                <li key={todo.todoId} className="completed-todo">
                  {todo.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
