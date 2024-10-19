import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@mui/material';
import BoardListElement from './BoardListElement';
import { selectBoardList } from './data/selectors';
import { fetchBoardsList } from './data/thunks';
import { setAppHeader } from '../components/data/slice';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoardList);
  dispatch(setAppHeader(true));

  useEffect(() => {
    dispatch(fetchBoardsList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <List className='mx-2r my-1r p-1r border-1px border-black border-solid'>
      {
        boards.map((board) => (
          <BoardListElement boardId={board.id} key={`board-${board.id}`} />
        ))    
      }
    </List>
  )
}

export default BoardList;
