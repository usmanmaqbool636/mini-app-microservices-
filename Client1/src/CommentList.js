import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let newcontent;
    const { status, id, content } = comment;
    if (status === "approved") {
      newcontent = content
    }
    if (status === "pending") {
      newcontent = "This comment is awating moderation"
    }
    if (status === "rejected") {
      newcontent = "This comment has been Rejected"
    }
    return <li key={id}>{newcontent}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
