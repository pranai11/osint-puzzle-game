
export interface Question {
  id: number;
  text: string;
  answer: string;
}

export interface Level {
  id: number;
  title: string;
  scenario: string;
  imageUrls: string[];
  questions: Question[];
  hints: string[];
}

export enum ToolType {
  ReverseImageSearch = 'Reverse Image Search',
  ExifAnalyzer = 'EXIF Analyzer',
  MapTriangulator = 'Map Triangulator',
}
