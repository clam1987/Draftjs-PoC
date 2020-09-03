import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from "@material-ui/core/Toolbar";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import ListIcon from '@material-ui/icons/List';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HighlightIcon from '@material-ui/icons/Highlight';
import { Editor, EditorState, RichUtils, convertToRaw, ContentState } from "draft-js"
import 'draft-js/dist/Draft.css';
import "./TextFieldDialog.css";
import API from "../../utils/API"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textBox: {
        paddingTop: ".625em",
        paddingLeft: ".625em",
        paddingRight: ".625em",
      },
      textFieldStyle: {
        border: "1px solid #666666",
        borderRadius: "5px",
      },
}));

const styleMap = {
  "HIGHLIGHT": {
    backgroundColor: "yellow"
  }
};

const TextFieldDialog = () => {
    const [open, setOpen] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [subject, setSubject] = useState();
    const classes = useStyles();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const toggleInlineStyles = e => {
      e.preventDefault();
      let style = e.currentTarget.getAttribute("data-style");
      const newState = RichUtils.toggleInlineStyle(editorState, style)
      if(newState) {
          setEditorState(newState)
          return "handled"      
      }
      return "not handled"
    }
  
    const toggleBulletPoints = e => {
      e.preventDefault();
      let styles = e.currentTarget.getAttribute("data-style");
      const newState = RichUtils.toggleBlockType(editorState, styles)
      if(newState) {
        setEditorState(newState);
        return "handled"
      }
      return "not handled"
    }
  
    const handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if(newState) {
          setEditorState(newState)
          return "handled"
      }
      return "not handled"
    }
  
    const handleChange = e => setEditorState(e)
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      const encodeBody = convertToRaw(editorState.getCurrentContent());
      const data = {
        subject: subject,
        body: encodeBody
      };
      API.POST(data).then(x => {
        setOpen(false);
      })
    }
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Create New Announcements
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Announcements</DialogTitle>
          <DialogContent>
            <TextField placeholder="Subject" onChange={e => setSubject(e.target.value)}/>
            <Toolbar disableGutters>
              <IconButton onClick={toggleInlineStyles} data-style="BOLD">
                <FormatBoldIcon />
              </IconButton>
              <IconButton onClick={toggleInlineStyles} data-style="ITALIC">
                <FormatItalicIcon />
              </IconButton>
              <IconButton onClick={toggleInlineStyles} data-style="UNDERLINE">
                <FormatUnderlinedIcon />
              </IconButton>
              <IconButton onClick={toggleInlineStyles} data-style="STRIKETHROUGH">
                <StrikethroughSIcon />
              </IconButton>
              <IconButton onClick={toggleBulletPoints} data-style="unordered-list-item">
                <ListIcon />
              </IconButton>
              <IconButton onClick={toggleBulletPoints} data-style="ordered-list-item">
                <FormatListNumberedIcon />
              </IconButton>
              <IconButton onClick={toggleInlineStyles} data-style="HIGHLIGHT">
                <HighlightIcon />
              </IconButton>
            </Toolbar>
            <div className="textfield">
            <Editor editorState={editorState} onChange={handleChange} handleKeyCommand={handleKeyCommand} customStyleMap={styleMap}/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  export default TextFieldDialog;
