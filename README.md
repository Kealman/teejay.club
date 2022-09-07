# https://teejay.club

## Структура проекта

- `apps/api` — бэкенд на [TypeScript](https://www.typescriptlang.org/) + [tRPC](https://trpc.io/) + [Prisma](https://www.prisma.io/);
- `apps/api/.env.example` — пример конфига с переменными окружения для бэкенда;
- `apps/web` — фронтенд + бэкенд (SSR) на [TypeScript](https://www.typescriptlang.org/) + [Next.js](https://nextjs.org/);
- `apps/web/.env.example` — пример конфига с переменными окружения для фронтенда;
- `packages/prisma-client` — [Prisma](https://www.prisma.io/);
- `packages/prisma-client/.env.example` — пример конфига с переменными окружения для [Prisma](https://www.prisma.io/);
- `packages/typescript-paths` — исправляет алиасы в `*.d.ts` файлах, т.к. `tsc` их не компилирует;
- `configs/eslint-config` — [ESLint](https://eslint.org/) конфиг для всего монорепозитория;
- `configs/tsconfig` — базовый [`tsconfig.json`](https://www.typescriptlang.org/tsconfig) для всех проектов.

## Скрипты

В качестве пакетного менеджера используется [`pnpm`](https://pnpm.io/).

Перед запуском скриптов нужно установить все зависимости командой `pnpm install` в любой папке с проектом.

Далее можно запускать скрипты из любой папки в проекте:

- `pnpm -w build` — соберёт все пакеты в правильном порядке;
- `pnpm -w lint` — запустит [ESLint](https://eslint.org/) на всём монорепозитории;
- `pnpm -w format` — запустит [Prettier](https://prettier.io/) на всём монорепозитории.
