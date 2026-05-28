# SpaceX Explorer

Angular application for exploring past SpaceX launches using Angular Material and NgRx.

## Features

- Lists past SpaceX launches.
- Searches launches by mission name.
- Shows launch details at `/launch/:id`.
- Manages favorite launches with NgRx Store.
- Keeps favorites available while navigating between list and details pages.
- Uses NgRx Effects for API requests.
- Provides a production Docker setup with Nginx.

## Tech Stack

- Angular
- Angular Material
- NgRx Store
- NgRx Effects
- RxJS
- Docker
- Nginx

## API

The application uses the public SpaceX API:

```text
https://api.spacexdata.com/v4/launches/past
https://api.spacexdata.com/v4/launches/{id}
```

## Requirements

- Node.js
- npm
- Docker, optional for containerized execution

## Install

```bash
npm install
```

## Run Locally

```bash
npm start
```

Open the application at:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
dist/spaceX_kata/browser
```

## Test

```bash
npm test -- --watch=false
```

## Run With Docker

Build the Docker image:

```bash
docker build -t spacex-explorer .
```

Run the container:

```bash
docker run --rm --name spacex-explorer -p 8080:80 spacex-explorer
```

Open the application at:

```text
http://localhost:8080
```

## Project Structure

```text
src/app/components
src/app/model
src/app/services
src/app/state
```

- `components`: standalone Angular components for list and details pages.
- `model`: TypeScript interfaces used by the application.
- `services`: SpaceX API access.
- `state`: NgRx actions, reducer, selectors, and effects.

## Production Notes

- The list and details pages are lazy-loaded through Angular routes.
- The Docker image uses a multi-stage build.
- Nginx serves the compiled Angular app and redirects SPA routes to `index.html`.
