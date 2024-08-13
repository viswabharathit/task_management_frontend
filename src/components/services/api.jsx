import axios from 'axios';

const baseURL = "http://localhost:8080";
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request config", config);
        return config;
    },
    (error) => {
        console.log("Request error", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Response error", error.response);
        return Promise.reject(error);
    }
);

const registerTeamMember = (name, email, password, contact, role) => 
    axiosInstance.post('/users/auth/register', { name, email, password, contact, role });

const registerProjectManager = (name, email, password, contact, role) => 
    axiosInstance.post('/users/auth/register/pm', { name, email, password, contact, role });


// CRUD operations for projects
const getProjects = () => axiosInstance.get('/projects/findAll');
const getProjectById = (projectId) => axiosInstance.get(`/projects/findById/${projectId}`);
const addProject = (project) => axiosInstance.post('/projects/add', project);
const updateProject = (projectId, project) => axiosInstance.put(`/projects/update/${projectId}`, project);
const deleteProject = (projectId) => axiosInstance.delete(`/projects/delete/${projectId}`);

// CRUD operations for users
const getUserById = (userId) => axiosInstance.get(`/users/auth/findById/${userId}`);
const getUsers = () => axiosInstance.get('/users/auth/findAll');
const getCurrentUserId = async () => {
    try {
        const response = await axiosInstance.get('/users/auth/current-id');
        return response.data;
    } catch (error) {
        console.error("Error fetching current user ID:", error);
        throw error;
    }
};
const deleteUserById = (userId) => axiosInstance.delete(`/users/auth/delete/${userId}`);
const updateUserById = (userId, userData) => axiosInstance.put(`/users/auth/update/${userId}`, userData);
const updateSpecificUserById = (userId, updateData) => axiosInstance.patch(`/users/auth/updateSpecific/${userId}`, updateData);
const updateUser = (userId,updateData) => axiosInstance.put(`/users/auth/${userId}`, updateData)
// CRUD operations for tasks
const getTasks = () => axiosInstance.get('/tasks/findAll');
const getTaskById = (taskId) => axiosInstance.get(`/tasks/findById/${taskId}`);
const addTask = (task) => axiosInstance.post('/tasks/add', task);
const updateTask = (taskId, task) => axiosInstance.put(`/tasks/update/${taskId}`, task);
const patchTask = (taskId, updateData) => axiosInstance.patch(`/tasks/updateSpecific/${taskId}`, updateData);
const patchUserTask = (taskId, updateData) => axiosInstance.patch(`/tasks/updateUsertask/${taskId}`, updateData);
const deleteTask = (taskId) => axiosInstance.delete(`/tasks/delete/${taskId}`);

const getUserTasks = async (userId) => {
    try {
        const response = await axiosInstance.get(`/tasks/user/${userId}`);
        console.log("Response Tasks from method" + response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};
const getUserIdFromEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/auth/mail?email=${email}`);
        console.log("Response from method" + response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching user ID from email:", error);
        throw error;
    }
};

export {
    axiosInstance, registerTeamMember, registerProjectManager,
    getProjects, getProjectById, addProject, updateProject, deleteProject,
    getUsers, getUserById, deleteUserById, updateUserById, updateSpecificUserById, getCurrentUserId,updateUser,
    getTasks, getTaskById, addTask, updateTask, patchTask, deleteTask, getUserTasks, getUserIdFromEmail, patchUserTask
}