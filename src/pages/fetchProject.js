import React, { useState, useEffect } from 'react';

function FetchProject() {
  const [projects, setProjects] = useState([]);
  const bearerToken = process.env.REACT_APP_BITBUCKET_TOKEN;
  console.log(bearerToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://stash.guidewire.com/rest/api/1.0/projects/', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.values);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, [bearerToken]);

  return (
    <div>
      <h1>List of Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.key}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchProject;
