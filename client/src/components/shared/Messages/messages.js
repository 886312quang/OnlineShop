import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Message {
  static success(arg) {
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {arg}
      </Alert>
    </Snackbar>;
  }

  static error(arg) {
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {arg}
      </Alert>
    </Snackbar>;
  }

  static warning(arg) {
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning">
        {arg}
      </Alert>
    </Snackbar>;
  }

  static info(arg) {
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info">
        {arg}
      </Alert>
    </Snackbar>;
  }
}
