export const RequestStatus = {
  INITIAL: 'initial',
  IN_PROGRESS: 'in-progress',
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
  DENIED: 'denied',
};

export const AppRoutes = {
  HOMEPAGE: '/',
  LOGIN: '/user/login/',
  SIGNUP: '/user/signup/',
  BOARDS: '/boards/',
  BOARD: '/board/:boardId/',
  TICKET: '/board/:boardId/',  // query param with ticketId
}

export const AccessLevel = {
  NO_ACCESS: "no_access",
  VIEW_ONLY: "view_only",
  VIEW_AND_COMMENT: "view_and_comment",
  EDITOR: "editor",
  OWNER: "owner",
};

export const Actions = {
  VIEW_BOARD: "view_board",
  UPDATE_BOARD: "update_board",
  VIEW_MEMBERS: "view_members",
}
