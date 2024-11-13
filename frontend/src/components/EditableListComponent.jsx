import React, { useRef, useState } from 'react';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReorderIcon from '@mui/icons-material/Reorder';

const EditableListComponent = ({ value, onChange=(e)=>{} }) => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([...value]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedStyle, setDraggedStyle] = useState({});
  const boxRef = useRef(null);

  const createEventObject = (eventType, value) => ({
    eventType,
    value,
  });

  const onClickRemove = (value) => {
    const newItems = items.filter((item) => item !== value);
    setItems(newItems);
    onChange(createEventObject("remove", newItems));
  };

  const onClickAdd = () => {
    const newItems = [...items, text];
    setItems(newItems);
    onChange(createEventObject("add", newItems));
    setText("");
  }

  const handleDragStart = (e, index) => {
    setDraggedStyle({
      zIndex: 100,
    });
    setDraggedIndex(index);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'move';
    setDraggedStyle({});
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(index, 0, draggedItem);
    setItems(updatedItems);
    setDraggedIndex(null);
    onChange(createEventObject("reorder", updatedItems));
  };

  return (
    <Box ref={boxRef} className='w-100 p-1r'>
      <Box className='position-relative'>
        {
          items.map((elem, index) => (
            <Box
              key={`${index}-${elem}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={() => setDraggedIndex(null)}
              className="d-flex align-items-center px-1r"
              sx={{
                backgroundColor: index % 2 === 0 ? '#ece4f0' : '#e5f7f0',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '8px',
                cursor: 'move',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: draggedIndex === index ? 'scale(1.05)' : 'scale(1)',
                ...( draggedIndex === index ? draggedStyle : {} ),
              }}
            >
              <Avatar className="bg-transparent color-black"><ReorderIcon /></Avatar>
              <Typography>{elem}</Typography>
              <Avatar
                className="bg-transparent color-red ml-auto mr-0"
                style={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
                onClick={() => onClickRemove(elem)}
              >
                <RemoveIcon />
              </Avatar>
            </Box>
          ))
        }
      </Box>
      <Box className="d-flex align-items-center w-100 mb-4r mt-1r">
        <TextField
          className="w-100"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            flexGrow: 1,
            marginRight: '0.5rem',
          }}
        />
        <Avatar
          className="bg-transparent color-green my-auto mx-1r"
          style={{
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
          onClick={onClickAdd}
        >
          <AddIcon />
        </Avatar>
      </Box>
    </Box>
  );
}

export default EditableListComponent;
