interface Vertex {
  x: number;
  y: number;
  id: string;
}

interface Polygon {
  id: string;
  sides: number;
  vertices: Vertex[];
  position: {x: number, y: number};
}

interface User {
  id: string;
  username: string;
  password: string;
  projectIds: string[];

}

interface Project {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  polygons: Polygon[];
}

