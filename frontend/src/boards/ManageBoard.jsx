import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Modal, Typography } from '@mui/material';
import EditableTextField from '../components/EditableTextField';
import EditableListComponent from '../components/EditableListComponent';
import { selectBoard } from './data/selectors';
import { patchBoard } from './data/thunks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  maxHeight: '70vh',
  width: '70vw',
  p: 4,
  padding: '1rem',
  boxShadow: 24,
  borderRadius: 2,
};
    
const ManageBoard = ({ boardId, open, setOpened }) => {
  const board = useSelector(selectBoard(boardId));
  const dispatch = useDispatch();

  const onSaveField = (fieldName, value) => {
    dispatch(patchBoard(board.id, fieldName, value));
  };
  return (
    <>
      <Modal
        open={Boolean(open)}
        onClose={() => setOpened(false)}
      >
        <Box sx={style} className="overflow-y-auto hide-scrollbar pt-0">
          <Box className='d-flex position-sticky pt-2r pb-1r mx-0 top-0 bg-white z-index-1000'>
            <Button
              onClick={() => setOpened(false)}
              className='ml-auto mr-0 p-0 color-red'
            >
              &#x2716;
            </Button>
          </Box>
          <Box className='d-flex pt-1r mx-0'>
            <Typography variant="h4" className='mx-auto p-0'>Board Settings</Typography>
          </Box>
          <Box className="align-items-start mt-1r px-3r">
            {
              [
                { key: 'name', Component: EditableTextField, props: {onSave: (value) => onSaveField("name", value)} },
                { key: 'description', Component: EditableTextField, props: {onSave: (value) => onSaveField("description", value), inputProps: {multiline: true, rows: 4, maxRows: 8}} },
                { key: 'columns', Component: EditableListComponent, props: {onChange: (event) => onSaveField("columns", event.value)} }

              ].map((elem, index) => (
                <Box key={`${elem.key}-${index}`} className="mb-1r">
                  <Typography variant="h6" className='capitalize-text' gutterBottom>
                    {elem.key}
                  </Typography>
                  <elem.Component value={board[elem.key]} {...elem.props} />
                </Box>
              ))
            }
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ManageBoard;
