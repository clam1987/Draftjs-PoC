import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { EditorState, convertFromRaw } from "draft-js"
import Editor from "draft-js-plugins-editor";
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createGiphyPlugin from '@jimmycode/draft-js-giphy-plugin';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import API from "../../utils/API";
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js/dist/Draft.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import '@jimmycode/draft-js-giphy-plugin/lib/plugin.css';

const useStyles = makeStyles({
announcementContainer: {
    padding: "10px",
    fontFamily: "Arial",
    fontStyle: "normal",
    "&:hover": {
      backgroundColor: "#EBFAFF",
    },
  },
  announcementBody: {
    paddingTop: "10px",
    paddingBottom: "20px",
  },
  noBorder: {
      border: "none"
  }
});

const emojiPlugin = createEmojiPlugin();
const giphyPlugin = createGiphyPlugin({
  options: {
    apiKey: process.env.REACT_APP_API_KEY
  },
});
const { GihpyButton } = giphyPlugin;

const styleMap = {
    "HIGHLIGHT": {
      backgroundColor: "yellow"
    }
  }

const AnnouncementCard = ({id ,subject, body}) => {
    const classes = useStyles();
    const decodeBody = EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
    const [editorState] = useState(decodeBody);
    return (
    <Grid
      className={classes.announcementContainer}
      container
      justify="flex-start"
      data-active="inactive"
      key={id}
    >
           <Grid item xs={6}>
        <Typography variant="h6" align="left" gutterBottom>
          Subject: {subject}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Editor editorState={editorState} customStyleMap={styleMap} readOnly plugins={[emojiPlugin]}/>
      </Grid>
    </Grid>
    )
};

const Announcements = () => {
    const [data, setData] = useState();
    
    useEffect(() => {
        API.GET().then(x => setData(x.data))
    }, []);

    if(!data) return (<h1>Loading...</h1>)

    const announcementCards = data.map(x => {
        const { id, body, subject } = x
        return <AnnouncementCard id={id} body={body} subject={subject} />
    });
    return (
        <>
        {announcementCards}
        </>
    )
}

export default Announcements;