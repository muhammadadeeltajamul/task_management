import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from './data/selectors';
import { useParams } from 'react-router-dom';
import { fetchBoard } from './data/thunks';

const BoardView = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectBoard(boardId));

  useEffect(() => {
    if (board == null) {
      dispatch(fetchBoard(boardId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (board == null) {
    return null;
  }
  return (
    <div>{board.name}</div>
  )
}

export default React.memo(BoardView);
