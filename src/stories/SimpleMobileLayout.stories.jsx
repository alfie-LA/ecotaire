import React from 'react';

export default {
  title: 'Eco-Solitaire/SimpleMobileLayout',
  parameters: {
    layout: 'fullscreen',
  },
};

// Mobile portrait layout
export const MobilePortrait = {
  render: () => {
    return (
      <div className="w-[320px] h-[568px] mx-auto bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Mobile Portrait Layout</h2>
        
        {/* Score Section */}
        <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded mb-4">
          <div className="text-center">
            <div className="text-lg font-bold">125</div>
            <div className="text-xs">Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">🏆 250</div>
            <div className="text-xs">High</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">17</div>
            <div className="text-xs">Moves</div>
          </div>
        </div>
        
        {/* Draw/Discard */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-[60px] h-[40px] bg-white border border-gray-400 rounded flex items-center justify-center">
            Draw
          </div>
          <div className="w-[60px] h-[40px] bg-white border border-gray-400 rounded flex items-center justify-center">
            Discard
          </div>
        </div>
        
        {/* Game Columns */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(col => (
            <div key={col} className="w-full h-[150px] bg-white/30 border border-gray-400 rounded flex items-center justify-center">
              Col {col}
            </div>
          ))}
        </div>
        
        {/* EcoZones */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {['🦁', '🐦', '🐟', '🐸', '🦎'].map((icon, i) => (
            <div key={i} className="w-full h-[120px] bg-white/30 border border-gray-400 rounded flex flex-col items-center justify-center">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-xs">Zone {i+1}</div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-base">📘</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">🔄</button>
        </div>
      </div>
    );
  }
};

// Mobile landscape layout
export const MobileLandscape = {
  render: () => {
    return (
      <div className="w-[568px] h-[320px] mx-auto bg-gray-100 p-2 relative">
        <h2 className="text-lg font-bold mb-2 text-center">Mobile Landscape Layout</h2>
        
        {/* Score Section */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded">
          <div className="text-center mb-2">
            <div className="text-sm font-bold">125</div>
            <div className="text-xs">Score</div>
          </div>
          <div className="text-center mb-2">
            <div className="text-sm font-bold">🏆 250</div>
            <div className="text-xs">High</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">17</div>
            <div className="text-xs">Moves</div>
          </div>
        </div>
        
        <div className="ml-[60px] flex">
          {/* Draw/Discard */}
          <div className="mr-2">
            <div className="flex flex-col gap-2">
              <div className="w-[50px] h-[80px] bg-white border border-gray-400 rounded flex items-center justify-center">
                Draw
              </div>
              <div className="w-[50px] h-[80px] bg-white border border-gray-400 rounded flex items-center justify-center">
                Discard
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Game Columns */}
            <div className="grid grid-cols-5 gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(col => (
                <div key={col} className="w-full h-[120px] bg-white/30 border border-gray-400 rounded flex items-center justify-center">
                  Col {col}
                </div>
              ))}
            </div>
            
            {/* EcoZones */}
            <div className="grid grid-cols-5 gap-1">
              {['🦁', '🐦', '🐟', '🐸', '🦎'].map((icon, i) => (
                <div key={i} className="w-full h-[80px] bg-white/30 border border-gray-400 rounded flex flex-col items-center justify-center">
                  <div className="text-xl">{icon}</div>
                  <div className="text-xs">Zone {i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <button className="bg-blue-600 text-white px-2 py-1 rounded text-sm">📘</button>
          <button className="bg-green-600 text-white px-2 py-1 rounded text-sm">🔄</button>
        </div>
      </div>
    );
  }
};