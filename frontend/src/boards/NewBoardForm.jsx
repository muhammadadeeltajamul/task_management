import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Box, Button, FormControl, FormLabel, Modal, Snackbar,
  TextField, Typography,
} from '@mui/material';
import { selectNewBoardStatus } from './data/selectors';
import { createNewBoard } from './data/thunks';
import { RequestStatus } from '../constant';

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
  
const NewBoardForm = ({ open, setOpened }) => {
  const dispatch = useDispatch();
  const newBoardStatus = useSelector(selectNewBoardStatus);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updateData = {
      [name]: value,
    };
    setFormData({
      ...formData,
      ...updateData,
    })
  };

  const onSubmitCreateBoardForm = (event) => {
    event.preventDefault();
    dispatch(createNewBoard(formData.name, formData.description));
    setOpened(false);
    setFormData({name: '', description: ''});
  };

  useEffect(() => {
    if (![RequestStatus.INITIAL, RequestStatus.IN_PROGRESS].includes(newBoardStatus)) {
       setSnackBarOpen(true);
    }
  }, [newBoardStatus])

  const fields = [
    { name: "name", label: "Name", type: "text", inputProps: {maxLength: 500, required: true} },
    { name: "description", label: "Description", type: "text", props: {multiline: true, rows: 4, maxRows: 8} },
  ];
  
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpened(false)}
      >  
        <Box sx={style} className='p-2r hide-scrollbar overflow-y-scroll'>
          <Box className='d-flex py-0 mx-0'>
            <Button onClick={() => setOpened(false)} className='ml-auto mr-0 p-0 color-red'>&#x2716;</Button>
          </Box>
          <Box className="d-flex">
            <Typography variant="h5" className="mx-auto">Create a New Board</Typography>
          </Box>
          <form onSubmit={onSubmitCreateBoardForm}>
            {
              fields.map((field, idx) => (
                <div className='mb-1r' key={`${field.name}-${idx}`}>
                  <FormControl className='d-flex'>
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    <TextField
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      size="small"
                      onChange={handleChange}
                      error=''
                      disabled={false}
                      fullWidth
                      inputProps={field.inputProps}
                      {...field.props}
                    />
                    <br />
                  </FormControl>
                </div>
                )
              )
            }
            <Button type="submit" variant="contained" className='w-100 mt-2r'>Create Board</Button>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackBarOpen(false)}
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={newBoardStatus === RequestStatus.SUCCESSFUL ? "success" : "error"}
        >
          {
            newBoardStatus === RequestStatus.SUCCESSFUL
              ? "Board created successfully"
              : "Error creating board"
          }
        </Alert>
      </Snackbar>
    </>
  );
}

export default React.memo(NewBoardForm);
