# Pepe App (Nuxt 4)

Проект на Nuxt 4 с Tailwind CSS, PrimeVue и Vue Query.

## Требования

- Node.js 20+
- Yarn / npm / pnpm

## Установка

```bash
yarn install
```

## Разработка

```bash
yarn dev
```

Приложение будет доступно по адресу http://localhost:8080

## Сборка

```bash
yarn build
```

## Preview (production build)

```bash
yarn preview
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```
NUXT_PUBLIC_BACKEND_URL=https://jsonplaceholder.typicode.com
```

## Структура проекта

- `app.vue` — корневой компонент
- `layouts/` — layouts (default, login)
- `pages/` — file-based routing
- `components/` — Vue компоненты (auto-import)
- `composables/` — composables (auto-import)
- `plugins/` — плагины (Vue Query)
- `assets/` — стили, изображения
- `public/` — статические файлы (favicon и т.д.)
- `types/` — TypeScript типы
