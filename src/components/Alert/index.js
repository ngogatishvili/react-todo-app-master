import React from 'react';
import {Snackbar, Slide, IconButton} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {Close} from '@mui/icons-material';
import {hideAlert} from '../../redux';

function Alert() {
  const message = useSelector((store) => store.alert.message);
  const dispatch = useDispatch();

  const action = (
    <IconButton color='secondary' onClick={() => dispatch(hideAlert())}>
      <Close />
    </IconButton>
  );
  return (
    <div>
      <Snackbar
        autoHideDuration={3000}
        message={message}
        open={!!message}
        onClose={() => dispatch(hideAlert())}
        TransitionComponent={(props) => <Slide {...props} direction='down' />}
        anchorOrigin={{horizontal: 'center', vertical: 'top'}}
        action={action}
      />
    </div>
  );
}

export default Alert;
