// assets/service/ProjectService.js

import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Function to list all projects by username
export const listProjectsByUsername = (username) =>
  axios.get(`${BASE_URL}/getProjectList?Username=${username}`);

// Function to create a new project
export const createProject = (username, project) =>
  axios.post(`${BASE_URL}/postProject?Username=${username}`, project);

// Function to get a project by projectId
export const getProjectById = (projectId) =>
  axios.get(`${BASE_URL}/getProjectById?projectId=${projectId}`);

// Function to update a project by projectId
export const updateProject = (projectId, project) =>
  axios.put(`${BASE_URL}/updateProject?projectId=${projectId}`, project);

// Function to delete a project by project title
export const deleteProjectByTitle = (projectTitle) => {
  const encodedProjectTitle = encodeURIComponent(projectTitle);
  return axios.delete(
    `${BASE_URL}/deleteProjectList?projectTitle=${encodedProjectTitle}`
  );
};

// Function to get project list by username
export const getProjectListByUsername = (username) =>
  axios.get(`${BASE_URL}/getProjectList?Username=${username}`);

export default {
  listProjectsByUsername,
  createProject,
  getProjectById,
  updateProject,
  deleteProjectByTitle,
  getProjectListByUsername,
};
