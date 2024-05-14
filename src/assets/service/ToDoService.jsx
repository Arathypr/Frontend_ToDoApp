import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:8080';

// Function to create a new todo
export const createTodo = async (projectId, todoData) => {
  try {
    // Provide a default status of 'pending' if not included in todoData
    const { description, status = 'pending' } = todoData;
    
    const response = await axios.post(`${BASE_URL}/postTodo?projectId=${projectId}`, {
      description: description,
      status: status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get a todo by its ID
export const getTodoById = async (todoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getToDotById?todoId=${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a todo by its ID
export const updateTodo = async (todoId, updatedTodoData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateToDo?todoId=${todoId}`, updatedTodoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a todo by its ID
export const deleteTodoById = async (todoId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteToDoList?todoId=${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
