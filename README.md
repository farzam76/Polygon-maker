# Polygon Maker

The Polygon Maker App allows users to create and customize polygons by specifying the vertices and sides of the shape. It provides an interactive interface for dragging vertices and adjusting the polygon's position within a scene.

## Tech Stack:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Redux-toolkit](https://redux-toolkit.js.org/)

## Features

- Create polygons with a customizable number of sides.
- Drag and drop vertices to shape the polygon interactively.
- Edit the number of sides for dynamic polygon adjustment.
- Simple JSON lookup User managemnt system
- User Specific workspace

- User-friendly interface with intuitive controls.

## What's not working :\(

- Dragging the vertex. to the left and top of the screen does not resize the SVG bounds
- Right and bottom bounds of the Scene are not working properly
- No mobile support as of now

## What's next :\)

- Adding more tests
- Adding stroybook

## Supported Browsers

anything that supports SVG and ES6 (Not IE)

## Getting Started

These instructions will help you set up and run the Polygon Maker App on your local machine.

### Prerequisites

- Node.js: Ensure that Node.js is installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/farzam76/polygon-maker-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd polygon-maker-app
   ```

3. Install the dependencies:

   ```bash
    yarn install
   ```

4. Run the app:

   ```bash
    yarn run dev
   ```
