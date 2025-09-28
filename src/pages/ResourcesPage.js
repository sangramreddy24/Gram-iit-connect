import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ResourceCard from '../components/ResourceCard';
import './ResourcesPage.css'; // We will create this CSS file

export default function ResourcesPage() {
  const [allResources, setAllResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [filters, setFilters] = useState({
    subject: 'All',
    target_class: 'All',
    difficulty: 'All',
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch all resources from the database on initial render
  useEffect(() => {
    async function getResources() {
      try {
        const { data, error } = await supabase.from('resources').select('*');
        if (error) throw error;
        setAllResources(data);
        setFilteredResources(data); // Initially, show all
      } catch (error) {
        console.error('Error fetching resources:', error.message);
      } finally {
        setLoading(false);
      }
    }
    getResources();
  }, []);

  // 2. Apply filters whenever the 'filters' state or 'allResources' list changes
  useEffect(() => {
    let result = allResources;

    if (filters.subject !== 'All') {
      result = result.filter((res) => res.subject === filters.subject);
    }
    if (filters.target_class !== 'All') {
      result = result.filter((res) => res.target_class === filters.target_class);
    }
    if (filters.difficulty !== 'All') {
      result = result.filter((res) => res.difficulty === filters.difficulty);
    }
    
    setFilteredResources(result);
  }, [filters, allResources]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (loading) return <div className="loading-message">Loading resources...</div>;

  return (
    <div className="resources-page">
      <h1>Student Resource Library</h1>
      <div className="filters-container">
        <select name="subject" value={filters.subject} onChange={handleFilterChange}>
          <option>Subject</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Math</option>
        </select>
        <select name="target_class" value={filters.target_class} onChange={handleFilterChange}>
          <option>Class</option>
          <option>11th</option>
          <option>12th</option>
          <option>Dropper</option>
        </select>
        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
          <option>Difficulty</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="resources-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => <ResourceCard key={res.id} resource={res} />)
        ) : (
          <p>No resources match your criteria.</p>
        )}
      </div>
    </div>
  );
}