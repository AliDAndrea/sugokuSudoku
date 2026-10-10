# Note from a36d
To run the project, run:
npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Native apps and Sudo purchases

The Vite app can be wrapped for iOS and Android with Capacitor. The app identifier in `capacitor.config.ts` is a placeholder; replace it with the identifier registered in both app stores before creating store products or shipping builds.

```sh
npm install
npm run build
npx cap add ios
npx cap add android
npm run cap:sync
npm run cap:open:ios
npm run cap:open:android
```

Create a `.env` file from `.env.example` and configure a Supabase project. Apply the migration in `supabase/migrations` and deploy the `revenuecat-webhook` Edge Function. Configure email/password authentication in Supabase and set its allowed redirect URLs for the app. Supabase-backed accounts sign up with username, email, and password; accounts stored in the old local `src/user.js` file are not automatically migrated. Set the public RevenueCat SDK keys for each platform in the app environment before building.

Create consumable in-app products in App Store Connect and Google Play Console using these product identifiers:

| Product ID | Sudo |
| --- | ---: |
| `sugoku_sudo_100` | 100 |
| `sugoku_sudo_500` | 500 |
| `sugoku_sudo_1000` | 1,000 |
| `sugoku_sudo_2500` | 2,500 |
| `sugoku_sudo_10000` | 10,000 |

Connect those products to the RevenueCat apps, then enable HMAC signing for the RevenueCat webhook and point it at `https://<project-ref>.supabase.co/functions/v1/revenuecat-webhook`. Set the signing secret as the Supabase function secret `REVENUECAT_WEBHOOK_HMAC_SECRET`; also set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as function secrets. Do not add server secrets to the Vite environment. The webhook verifies the signature and credits each store transaction once; the client never credits purchased Sudo itself.

RevenueCat webhooks require a plan that includes webhook integrations. Create and test the store products as consumable/non-subscription products, and test purchases with the platform sandbox before release.

Store prices are retrieved from the active device's store and shown in its local currency. Paid Sudo bundles are disabled on the web and remain unavailable until Supabase, RevenueCat, and the platform store products are configured.

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
