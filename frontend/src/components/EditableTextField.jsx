import React, { useState } from 'react';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const EditableTextField = ({ value, onSave=(event) => {}, props={}, textProps={}, inputProps={}, editable=true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(value);

  const onChangeText = (event) => {
    setTextValue(event.target.value);
  };

  const onUpdateText = (event) => {
    onSave(textValue);
    setIsEditing(false);
  };

  const onClickEditIcon = () => {
    if (!editable) {
      return;
    }
    setIsEditing(true);
  }

  return (
    <>
      <Box className="d-flex align-items-center" {...props}>
        {
          isEditing
            ? <>
                <TextField
                  className="w-100"
                  value={textValue}
                  onChange={onChangeText}
                  { ...inputProps }
                />
                <Avatar className="bg-transparent color-green" onClick={onUpdateText}>
                  <PublishedWithChangesIcon />
                </Avatar>
                <Avatar className="bg-transparent color-red" onClick={() => {setIsEditing(false); setTextValue(value)}}>
                  <CloseIcon />
                </Avatar>
              </>
            : <>
                <Typography {...textProps}>{value}</Typography>
                {
                  editable && (
                    <Avatar className="bg-transparent color-black" onClick={onClickEditIcon}>
                      <EditIcon />
                    </Avatar>
                  )
                }
              </>
        }
      </Box>
    </>
  )
}

export default EditableTextField;
