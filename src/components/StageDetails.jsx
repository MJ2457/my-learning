import React from 'react';

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

export default StageDetails;
