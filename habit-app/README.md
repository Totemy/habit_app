# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Unit Testing

This project uses Vitest with a jsdom environment for unit tests.

- Run all tests once: `npm test`
- Run in watch mode while coding: `npm run test:watch`

Current coverage focus:

- `src/utils/habitHelper.ts`
- `src/composables/useHabitItems.ts`
- `src/composables/useHabitManager.ts`

The tests validate pure business logic (habit creation, progress logic, and habit manager state transitions) without mounting UI components.
