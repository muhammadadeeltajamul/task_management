export const selectBoardList = state => state.boards.boards;
export const selectSelectedBoard = state => state.boards.selectedBoard;
export const selectBoardStatus = state => state.boards.status;
export const selectBoard = boardId => state => state.boards.boards.find(board => board.id === boardId);
