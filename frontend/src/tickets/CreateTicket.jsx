import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Alert, Box, Button, FormControl, FormLabel, Menu,
  MenuItem,
  Modal, Snackbar, TextField, Typography
} from '@mui/material';
import { selectBoardColumns } from '../boards/data/selectors';
import { RequestStatus } from '../constant';
import { selectTicketRequestStatus } from './data/selectors';
import { setTicketRequestStatus } from './data/slices';
import { createNewTicket } from './data/thunks';

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
    
const CreateTicket = ({ open, setOpened }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [anchorElement, setAnchorElement] = useState({});
  const [menuOpened, setMenuOpened] = useState({});
  const requestName = 'createTicket';
  const newTicketStatus = useSelector(selectTicketRequestStatus(requestName)).status;
  const columnsList = useSelector(selectBoardColumns(boardId));
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    columnName: columnsList[0] || ' ',
  });
  
  useEffect(() => {
    if (![RequestStatus.INITIAL, RequestStatus.IN_PROGRESS].includes(newTicketStatus)) {
      setSnackBarOpen(true);
    }
    if (newTicketStatus === RequestStatus.SUCCESSFUL) {
      setOpened(false);
      setFormData({name: '', description: '', columnName: columnsList[0] || ' '});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicketStatus])

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

  const onCloseMenuBar = (fieldName) => {
    setMenuOpened({ ...menuOpened, [fieldName]: false });
    setAnchorElement({ ...anchorElement, [fieldName]: null });
  };

  const onClickOpenMenu = (event, fieldName) => {
    const anchorData = Object.keys(anchorElement).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});
    anchorData[fieldName] = event.target;
    setAnchorElement(anchorData);
    const openedData = Object.keys(menuOpened).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    openedData[fieldName] = true;
    setMenuOpened(openedData)
  };
  
  const onSubmitCreateTicketForm = (event) => {
    event.preventDefault();
    dispatch(createNewTicket(boardId, formData.title, formData.description, formData.columnName));
  };

  const onSelectMenuItem = (fieldName, columnName) => {
    setFormData({ ...formData, [fieldName]: columnName });
    setMenuOpened({ ...menuOpened, [fieldName]: false });
  };

  const onCloseSnackBar = () => {
    setSnackBarOpen(false);
    dispatch(setTicketRequestStatus({ name: requestName, status: RequestStatus.INITIAL }));
  };

  const fields = [
    { name: "title", label: "Title", type: "text", inputProps: {maxLength: 500, required: true} },
    { name: "columnName", label: "Column", type: "menu" },
    { name: "description", label: "Description", type: "text", props: {multiline: true, rows: 4, maxRows: 8} },
  ];
  return (
    <>
      <Modal
        open={Boolean(open)}
        onClose={() => setOpened(false)}
      >  
        <Box sx={style} className='p-2r pb-3r hide-scrollbar overflow-y-scroll'>
          <Box className='d-flex py-0 mx-0'>
            <Button onClick={() => setOpened(false)} className='ml-auto mr-0 p-0 color-red'>&#x2716;</Button>
          </Box>
          <Box className="d-flex">
            <Typography variant="h5" className="mx-auto">Create a New Ticket</Typography>
          </Box>
          <form onSubmit={onSubmitCreateTicketForm}>
            {
              fields.map((field, idx) => (
                <div className='mb-1r' key={`${field.name}-${idx}`}>
                  <FormControl className='d-flex'>
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    {
                      field.type === "menu"
                      ? (
                        <>
                          <Button
                            className='d-block text-align-start px-1r text-transform-none'
                            sx={{
                              border: "1px solid rgba(0, 0, 0, 0.23)",
                              color: "rgba(0, 0, 0, 0.87)",
                              "&:hover": {
                                borderColor: "black",
                              },
                              "&:focus": {
                                borderColor: "#3f51b5",
                                outline: "none",
                              },
                            }}
                            onClick={(event) => onClickOpenMenu(event, field.name)}
                          >
                            {formData[field.name]}
                          </Button>
                          <Menu
                            anchorEl={anchorElement[field.name]}
                            onClose={() => onCloseMenuBar(field.name)}
                            disableScrollLock
                            open={Boolean(menuOpened[field.name])}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            PaperProps={{
                              sx: {
                                width: anchorElement[field.name] ? anchorElement[field.name].offsetWidth : undefined,
                              },
                            }}
                          >
                            {
                              columnsList.map((columnName, cIdx) => (
                                <MenuItem
                                  key={`${cIdx}-${field.name}-${columnName}`}
                                  onClick={() => onSelectMenuItem(field.name, columnName)}
                                  className='flex-grow-1'
                                >
                                  {columnName}
                                </MenuItem>
                              ))
                            }
                          </Menu>
                        </>
                      )
                      : (
                        <TextField
                          name={field.name}
                          type={field.type}
                          value={formData[field.name]}
                          size="small"
                          onChange={handleChange}
                          error={false}
                          disabled={false}
                          fullWidth
                          inputProps={field.inputProps}
                          {...field.props}
                        />
                      )
                    }
                    <br />
                  </FormControl>
                </div>
                )
              )
            }
            <Button
              type="submit"
              disabled={newTicketStatus === RequestStatus.IN_PROGRESS}
              variant="contained"
              className='w-100 mt-2r'
            >
              Create Ticket
            </Button>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={onCloseSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={newTicketStatus === RequestStatus.SUCCESSFUL ? "success" : "error"}
        >
          {
            newTicketStatus === RequestStatus.SUCCESSFUL
              ? "Ticket created successfully"
              : "Error creating ticket"
          }
        </Alert>
      </Snackbar>
    </>
  )
}

export default CreateTicket;
