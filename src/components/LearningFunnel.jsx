import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { stages } from '../data/stages';
import { StageIcon } from './StageIcon';

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
    
    return stages.map(stage => ({
      ...stage,
      details: stage.details.filter(detail =>
        detail.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(stage => 
      stage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stage.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stage.details.length > 0
    );
  }, [searchQuery]);

  const getStageProgress = (stageName) => {
    const completedCount = completedTasks[stageName]?.length || 0;
    const totalTasks = stages.find(s => s.name === stageName).details.length;
    return Math.round((completedCount / totalTasks) * 100);
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pr-10 border rounded-lg"
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
                <ul>
                  {stage.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>
                      <Link to={detail.link} className="text-blue-600 hover:underline">
                        {detail.text}
                      </Link>
                    </li>
                  ))}
                </ul>
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
