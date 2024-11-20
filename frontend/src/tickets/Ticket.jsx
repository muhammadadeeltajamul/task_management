import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Menu, MenuItem, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicket } from './data/selectors';
import { selectBoard, selectBoardApiStatus, selectBoardMembers } from '../boards/data/selectors';
import EditableTextField from '../components/EditableTextField';
import { fetchUpdateTicket } from './data/thunks';
import { fetchMembersList } from '../boards/data/thunks';
import { AccessLevel, RequestStatus } from '../constant';

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
  const [menuData, setMenuData] = useState({
    assignedTo: {anchor: null, opened: false},
    columnName: {anchor: null, opened: false},
  });

  useEffect(() => {
    if ([RequestStatus.INITIAL, RequestStatus.DENIED, RequestStatus.FAILED].includes(memberStatus)) {
      dispatch(fetchMembersList(boardId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStatus])

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
    dispatch(fetchUpdateTicket(ticketId, key, newText));
    onClickClose();
  }

  if (ticket == null) {
    return null;
  }

  return (
    <div>
      <Modal open onClose={goToBoard} className='py-0'>
        <Box sx={style} className='p-2r'>
          <Box className='d-flex py-0 mx-0'>
            <Button className='ml-auto mr-0 p-0 color-red' onClick={goToBoard}>&#x2716;</Button>
          </Box>
          <Box className='d-flex flex-column px-1r'>
            <EditableTextField
              value={ticket.title}
              onSave={(value) => onTicketAttributeChange(value, 'title')}
              textProps={{ variant: 'h5', className: 'my-auto text-lines-1 border-black border-2px font-weight-700' }}
            />
            <EditableTextField
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
        </Box>
      </Modal>
    </div>
  )
}

export default Ticket;
