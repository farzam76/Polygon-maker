interface Vertex {
  x: number;
  y: number;
  id: string;
}

interface Polygon {
  id: string;
  sides: number;
  vertices: Vertex[];
}
