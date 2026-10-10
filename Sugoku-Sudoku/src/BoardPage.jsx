import { useEffect, useLayoutEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'
import { mainPen, penItems } from './PenItem.jsx'
import { useProfile } from './profileStore.js'
import { boardReducer, createBoardState, isRelatedCell } from './boardState.js'
import { loadBoard, saveBoard } from './boardStore.js'
import './BoardPage.css'

const boardPenStyle = {
  width: '158px',
  height: '40px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  maxWidth: 'none',
  transform: 'translate(-50%, -50%) rotate(270deg)',
}
export default function BoardPage() {
  const profile = useProfile()
  const selectedPen = penItems.find((pen) => pen.name === profile.selectedPen) || mainPen
  const [board, dispatch] = useReducer(boardReducer, profile, (currentUser) => createBoardState(loadBoard(currentUser)))
  const pen = { fontFamily: selectedPen.fontType, fontWeight: selectedPen.boldness === 'black' ? 900 : selectedPen.boldness }

  useEffect(() => { saveBoard(board.board) }, [board.board])

  useEffect(() => {
    const deselectOutside = (event) => {
      if (!event.target.closest?.('[data-board-cell], [data-board-number], [data-board-notes]')) {
        dispatch({ type: 'deselect' })
      }
    }
    const enterNumber = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'Escape') dispatch({ type: 'deselect' })
      if (/^[1-9]$/.test(event.key) && board.selected !== null) {
        event.preventDefault()
        dispatch({ type: 'enter', number: Number(event.key), user: profile, pen: { fontFamily: selectedPen.fontType, fontWeight: selectedPen.boldness === 'black' ? 900 : selectedPen.boldness } })
      }
    }
    document.addEventListener('pointerdown', deselectOutside)
    document.addEventListener('keydown', enterNumber)
    return () => {
      document.removeEventListener('pointerdown', deselectOutside)
      document.removeEventListener('keydown', enterNumber)
    }
  }, [board.selected, selectedPen.fontType, selectedPen.boldness, profile])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div style={{ backgroundColor: "#757575", width: "100%", minHeight: "883px", maxWidth: "404px", position: "relative", margin: "0 auto", flexShrink: 0, textAlign: "left", overflow: "hidden" }}>
      <img
        src={images.BgDesk}
        style={{ width: "1268px", height: "881px", position: "absolute", left: "-554px", top: "3px", maxWidth: "none" }}
        alt="bgDeco"
      />
      <img
        src={images.HintDisplay}
        style={{ width: "143px", height: "169px", position: "absolute", left: "254px", top: "5px", maxWidth: "none" }}
        alt="HintDisplay"
      />
      <Link to="/" aria-label="Return to home page" style={{ width: "67px", height: "69px", position: "absolute", left: "9px", top: "9px", maxWidth: "none" , display: 'block', zIndex: 10 }}>
        <img src={images.Mainmenubutton} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="MainMenuButton" />
      </Link>
      <img
        src={images.BgInvitePage}
        style={{ width: "340px", height: "160px", position: "absolute", left: "64px", top: "723px", maxWidth: "none" }}
        alt="inviteBGpage"
      />
      {Array.from({ length: board.board.size }, (_, index) => {
        const number = index + 1
        return (
          <button
            key={number}
            type="button"
            data-board-number={number}
            className="board-number"
            aria-label={`Enter ${number}`}
            onClick={() => dispatch({ type: 'enter', number, pen, user: profile })}
            style={{ left: `${[178, 242, 305][index % 3]}px`, top: `${(board.board.size === 6 ? [568, 633] : [536, 600, 665])[Math.floor(index / 3)]}px` }}
          >
            <img src={images[`Select${number}`]} alt="" />
          </button>
        )
      })}
      <img
        src={images.InviteButton}
        style={{ width: "131px", height: "76px", position: "absolute", left: "14px", top: "704px", maxWidth: "none" }}
        alt="InviteButton"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "10px", top: "113px", maxWidth: "none" }}
        alt="Life1"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "59px", top: "113px", maxWidth: "none" }}
        alt="Life2"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "108px", top: "113px", maxWidth: "none" }}
        alt="Life3"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "157px", top: "113px", maxWidth: "none" }}
        alt="Life4"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "206px", top: "113px", maxWidth: "none" }}
        alt="Life5"
      />
      <button type="button" data-board-notes className="board-note-toggle" aria-label="Note mode" aria-pressed={board.noteMode} onClick={() => dispatch({ type: 'toggle-notes' })}>
        <img src={images.Takenote} alt="" />
      </button>
      <div style={{ width: '43px', height: '162px', position: 'absolute', left: '30px', top: '539px' }}>
        <img src={selectedPen.image} style={boardPenStyle} alt={selectedPen.name} />
      </div>
      <div style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "143px", pointerEvents: "none" }}>
        <img
          src={board.board.size === 6 ? images.Board6x6 : images.Board9x9}
          style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt={`${board.board.size} by ${board.board.size} board`}
        />
        <div role="group" aria-label="Sudoku board">
          {board.board.cells.map((cell, index) => {
            const row = Math.floor(index / board.board.size)
            const column = index % board.board.size
            const selected = board.selected === index
            const sixColumn = [[38, 43], [88, 40], [134, 42], [189, 42], [237, 40], [284, 43]][column]
            const sixRow = [[43, 40], [89, 38], [139, 40], [185, 38], [236, 38], [280, 40]][row]
            return (
              <button
                key={index}
                type="button"
                data-board-cell={index}
                className="board-cell"
                data-selected={selected}
                data-related={isRelatedCell(index, board.selected, board.board.size)}
                aria-label={`Row ${row + 1}, column ${column + 1}${cell?.kind === 'number' ? `, ${cell.number}` : cell?.kind === 'note' ? `, notes ${cell.numbers.map((note) => note.number).join(', ')}` : ', empty'}`}
                aria-pressed={selected}
                onClick={() => dispatch({ type: 'select', index })}
                style={{
                  left: `${board.board.size === 6 ? sixColumn[0] / 366 * 100 : [33, 71, 109, 150, 188, 226, 265, 303, 341][column] / 404 * 100}%`,
                  width: board.board.size === 6 ? `${sixColumn[1] / 366 * 100}%` : undefined,
                  height: board.board.size === 6 ? `${sixRow[1] / 362 * 400}px` : undefined,
                  top: `${board.board.size === 6 ? sixRow[0] / 362 * 400 : [35, 71, 107, 147, 183, 219, 260, 296, 332][row]}px`,
                  ...(cell?.pen || pen),
                  color: cell?.color,
                }}
              >
                {cell?.kind === 'number' ? cell.number : cell?.kind === 'note' ? (
                  <span className="board-notes">
                    {cell.numbers.map((note) => <span key={note.number} style={{ gridColumn: (note.number - 1) % 3 + 1, gridRow: Math.floor((note.number - 1) / 3) + 1, color: note.color, ...note.pen }}>{note.number}</span>)}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "90px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "90px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "192px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "160px", top: "755px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "192px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "294px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "262px", top: "755px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "294px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "55px", height: "55px", position: "absolute", left: "5px", top: "799px" }}></div>
      <p style={{ color: "#000", fontFamily: "'Piedra', serif", fontSize: "60px", lineHeight: "1", width: "42px", height: "44px", position: "absolute", left: "273px", top: "95px" }}>
        #
      </p>
    </div>
  );
}



