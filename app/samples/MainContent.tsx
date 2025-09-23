import React from 'react'
import { Door } from "../Types";


interface MainContentProps {
  activePosition: number | null | string;
  currentType: string | null;
  doorResults: Door[];
  viewType: number;
  materials: string[];
  handleTypeClick: (e: any, door: Door) => void;
  handleDoorClick: (door: Door) => void;
}

const MainContent:  React.FC<MainContentProps>  = ({
  activePosition,
  currentType,
  doorResults,
  viewType,
  materials,
  handleTypeClick,
  handleDoorClick,
}) => {
  return (
    
          <div>
            <div>
              {/* Headings based on state */}
              {typeof activePosition === "number" && !currentType && (
                <h2 className="py-2 mb-4 font-semibold">
                  What kind of door are we going for?
                </h2>
              )}
              {currentType && (
                <h2 className="py-2 font-semibold">
                  So, we are going for {currentType} doors, hmm?
                </h2>
              )}

              {/* If type is selected, show doors grouped by material */}
              {currentType && (
                <div>
                  {materials.map((material, i: number) => {
                    const materialDoors = doorResults.filter(
                      (door: Door) => door.material === material
                    );
                    if (materialDoors.length) {
                      return (
                        <div key={i} className="mb-12">
                          {/* Material heading */}
                          <div className="mt-4 mb-4">
                            <h3 className="capitalize">{material}?</h3>
                            <div className="w-[90%] h-[1px] bg-gray-400/50 my-2"></div>
                          </div>

                          {/* Grid of doors for this material */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {materialDoors.map((door: Door, i: number) => (
                              <div
                                key={i}
                                onClick={() => handleDoorClick(door)}
                                className="relative shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 w-[15rem]"
                              >
                                <img
                                  src={door.image}
                                  alt={door.name}
                                  className="w-full h-[15rem] object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )}

              {/* If no type is selected, show the type selection grid */}
              {!currentType && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {doorResults.map((door: Door, index: number) => (
                    <div
                      key={index}
                      onClick={(e) => handleTypeClick(e, door)}
                      className="relative shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 w-[15rem]"
                    >
                      <img
                        src={door.image}
                        alt={door.name}
                        className="w-full h-[15rem] object-cover"
                      />
                      {viewType === 1 && (
                        <div className="p-2 absolute inset-0 top-auto bg-black/15 backdrop-blur-lg">
                          <h3 className="text-lg text-white font-medium capitalize">
                            {door.type} door
                          </h3>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        
  )
}

export default MainContent