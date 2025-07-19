
import React, { useState } from 'react';
import { Level, ToolType } from '../types';
import { generateToolOutput } from '../services/geminiService';
import { SearchIcon, FileTextIcon, MapIcon, LightbulbIcon, NotebookIcon, LoaderIcon } from './icons';

interface ToolsPanelProps {
  level: Level;
  onHintUsed: () => void;
  usedHintsCount: number;
}

const ToolButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; isActive: boolean; isLoading: boolean }> = ({ icon, label, onClick, isActive, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-cyan-600/20 text-cyan-400' : 'bg-gray-800 hover:bg-gray-700'
    } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    {isLoading && isActive ? <LoaderIcon className="h-5 w-5 mr-3 animate-spin" /> : <span className="h-5 w-5 mr-3">{icon}</span>}
    <span>{label}</span>
  </button>
);

const ToolsPanel: React.FC<ToolsPanelProps> = ({ level, onHintUsed, usedHintsCount }) => {
  const [activeTool, setActiveTool] = useState<ToolType | 'notebook' | 'hints' | null>(null);
  const [toolOutput, setToolOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notebookText, setNotebookText] = useState('');

  const handleToolClick = async (tool: ToolType) => {
    if (isLoading) return;
    setActiveTool(tool);
    setIsLoading(true);
    setToolOutput('');
    await generateToolOutput(tool, level, (chunk) => {
      setToolOutput(prev => prev + chunk);
    });
    setIsLoading(false);
  };

  const handleHintClick = () => {
    setActiveTool('hints');
    onHintUsed();
  };
  
  const handleNotebookClick = () => {
    setActiveTool('notebook');
  }

  const renderOutput = () => {
    if (isLoading && !toolOutput) {
        return <div className="flex justify-center items-center h-full"><LoaderIcon className="w-8 h-8 animate-spin text-cyan-400" /> <span className="ml-4">Analyzing...</span></div>;
    }
    
    switch (activeTool) {
      case 'notebook':
        return (
          <textarea
            className="w-full h-full bg-transparent p-4 text-gray-300 focus:outline-none resize-none font-mono"
            placeholder="Your investigation notes..."
            value={notebookText}
            onChange={(e) => setNotebookText(e.target.value)}
          />
        );
      case 'hints':
        return (
          <div className="p-4 prose prose-invert prose-sm">
            <h4 className="text-cyan-400">Hints Unlocked</h4>
            {level.hints.length > 0 ? (
                <ul className="list-disc list-inside">
                    {level.hints.slice(0, usedHintsCount).map((hint, index) => (
                        <li key={index}>{hint}</li>
                    ))}
                    {usedHintsCount === 0 && <li>Click the "Get Hint" button to reveal the first hint.</li>}
                </ul>
            ) : <p>No hints available for this level.</p>}
          </div>
        );
      default:
        return (
          <div className="p-4 prose prose-invert prose-sm max-w-none prose-pre:bg-gray-900/50 prose-pre:whitespace-pre-wrap whitespace-pre-wrap font-mono">
            {toolOutput}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-cyan-400">OSINT Toolkit</h3>
        <p className="text-sm text-gray-400">Select a tool to analyze evidence</p>
      </div>
      <div className="p-4 space-y-2 border-b border-gray-700">
        <ToolButton icon={<SearchIcon />} label={ToolType.ReverseImageSearch} onClick={() => handleToolClick(ToolType.ReverseImageSearch)} isActive={activeTool === ToolType.ReverseImageSearch} isLoading={isLoading}/>
        <ToolButton icon={<FileTextIcon />} label={ToolType.ExifAnalyzer} onClick={() => handleToolClick(ToolType.ExifAnalyzer)} isActive={activeTool === ToolType.ExifAnalyzer} isLoading={isLoading}/>
        <ToolButton icon={<MapIcon />} label={ToolType.MapTriangulator} onClick={() => handleToolClick(ToolType.MapTriangulator)} isActive={activeTool === ToolType.MapTriangulator} isLoading={isLoading}/>
      </div>
       <div className="p-4 space-y-2 border-b border-gray-700">
         <ToolButton icon={<NotebookIcon />} label="Notebook" onClick={handleNotebookClick} isActive={activeTool === 'notebook'} isLoading={isLoading}/>
         <button onClick={handleHintClick} className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${activeTool === 'hints' ? 'bg-cyan-600/20 text-cyan-400' : 'bg-gray-800 hover:bg-gray-700'}`}>
            <LightbulbIcon className="h-5 w-5 mr-3" />
            <span>Hints ({usedHintsCount}/{level.hints.length})</span>
        </button>
       </div>
      <div className="flex-grow bg-gray-900/70 rounded-b-lg overflow-y-auto min-h-[200px]">
        {activeTool && renderOutput()}
      </div>
    </div>
  );
};

export default ToolsPanel;
