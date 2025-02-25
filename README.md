### AgileInsights

Проект разработан за 48 часов

Torni – это инструмент, созданный для автоматизации анализа данных о спринтах, который помогает Agile-командам добиться большей прозрачности и контроля над рабочим процессом.

Функционал:

- Автоматический анализ данных спринтов с сравнением текущих показателей с историей.
- Уведомление о несоответствии ключевым метрикам.
- Настройка триггеров для оценки здоровья спринта.
- Детальное сравнение двух спринтов.
- Дашборд с динамикой бэклога, изменениями задач и загрузкой файлов.
- Защищённый доступ через авторизацию.

---

### Интерфейс:

#Регистрация

![1](https://github.com/user-attachments/assets/17ae976f-ff93-4e16-97e3-817c740d8c00)


#Импорт спринтов

![2](https://github.com/user-attachments/assets/8e5f07b4-66d3-4108-9fd2-1b24621e7ab8)


#Анализ нескольких спринтов

![3](https://github.com/user-attachments/assets/c721ae2b-0865-42af-9e45-f2db44713a2d)


#Общая оценка спринта

![4](https://github.com/user-attachments/assets/490ce2c1-2405-48a3-83aa-1aef6717dc68)


#Сравнение спринта со всеми спринтами

![5](https://github.com/user-attachments/assets/bfa7c23c-e741-4d9c-bf1e-bb750aafcc77)


#Настройка триггеров оценки «здоровья» спринта

![6](https://github.com/user-attachments/assets/be24bb5e-e8fd-4c2e-a32f-656facae481a)


---

Torni разработан на основе React с использованием TypeScript и архитектуры Feature-Sliced Design (FSD), что обеспечивает масштабируемость и поддерживаемость кода.

---

### Технологии

Проект построен с использованием следующих технологий:

- **React** — основа для создания интерфейса
- **Mobx** — для управления состоянием приложения
- **Vite** — инструмент для сборки проекта, обеспечивающий быструю разработку
- **TypeScript** — строго типизированный язык, повышающий надежность кода
- **Yarn** — пакетный менеджер
- **Chakra UI** — библиотека компонентов для создания UI
- **FSD (Feature-Sliced Design)** — архитектурный подход для организации кода

---

### Установка и запуск

#### Системные требования

- **Node.js** версии 14.x или выше
- **Yarn** версии 1.x или 2.x

#### Шаги для установки:

1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/your-username/torni.git
   cd torni
   ```

2. Установите зависимости с помощью Yarn:

   ```bash
   yarn install
   ```

3. Запуск приложения в режиме разработки:

   ```bash
   yarn dev
   ```

   После этого приложение будет доступно по адресу: [http://localhost:5173](http://localhost:5173)

4. Сборка проекта для продакшена:

   ```bash
   yarn build
   ```

5. Для запуска собранного приложения используйте команду:
   ```bash
   yarn preview
   ```

---

### Конфигурация Vite

Ваш проект использует **Vite** для сборки с конфигурацией, настроенной на использование React, TypeScript и поддержки путей через `tsconfig`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
    open: 'http://localhost:5173/',
    proxy: {
      '/api/v1': {
        //dev
        target: 'http://spb.pndsdn.tech:8080/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      pages: '/src/pages',
      widgets: '/src/widgets',
      features: '/src/features',
      entities: '/src/entities',
      shared: '/src/shared',
    },
  },
})
```

---

### Архитектура проекта (FSD)

В приложении используется архитектурный подход **Feature-Sliced Design** (FSD), который позволяет легко масштабировать и поддерживать проект. Структура проекта разделена на модули с четким разграничением по слоям:

1. **app** — Инициализация приложения и глобальные конфигурации (например, Redux и роутинг).
2. **pages** — Страницы, которые объединяют несколько виджетов и функциональных модулей.
3. **widgets** — Независимые UI-компоненты, которые могут объединять несколько фич или сущностей.
4. **features** — Бизнес-логика и функциональные элементы, такие как взаимодействие с API и управление состоянием.
5. **entities** — Модели и сущности, используемые в приложении (например, задачи, пользователи).
6. **shared** — Переиспользуемые элементы, такие как утилиты, типы, константы и базовые UI-компоненты.

Пример структуры файлов:

```bash
src/
├── app/             # Инициализация приложения
├── pages/           # Страницы
├── widgets/         # Виджеты (комплексные компоненты)
├── features/        # Фичи (логические блоки)
├── entities/        # Сущности (базовые модели и их логика)
├── shared/          # Общие модули и компоненты
```

---

### Настройка линтинга

В проекте используется ESLint для проверки кода на соответствие стандартам качества. Ниже приведена конфигурация ESLint:

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
)
```

Эта конфигурация:

- Поддерживает правила для TypeScript и React.
- Использует плагины для управления хуками и Fast Refresh.
- Игнорирует папку `dist`.

### Команды для линтинга

В нашем проекте определены следующие команды для линтинга:

- **ESLint** — проверка кода на ошибки и несоответствие стандартам.
- **Prettier** — форматирование кода.
- **TypeScript** — проверка типов.

### Скрипты в `package.json`

Ваш `package.json` также включает скрипты для сборки и разработки:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "yarn lint:type && yarn lint:eslint && yarn lint:prettier",
    "preview": "vite preview"
  }
}
```

1. **`dev`** — запуск приложения в режиме разработки.
2. **`build`** — сборка проекта для продакшена. Включает компиляцию TypeScript и сборку с Vite.
3. **`lint`** — последовательный запуск всех линтинговых проверок: для TypeScript, ESLint и Prettier.
4. **`preview`** — запуск предварительного просмотра собранного приложения.

### Инструкции по запуску линтинга

- Чтобы запустить проверку кода перед сборкой или в ходе разработки, используйте команду:

  ```bash
  yarn lint
  ```

- Для форматирования кода (если есть ошибки форматирования), используйте:
  ```bash
  yarn format
  ```

---
