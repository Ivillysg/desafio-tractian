import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const Message = () => (
  <ReduxToastr
    timeOut={5000}
    newestOnTop={false}
    preventDuplicates
    position="top-center"
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar
  />
);

export default Message;
