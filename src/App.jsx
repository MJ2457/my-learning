import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { stages } from './data/stages';
import { StageIcon } from './components/StageIcon';
import './Styles/global.css';

const StageDetails = ({ stage, completedTasks = [], onTaskToggle }) => (
  <div className="mt-2 p-3 bg-gray-100 rounded-lg">
    <p className="font-semibold mb-2">{stage.name}</p>
    <p className="mb-2">{stage.description}</p>
    <ul className="list-none pl-0">
      {stage.details.map((detail, index) => (
        <li key={index} className="mb-2 flex items-center">
          <input
            type="checkbox"
            checked={completedTasks.includes(index)}
            onChange={() => onTaskToggle(stage.name, index)}
            className="mr-2"
          />
          <a 
            href={detail.link} 
            className={`text-blue-600 hover:text-blue-800 hover:underline ${completedTasks.includes(index) ? 'line-through' : ''}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {detail.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

function LearningFunnel() {
  const [activeStage, setActiveStage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleStage = (index) => {
    setActiveStage(prevStage => prevStage === index ? null : index);
  };

  const toggleTask = (stageName, taskIndex) => {
    setCompletedTasks(prevState => {
      const newState = { ...prevState };
      if (!newState[stageName]) {
        newState[stageName] = [];
      }
      const taskSet = new Set(newState[stageName]);
      if (taskSet.has(taskIndex)) {
        taskSet.delete(taskIndex);
      } else {
        taskSet.add(taskIndex);
      }
      newState[stageName] = Array.from(taskSet);
      localStorage.setItem('learningProgress', JSON.stringify(newState));
      return newState;
    });
  };

  const filteredStages = useMemo(() => {
    if (!searchQuery) return stages;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return stages.map(stage => ({
      ...stage,
      details: stage.details.filter(detail =>
        detail.text.toLowerCase().includes(lowerCaseQuery) ||
        (detail.link && detail.link.toLowerCase().includes(lowerCaseQuery))
      )
    })).filter(stage => 
      stage.name.toLowerCase().includes(lowerCaseQuery) ||
      stage.description.toLowerCase().includes(lowerCaseQuery) ||
      stage.details.length > 0
    );
  }, [searchQuery]);

  const getStageProgress = (stageName) => {
    const completedCount = completedTasks[stageName]?.length || 0;
    const totalTasks = stages.find(s => s.name === stageName).details.length;
    return Math.round((completedCount / totalTasks) * 100);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setActiveStage(null); // Close any open stages when searching
  };

  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Learning Process Funnel</h2>
      <div className="w-full mb-4 relative">
        <input
          type="text"
          placeholder="Search topics or resources..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="funnel-container">
        {filteredStages.map((stage, index) => (
          <div key={index} className="funnel-stage">
            <div 
              className={`funnel-stage-content flex items-center justify-between text-white ${activeStage === index ? 'active' : ''}`}
              style={{ 
                '--darker-bg-color': darkenColor(stage.color, 30),
                backgroundColor: stage.color 
              }}
              onClick={() => toggleStage(index)}
            >
              <div className="flex items-center">
                <StageIcon icon={stage.icon} className="mr-2" size={20} />
                <span>{stage.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{getStageProgress(stage.name)}%</span>
                <ChevronRight size={20} className={activeStage === index ? "transform rotate-90" : ""} />
              </div>
            </div>
            {activeStage === index && (
              <div className="stage-details">
                <StageDetails 
                  stage={stage} 
                  completedTasks={completedTasks[stage.name] || []}
                  onTaskToggle={toggleTask}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredStages.length === 0 && (
        <p className="text-gray-500 mt-4">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default LearningFunnel;