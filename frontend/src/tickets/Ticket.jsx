import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Menu, MenuItem, Modal, Snackbar } from '@mui/material';
import { selectBoard, selectBoardApiStatus, selectBoardMembers } from '../boards/data/selectors';
import { fetchMembersList } from '../boards/data/thunks';
import Comments from '../comments/Comments';
import { selectCommentsAPIStatus } from '../comments/data/selectors';
import EditableTextField from '../components/EditableTextField';
import { selectTicket, selectTicketRequestStatus } from './data/selectors';
import { setTicketRequestStatus } from './data/slices';
import { fetchUpdateTicket } from './data/thunks';
import { AccessLevel, Actions, RequestStatus } from '../constant';
import { setCommentsAPIStatus } from '../comments/data/slices';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  height: '70vh',
  width: '70vw',
  p: 4,
  padding: '1rem',
  boxShadow: 24,
  borderRadius: 2,
};

const Ticket = ({ ticketId }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const updateTicketStatus = useSelector(selectTicketRequestStatus("updateTicket")).status;
  const memberStatus = useSelector(selectBoardApiStatus("membersListStatus")).status;
  const members = useSelector(selectBoardMembers(boardId));
  const visibleMembers = [
    "Unassigned",
    ...members?.filter((obj) => (
      obj.accessLevel !== AccessLevel.NO_ACCESS
    )).map(elem => (elem.user))
  ];
  const board = useSelector(selectBoard(boardId));
  const ticket = useSelector(selectTicket(ticketId));
  const createCommentStatus = useSelector(selectCommentsAPIStatus('createComment')).status;
  const [snackbarData, setSnackbarData] = useState({ text: '', opened: false, severity: 'success' });
  const [menuData, setMenuData] = useState({
    assignedTo: {anchor: null, opened: false},
    columnName: {anchor: null, opened: false},
  });
  const canUpdateTicket = board?.permissions?.includes(Actions.UPDATE_TICKET);

  useEffect(() => {
    if ([RequestStatus.INITIAL, RequestStatus.DENIED, RequestStatus.FAILED].includes(memberStatus)) {
      dispatch(fetchMembersList(boardId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStatus])

  useEffect(() => {
    if (updateTicketStatus === RequestStatus.SUCCESSFUL) {
      setSnackbarData({
        text: 'Updated successfully',
        opened: true,
        severity: 'success',
      });
      dispatch(setTicketRequestStatus({ name: 'updateTicket', status: RequestStatus.INITIAL }));
    } else if ([RequestStatus.DENIED, RequestStatus.FAILED].includes(updateTicketStatus)) {
      setSnackbarData({
        text: 'Error updating ticket data',
        opened: true,
        severity: 'error',
      });
      dispatch(setTicketRequestStatus({ name: 'updateTicket', status: RequestStatus.INITIAL }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTicketStatus]);

  useEffect(() => {
    if (createCommentStatus === RequestStatus.SUCCESSFUL) {
      setSnackbarData({
        severity: 'success',
        text: 'Comment added successfully',
        opened: true,
        resetState: 'createComment',
      });
    } else if ([RequestStatus.DENIED, RequestStatus.FAILED].includes(createCommentStatus)) {
      setSnackbarData({
        severity: 'error',
        text: 'Unable to add comment',
        opened: true,
        resetState: 'createComment',
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCommentStatus])

  const goToBoard = () => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  };

  const onClickClose = () => {
    setMenuData(
      Object.keys(menuData).reduce((acc, key) => {
        acc[key] = {...menuData[key], opened: false};
        return acc;
      }, {})
    );
  };

  const onClickOpen = (event, menuToOpen) => {
    setMenuData(
      Object.keys(menuData).reduce((acc, key) => {
        acc[key] = {
          anchor: key === menuToOpen ? event.target : null,
          opened: key === menuToOpen ? true : false,
        }
        return acc;
      }, {})
    );
  }

  const onTicketAttributeChange = (newText, key) => {
    if (key === "assigned_to" && newText === "Unassigned") { newText = null; }
    dispatch(fetchUpdateTicket(boardId, ticketId, key, newText));
    onClickClose();
  }

  const onCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, opened: false });
    if (snackbarData.resetState != null) {
      dispatch(setCommentsAPIStatus({ name: snackbarData.resetState, status: RequestStatus.INITIAL }));
    }
  }
  if (ticket == null) {
    return null;
  }

  return (
    <div>
      <Modal open onClose={goToBoard}>
        <Box sx={style} className='d-flex flex-column overflow-y-auto hide-scrollbar bg-white m-2r px-2r pt-2r pb-1r'>
          <Box className='d-flex py-0 mx-0 mt-1r'>
            <Button className='ml-auto mr-0 p-0 color-red' onClick={goToBoard}>&#x2716;</Button>
          </Box>
          <Box className='d-flex flex-column px-1r'>
            <EditableTextField
              editable={canUpdateTicket}
              value={ticket.title}
              onSave={(value) => onTicketAttributeChange(value, 'title')}
              textProps={{ variant: 'h5', className: 'my-auto text-lines-1 border-black border-2px font-weight-700' }}
            />
            <EditableTextField
              editable={canUpdateTicket}
              props={{ className: 'd-flex align-items-center mt-1r' }}
              value={ticket.description}
              onSave={(value) => onTicketAttributeChange(value, 'description')}
              textProps={{ className: 'my-auto font-weight-lighter' }}
            />
            <Box className="d-flex flex-row mt-1r">
              <Button
                sx={{ display: 'inline-flex', flex: 1, textTransform: 'none' }}
                onClick={(event) => onClickOpen(event, "assignedTo")}
              >
                { ticket.assignedTo ? ticket.assignedTo : 'Unassigned' }
              </Button>
              <Menu
                open={menuData.assignedTo.opened}
                anchorEl={menuData.assignedTo.anchor}
                onClose={onClickClose}
                disableScrollLock
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    width: menuData.assignedTo.anchor ? menuData.assignedTo.anchor.offsetWidth : undefined,
                  },
                }}
              >
                {
                  visibleMembers.map((userEmail) => (
                    <MenuItem
                      key={userEmail}
                      onClick={() => onTicketAttributeChange(userEmail, 'assigned_to')}
                    >
                      {userEmail}
                    </MenuItem>
                  ))
                }
              </Menu>
              <Button
                sx={{ display: 'inline-flex', flex: 1, textTransform: 'none' }}
                onClick={(event) => onClickOpen(event, "columnName")}
              >
                {ticket.columnName}
              </Button>
              <Menu
                open={menuData.columnName.opened}
                anchorEl={menuData.columnName.anchor}
                onClose={onClickClose}
                disableScrollLock
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    width: menuData.columnName.anchor ? menuData.columnName.anchor.offsetWidth : undefined,
                  },
                }}
              >
                {
                  board.columns.map((columnName) => (
                    <MenuItem
                      key={columnName}
                      onClick={() => onTicketAttributeChange(columnName, 'column_name')}
                    >
                      {columnName}
                    </MenuItem>
                  ))
                }
              </Menu>
            </Box>
          </Box>
          <Box className='d-flex flex-column p-1r mb-0 mt-auto bg-white'>
            <Comments ticketId={ticketId} />
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarData.opened}
        autoHideDuration={3000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbarData.severity}
        >
          {snackbarData.text}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Ticket;
