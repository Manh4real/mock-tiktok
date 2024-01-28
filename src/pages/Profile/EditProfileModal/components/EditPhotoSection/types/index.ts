// types
export interface Edited {
  url: string;
  file: File;
}

export interface Props {
  imageUrl: string;
  reset: () => void;
  cancelEditing: () => void;
  setEdited: React.Dispatch<React.SetStateAction<Edited>>;
}

export interface Position {
  x: number;
  y: number;
}
export interface Rect {
  top: number;
  left: number;
}
export interface InitialRect extends Rect {
  width: number;
  height: number;
}
export interface Transform extends Position, Rect {
  scale: number;
}
