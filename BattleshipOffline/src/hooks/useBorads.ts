import { useState } from 'react';
import { createEmptyBoard } from '../functions/createEmptyBoard';
import type { Cell } from '../types/CellTypes';

export function useBorads(){
  const [board1, setBoard1] = useState<Cell[][]>(createEmptyBoard());
  const [board2, setBoard2] = useState<Cell[][]>(createEmptyBoard());
  const [board3, setBoard3] = useState<Cell[][]>(createEmptyBoard());
  const [board4, setBoard4] = useState<Cell[][]>(createEmptyBoard());

  return{
    board1,
    board2,
    board3,
    board4,
    setBoard1,
    setBoard2,
    setBoard3,
    setBoard4,
  }
}