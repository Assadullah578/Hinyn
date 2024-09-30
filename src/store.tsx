import { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';
import { getClients } from '../components/forms/formService';
import { origin } from '../src/config';
axios.defaults.withCredentials = true;

interface Freelancer {
  id: string;
  attributes: {};
}

export async function getServerSideProps() {
  try {
    const freelancerPromise = getClients(1);
    const projectsPromise = axios.get(origin + '/bids?populate=*', {});

    const [freelancerResponse, projectsResponse] = await Promise.all([
      freelancerPromise,
      projectsPromise,
    ]);

    const freelancerData = freelancerResponse.data?.data ?? [];
    const projectsData = projectsResponse.data?.data ?? [];

    return {
      props: {
        freelancer: freelancerData,
        project: projectsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        freelancer: [],
        project: [],
      },
    };
  }
}

const useFreelancerController = (initialFreelancer: Freelancer[]) => {
  const [filter, setFilter] = useState(undefined);
  const [freelancer, setFreelancer] = useState(initialFreelancer);

  return {
    filter,
    setFilter,
    freelancer,
    setFreelancer,
  };
};

const FreelancerContext = createContext<{
  filter: any; // Change any to the appropriate type
  setFilter: React.Dispatch<any>; // Change any to the appropriate type
  freelancer: Freelancer[];
  setFreelancer: React.Dispatch<React.SetStateAction<Freelancer[]>>; // Include setFreelancer with its proper type
}>({
  filter: '',
  setFilter: () => {},
  freelancer: [],
  setFreelancer: () => {}, // Provide a default function here or adjust as needed
});

export const FreelancerProvider = ({ freelancer, children }) => (
  <FreelancerContext.Provider value={useFreelancerController(freelancer)}>
    {children}
  </FreelancerContext.Provider>
);

export const useFreelancer = () => useContext(FreelancerContext);

interface Project {
  id: string;
  title: string;
  status: number;
  description: string;
  attributes: {};
}

const useProjectController = (initialProjects: Project[]) => {
  const [projectFilter, setProjectFilter] = useState(undefined);
  const [project, setProject] = useState(initialProjects); // Add state for projects

  return {
    projectFilter,
    setProjectFilter,
    project, // Change project to projects
    setProject, // Add state setter for projects
  };
};

// Context definition and provider remains the same as before

const ProjectContext = createContext<{
  projectFilter: any;
  setProjectFilter: React.Dispatch<any>;
  project: Project[];
  setProject: React.Dispatch<React.SetStateAction<Project[]>>;
}>({
  projectFilter: '',
  setProjectFilter: () => {},
  project: [],
  setProject: () => {},
});

export const ProjectProvider = ({ project, children }) => (
  <ProjectContext.Provider value={useProjectController(project)}>
    {children}
  </ProjectContext.Provider>
);

export const useProject = () => useContext(ProjectContext);
