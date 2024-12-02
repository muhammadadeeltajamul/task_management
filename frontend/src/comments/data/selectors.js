export const selectCommentsList = state => state.comments.comments;
export const selectCommentsAPIStatus = apiName => state => state.comments.apiStatus[apiName];
