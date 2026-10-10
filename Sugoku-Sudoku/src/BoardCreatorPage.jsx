import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

const selectorGroups = [
  {
    id: 'size',
    label: 'Board size',
    options: [
      { id: '6x6', label: '6 by 6', left: 57, top: 189, width: 86 },
      { id: '9x9', label: '9 by 9', left: 57, top: 210, width: 86 },
    ],
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { id: 'easy', label: 'Easy', left: 182, top: 187, width: 94 },
      { id: 'normal', label: 'Normal', left: 182, top: 209, width: 116 },
      { id: 'hard', label: 'Hard', left: 182, top: 229, width: 86 },
      { id: 'expert', label: 'Expert', left: 182, top: 250, width: 111 },
      { id: 'impossible', label: 'Impossible', left: 182, top: 271, width: 128 },
    ],
  },
  {
    id: 'type',
    label: 'Puzzle type',
    options: [
      { id: 'classic', label: 'Classic', left: 74, top: 387, width: 105 },
      { id: 'chaos', label: 'Chaos', left: 74, top: 408, width: 105 },
      { id: 'killer', label: 'Killer', left: 74, top: 429, width: 105 },
    ],
  },
]

export default function BoardCreatorPage() {
  const [selections, setSelections] = useState({})

  return (
    <div style={{backgroundColor: '#fff', width: '100%', maxWidth: '390px', aspectRatio: '390 / 844', position: 'relative', overflow: 'hidden', margin: '0 auto',}}>

      <img
        src={images.BgDesk}
        style={{ width: '1268px', height: '881px', position: 'absolute', left: '-409px', top: '-1px' }}
        alt="BGDeco"
      />
      <img
        src={images.Board6x6}
        style={{ width: '366px', height: '362px', position: 'absolute', left: '18px', top: '482px' }}
        alt="Board6x6"
      />
      <img
        src={images.Board9x9}
        style={{ width: '366px', height: '362px', position: 'absolute', left: '18px', top: '482px' }}
        alt="Board9x9"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: '67px', height: '69px', position: 'absolute', left: '7px', top: '8px', display: 'block', zIndex: 10 }}
      >
        <img
          src={images.Mainmenubutton}
          style={{ width: '100%', height: '100%', maxWidth: 'none' }}
          alt="MainMenuButton"
        />
      </Link>
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '40px', width: '100%', height: '52px', position: 'absolute', left: '35px', top: '45px', letterSpacing: '0.08em' }}>
        Capacity 00/30
      </p>
      <div style={{ width: '100%', height: '555px', position: 'absolute', left: '0.5px', top: '108px' }}>
        <img
          src={images.CreateBoard}
          style={{ width: '100%', height: '555px', position: 'absolute', left: '0', top: '0', maxWidth: 'none' }}
          alt="Background"
        />
        {selectorGroups.map((group) => (
          <div key={group.id} role="group" aria-label={group.label}>
            {group.options.map((option) => {
              const isSelected = selections[group.id] === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-label={option.label}
                  aria-pressed={isSelected}
                  onClick={() => setSelections((current) => ({ ...current, [group.id]: option.id }))}
                  style={{ width: `${option.width}px`, height: '21px', position: 'absolute', left: `${option.left}px`, top: `${option.top}px`, padding: 0, border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', zIndex: 1 }}
                >
                  {isSelected && (
                    <>
                      <div aria-hidden="true" style={{ width: '12px', height: '12px', position: 'absolute', left: '3px', top: '4px', borderRadius: '50%', backgroundColor: '#000' }} />
                      <img
                        src={images.PencilCircleBorder}
                        alt=""
                        aria-hidden="true"
                        style={{ width: '14px', height: '14px', position: 'absolute', left: '2px', top: '3px', maxWidth: 'none', pointerEvents: 'none' }}
                      />
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      
        <Link to="/board" aria-label="Create board" style={{ width:'167px', height:'44px', position:'absolute', left:'216px', top:'367px', display: 'block' }} />

      </div>
    </div>
  );
}
