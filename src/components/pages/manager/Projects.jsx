import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash } from 'lucide-react';
import { getProjects, getProjectById, addProject, updateProject, deleteProject } from '../../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    projectid: "",
    projectname: "",
    projectdescription: "",
    duedate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message || error);
      }
    };

    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDueDate = new Date(formData.duedate).toISOString().split('T')[0];
      const projectData = { ...formData, duedate: formattedDueDate };

      if (formData.id) {
        await updateProject(formData.id, projectData);
      } else {
        await addProject(projectData);
      }

      const response = await getProjects(); 
      setProjects(response.data);
      setFormVisible(false);
      setFormData({
        projectid: "",
        projectname: "",
        projectdescription: "",
        duedate: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message || error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      const response = await getProjects(); // Refresh project list
      setProjects(response.data);
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message || error);
    }
  };

  const handleEdit = async (projectId) => {
    try {
      const response = await getProjectById(projectId);
      const project = response.data;
      setFormData({
        projectid: project.projectid,
        projectname: project.projectname,
        projectdescription: project.projectdescription,
        duedate: project.duedate
      });
      setFormVisible(true);
    } catch (error) {
      console.error("Error fetching project details:", error.response?.data || error.message || error);
    }
  };

  return (
    <div className='h-full w-full flex justify-center items-center bg-black'>
      <div className='w-[90%] max-w-7xl bg-black text-white shadow-lg rounded-lg border border-gray-500'>
        <Table>
          <TableCaption className="bg-muted text-muted-foreground">Current Projects</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="w-[120px] text-white">Project ID</TableHead>
              <TableHead className="text-white">Project Name</TableHead>
              <TableHead className="text-white">Project Description</TableHead>
              <TableHead className=" text-white">Due Date</TableHead>
              <TableHead className=" text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.projectid} className="bg-black text-white">
                <TableCell className="font-medium text-white">{project.projectid}</TableCell>
                <TableCell className="text-white">{project.projectname}</TableCell>
                <TableCell className="text-white">{project.projectdescription}</TableCell>
                <TableCell className="text-white">{project.duedate}</TableCell>
                <TableCell className="text-white space-x-2">
                  <Button onClick={() => handleEdit(project.projectid)} className="bg-green-500 text-white hover:bg-green-600 mr-2">
                    <Pencil /> 
                  </Button>
                  <Button onClick={() => handleDelete(project.projectid)} className="bg-red-500 text-white hover:bg-red-600">
                    <Trash  /> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='flex justify-center bg-transparent m-5'>
            <Button className='flex justify-center items-center bg-green-500 text-white hover:bg-green-600' onClick={() => setFormVisible(true)}>
              <Plus className="mr-2" /> Add Project
            </Button>
          </TableFooter>
        </Table>

        {/* Form Modal */}
        {isFormVisible && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full text-white'>
              <h2 className='text-xl font-bold mb-4'>Add/Edit Project</h2>
              <form onSubmit={handleFormSubmit}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='projectname'>Project Name</label>
                  <input
                    id='projectname'
                    name='projectname'
                    type='text'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.projectname}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='projectdescription'>Project Description</label>
                  <input
                    id='projectdescription'
                    name='projectdescription'
                    type='text'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.projectdescription}
                    onChange={handleFormChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium' htmlFor='duedate'>Due Date</label>
                  <input
                    id='duedate'
                    name='duedate'
                    type='date'
                    className='mt-1 block w-full border-gray-300 rounded-md bg-gray-900 text-white'
                    value={formData.duedate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className='flex justify-end space-x-2'>
                  <Button type='button' className='bg-red-500 text-white hover:bg-red-600' onClick={() => setFormVisible(false)}>Cancel</Button>
                  <Button type='submit' className='bg-green-500 text-white hover:bg-green-600'>
                    {formData.id ? 'Update Project' : 'Add Project'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
