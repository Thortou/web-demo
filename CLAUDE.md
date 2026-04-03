# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript ERP demo application using Vite, Pinia, and Ant Design Vue. The application follows a modular Clean Architecture pattern with dependency injection.

**Tech Stack:**
- Vue 3 with Composition API (`<script setup>`)
- TypeScript
- Vite
- Pinia (state management)
- Ant Design Vue + Ant Design
- Tsyringe (dependency injection)
- VeeValidate + Yup (form validation)
- Tailwind CSS + SCSS
- pnpm (package manager)

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production (includes TypeScript compilation with vue-tsc)
pnpm build

# Preview production build
pnpm preview
```

## Architecture

### Module Structure

Each feature module follows Clean Architecture principles with these layers:

```
src/modules/{module-name}/
├── components/          # Module-specific Vue components
├── entity/             # Data entities and types (core business objects)
├── interface/          # API interface contracts
├── repository/         # Data access layer (implements interfaces)
├── router/             # Module routes
├── services/           # Business logic layer (uses dependency injection)
├── store/              # Pinia stores (state management)
├── views/              # Page components
└── schema/             # Validation schemas (Yup)
```

### Data Flow

```
View Component → Pinia Store → Service → Repository → API/DataSource
```

1. **View**: User interactions trigger store actions
2. **Store**: Manages state and calls services
3. **Service**: Contains business logic, injected via Tsyringe
4. **Repository**: Implements data access interface

### Dependency Injection Pattern

Services use Tsyringe for constructor injection:

```typescript
@injectable()
export class SomeService {
  constructor(
    @inject(SomeRepository) private _api: SomeInterface
  ) {}
}
```

In stores, resolve services from the DI container:
```typescript
import { container } from "tsyringe";
const service = container.resolve<SomeService>(SomeService);
```

### Common Interfaces

Located in `src/common/`:

- **IGState**`: Standard state shape with `data`, `isLoading`, `btnLoading`, `error`
- **IGPaginate**`: Pagination parameters (`page`, `limit`, `filter`)
- **IGPaginated**`: Paginated response with `props` array and `total` count
- **IResponse**`: Standard API response wrapper with `data`, `status`, `message`

### State Management Pattern

Pinia stores follow a consistent pattern using the Composition API style:

```typescript
export const SomeStore = defineStore("some-store", () => {
  const service = container.resolve<SomeService>(SomeService);

  const state = reactive<IGState<DataType>>({
    data: initialData,
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<IGPaginate<FilterType>>({
    page: 1,
    limit: 10,
    filter: {},
  });

  async function getAll() {
    state.isLoading = true;
    const results = await service.getAll(setStateFilter);
    // handle results
    state.isLoading = false;
  }

  return { state, setStateFilter, getAll, ... };
});
```

## Adding New Modules

When creating a new module, follow the department module structure as a template:

1. Create entity in `entity/` with type definitions and `FilterType`
2. Create interface in `interface/` defining CRUD operations
3. Create repository in `repository/` implementing the interface
4. Create service in `services/` with `@injectable()` decorator
5. Create Pinia store in `store/`
6. Create views and components in `views/` and `components/`
7. Add routes in `router/`
8. Create validation schema in `schema/` if using forms

## Layout System

- **Admin Layout**: Fixed sidebar with collapsible navigation, top navbar (for admin pages)
- **Website Layout**: Simple layout for public pages

Layouts are in `src/components/layouts/`.

## Current Implementation Notes

- The repository layer currently uses mock data (in-memory arrays)
- Ready for real API integration by updating repository implementations
- The app includes Lao language support (vue-i18n configured)

## Deployment

Configured for Vercel deployment via `vercel.json`:
- Build command: `pnpm run build`
- Output directory: `dist`
- Framework: Vite
