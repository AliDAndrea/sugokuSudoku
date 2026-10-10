# Note from a36d
To run the project, run:
npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Classic Sudoku

The board creator generates Classic puzzles in 6x6 (2x3 boxes) and 9x9 (3x3 boxes). Chaos and Killer generation are not implemented yet. Default selections are 9x9, Easy, Classic.

Generation runs in a Web Worker. The solver uses bitmask row/column/box constraints and minimum-remaining-values search. Randomized search constructs a solution, then shuffled clue removal accepts a removal only after proving the puzzle has exactly one solution. Solution counting stops at two solutions; a search exceeding its node budget is rejected, never treated as unique. Topology is cached and generation has a bounded attempt count.

Difficulty is an app-specific heuristic, not a certified human technique rating. Easy requires naked singles; Normal also permits hidden singles. Hard, Expert, and Impossible use decreasing clue targets and select the most demanding candidate from 24 attempts, using clue count, hidden singles, and constrained-search effort. Targets are 46/38/32/27/24 clues for 9x9 and 22/18/15/12/10 for 6x6. Uniqueness and the Easy/Normal technique restrictions take priority over hitting an exact clue count. Advanced categories can overlap in human difficulty, especially on 6x6. Impossible always has a valid unique solution.

Saved boards include the original fixed clues, solution, rating, participant colors, player entries/notes, shared mistake count, and completion timestamp. Existing saved boards retain their contents; reopening never regenerates a puzzle. Incorrect full-size entries use a life and leave the tile empty. Notes may contain any valid digit for the board size. Backspace/Delete clears a selected player entry or notes; fixed clues cannot be changed. Correctly filling every tile marks the board complete.

Run the generation, independent solver, gameplay, and persistence tests:

```sh
node --test src/boardState.test.js src/classicSudoku.test.js
```

Algorithm background: [Peter Norvig, Solving Every Sudoku Puzzle](https://www.norvig.com/sudoku.html).
