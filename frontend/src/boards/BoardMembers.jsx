import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Avatar, Box, Button, Menu, MenuItem,
  Modal, Snackbar, TextField, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AccessLevel, Actions, RequestStatus } from '../constant';
import { selectBoard, selectBoardApiStatus, selectBoardMembers } from './data/selectors';
import { fetchMembersList, updateUserBoardAccess } from './data/thunks';

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

const BoardMembers = ({ boardId, open, setOpened }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard(boardId));
  const members = useSelector(selectBoardMembers(boardId));
  const accessStatusName = "updateBoardAccessStatus";
  const updateAccessStatus = useSelector(selectBoardApiStatus(accessStatusName)).status;
  const [menuStates, setMenuStates] = useState({'menu-add-new': null});
  const [usernameText, setUsernameText] = useState('');
  const [addNewUserPermission, setAddNewUserPermission] = useState('VIEW_ONLY');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const canUpdateMembers = board?.permissions?.includes(Actions.UPDATE_MEMBERS);
  const TextComponent = canUpdateMembers ? Button : Typography

  useEffect(() => {
    if (open) {
      dispatch(fetchMembersList(boardId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, boardId]);

  useEffect(() => {
    if (![RequestStatus.INITIAL, RequestStatus.IN_PROGRESS].includes(updateAccessStatus)) {
      setSnackBarOpen(true);
    }
  }, [updateAccessStatus])
  const handleClick = (id, event) => {
    setMenuStates((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id) => {
    setMenuStates((prev) => ({ ...prev, [id]: null }));
  };

  const onClickMenuItem = async (user, value) => {
    await dispatch(updateUserBoardAccess(boardId, user, AccessLevel[value]));
    handleClose(user);
    setSnackBarOpen(true);
  };

  const onChangeNewUserPermission = (value) => {
    setAddNewUserPermission(value);
    handleClose('menu-add-new');
  }

  const onClickAddNewPermission = async () => {
    await dispatch(updateUserBoardAccess(boardId, usernameText, AccessLevel[addNewUserPermission]));
    setUsernameText("");
  }
  return (
    <>
      <Modal
        open={Boolean(open)}
        onClose={() => setOpened(false)}
      >
        <Box sx={style} className="overflow-y-auto hide-scrollbar pt-0 pb-4r">
          <Box className='d-flex position-sticky pt-2r pb-1r mx-0 top-0 bg-white z-index-1000'>
            <Button
              onClick={() => setOpened(false)}
              className='ml-auto mr-0 p-0 color-red'
            >
              &#x2716;
            </Button>
          </Box>
          <Box className='d-flex pt-1r mx-0'>
            <Typography variant="h4" className='mx-auto p-0'>Members</Typography>
          </Box>
          <Box className="align-items-start mt-1r px-3r">
            {
              members?.map((element, index) => (
                <Box
                  className='d-flex align-items-center' key={`${element.id}-${index}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#ece4f0' : '#e5f7f0',
                    padding: canUpdateMembers ? '0.5rem' : '0.5rem 1.5rem 0.5rem 0.5rem',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'move',
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                  }}
                >
                  <Box className='flex-grow-1 px-1r py-p5r'>
                    <Typography>{element.user}</Typography>
                  </Box>
                  <Box>
                    <TextComponent
                      aria-controls={`menu-${element.user}`}
                      sx={{ textTransform: 'uppercase' }}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(element.user, event)}
                    >
                      {element.accessLevel}
                    </TextComponent>
                    {
                      canUpdateMembers && (
                        <Menu
                          id={`menu-${element.user}`}
                          anchorEl={menuStates[element.user]}
                          open={Boolean(menuStates[element.user])}
                          onClose={() => handleClose(element.user)}
                        >
                          {
                            Object.keys(AccessLevel).map((key, idx) => (
                              <MenuItem
                                key={`${element.user}-${index}-${idx}`}
                                onClick={() => onClickMenuItem(element.user, key)}
                              >
                                {key}
                              </MenuItem>
                            ))
                          }
                        </Menu>  
                      )
                    }
                  </Box>
                </Box>
              ))
            }
            {
              canUpdateMembers && (
                <Box className='d-flex'>
                <TextField
                  className="w-100 mr-1r"
                  value={usernameText}
                  onChange={(e) => setUsernameText(e.target.value)}
                  sx={{
                    flexGrow: 1,
                    marginRight: '0.5rem',
                  }}
                />
                <Button
                  aria-controls='menu-add-new'
                  aria-haspopup="true"
                  className='px-1r ml-1r'
                  onClick={(event) => handleClick('menu-add-new', event)}
                >
                  {addNewUserPermission}
                </Button>
                <Menu
                  id='menu-add-new'
                  anchorEl={menuStates['menu-add-new']}
                  open={Boolean(menuStates['menu-add-new'])}
                  onClose={() => handleClose('menu-add-new')}
                >
                  {
                    Object.keys(AccessLevel).map((key, idx) => (
                      <MenuItem
                        key={`menu-add-new-${idx}`}
                        onClick={() => onChangeNewUserPermission(key)}
                      >
                        {key}
                      </MenuItem>
                    ))
                  }
                </Menu>
                <Avatar
                  className="bg-transparent color-green my-auto mx-1r"
                  onClick={onClickAddNewPermission}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                >
                  <AddIcon />
                </Avatar>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackBarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={updateAccessStatus === RequestStatus.SUCCESSFUL ? "success" : "error"}
        >
          {
            updateAccessStatus === RequestStatus.SUCCESSFUL
            ? "Updated access"
            : "Error updating access"
          }
        </Alert>
      </Snackbar>
    </>
  )
}

export default BoardMembers;
