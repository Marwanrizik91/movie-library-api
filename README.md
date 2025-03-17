Movie Library API

A NestJS-based API for browsing and searching movies using The Movie Database (TMDB) API.

## Features

- Browse popular movies
- Search for movies by title
- Filter movies by genre
- Paginated results

## Prerequisites

- Node.js
- npm or any package manager of your choice
- TMDB API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:

```
git clone <repository-url>
cd movie-library-api
```

## Install dependencies:

```
npm install
```

## Configuration

Create a .env file in the root directory with the following content:

```
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
```

## Running the Application

```
npm run start:dev
```
