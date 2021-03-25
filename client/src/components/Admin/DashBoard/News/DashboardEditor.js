import React, { useEffect, useState } from "react";
import { stateFromHTML } from "draft-js-import-html";
import { EditorState, convertToRaw, Editor } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "draft-js/dist/Draft.css";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

export default function DashboardEditor(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    props.setNewsContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  };

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through",
    },
  };

  useEffect(() => {
    if (props.newsContent) {
      let contentState = stateFromHTML(props.newsContent);
      let test = EditorState.createWithContent(contentState);
      setEditorState(EditorState.moveFocusToEnd(test));
    }
  }, [props.newsContent]);

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onChange={onEditorStateChange}
        customStyleMap={styleMap}
      />
    </div>
  );
}
