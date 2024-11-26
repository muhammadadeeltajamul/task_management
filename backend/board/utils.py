from board.board_access import check_permission
from board.models import BoardUsers


def check_permission_for_user(action, user, board_id, raise_exception=True):
    board_user = BoardUsers.objects.get(board_id=board_id, user=user)
    return check_permission(action, board_user.access_level, raise_exception=raise_exception)
