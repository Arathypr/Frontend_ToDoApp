import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const location = useLocation();
  const username = location.state && location.state.username;

  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectTitles, setProjectTitles] = useState([]);
  const [checkdata, setCheckdata] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectList(); 
  }, []);

  useEffect(() => {
    fetchProjectList(); 
  }, [checkdata]);

  //get
  const fetchProjectList = async () => {
    try {
      console.log("Fetching project list...");
      const response = await axios.get(
        `http://localhost:8080/getProjectList?Username=${username}`
      );
      console.log("Response:", response.data);
      const fetchedProjects = response.data || []; 
      console.log("Fetched Projects:", fetchedProjects);
     
      const titles = fetchedProjects.map(
        (project) => JSON.parse(project.title).title
      );
      console.log("Fetched Project Titles:", titles);
    
      setProjects(fetchedProjects);
      setProjectTitles(titles);
    } catch (error) {
      console.error("Error fetching project list:", error);
    }
  };

  //add
  const handleAddProject = async () => {
    console.log("username", username);
    if (newProjectName.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:8080/postProject?Username=${username}`,
          {
            title: newProjectName,
          }
        );
        const newProject = response.data;
        console.log("projects", newProject);
        setCheckdata(!checkdata);

        setNewProjectName("");
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  //update
  const handleProjectTitleChange = async (index, newValue) => {
    try {
      
      const projectId = projects[index]?.projectId;

      if (!projectId) {
        console.error("Project ID not found for index:", index);
        return;
      }

      
      const initialTitle = projectTitles[index];
      if (newValue !== initialTitle) {
      
        await axios.put(
          `http://localhost:8080/updateProject?projectId=${projectId}`,
          {
            title: newValue,
          }
        );

        const updatedTitles = [...projectTitles];
        updatedTitles[index] = newValue;
        setProjectTitles(updatedTitles);
      }
    } catch (error) {
      console.error("Error updating project title:", error);
    }
  };

  //delete

  const handleDeleteProject = async (projectToDelete, projectIds) => {
    console.log(projectIds);
    if (!projectToDelete || !projectIds) {
      console.error("Invalid project.");
      return;
    }

    const projectId = projectToDelete.projectId;
    console.log("Deleting project with ID:", projectId);
    try {
      await axios.delete(
        `http://localhost:8080/deleteProjectList?projectId=${projectId}`
      );
      console.log("Project deleted successfully");
    
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
      
      setProjectTitles((prevTitles) =>
        prevTitles.filter((_, index) => index !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
    console.log(projectToDelete);
  };

  // Navigate to the ToDoList component
  const handleAddTodo = (projectId) => {
    navigate("/todoList", { state: { projectId } });
    console.log("idproject", projectId);
  };

  return (
    <div className="flex  ">
      <div className="m-10">
        <div>
          <input
            type="text"
            placeholder="Enter Project Name"
            className="border border-gray-300 rounded-lg px-3 py-2 mr-2"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 5 py-2 vvsm:mt-4 rounded-lg"
            onClick={handleAddProject}
          >
            Add Project
          </button>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-5 vvsm:w-[230%] sm:w-[100%]  "
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                }}
              >
                <div>
                  <input
                    type="text"
                    value={projectTitles[index] || ""}
                    onChange={(e) =>
                      handleProjectTitleChange(index, e.target.value)
                    }
                    className="w-full  mb-2 border-b-2 border-gray-400 focus:outline-none font-Poppins"
                  />
                  <p className="text-gray-500 text-[11px] mt-1">
                    Created on:{" "}
                    {new Date(project.createdDate).toLocaleDateString()}
                  </p>
                </div>

                <div style={{ display: "inline-block" }}>
                  <button
                    className="bg-blue-500 text-white mt-5 p-2 mr-9 w-20 rounded-lg text-xs font-semibold"
                    onClick={() => handleAddTodo(project.projectId)}
                  >
                    Add Todo
                  </button>
                  <button
                    className="bg-red-500 text-white mt-5 p-2 w-20 rounded-lg text-xs font-semibold"
                    onClick={() =>
                      handleDeleteProject(project, project.projectId)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
