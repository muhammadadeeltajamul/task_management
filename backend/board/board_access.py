from django.db.models import TextChoices


class Actions:
    READ_TICKET = "read_ticket"
    READ_COMMENTS = "read_comments"
    COMMENT = "comment"
    EDIT_TICKET = "edit_ticket"
    CREATE_TICKET = "create_ticket"
    CHANGE_BOARD = "change_board"


class BoardAccess(TextChoices):
    NO_ACCESS = "no_access", "No Access"
    VIEW_ONLY = "view_only", "View Only"
    VIEW_AND_COMMENT = "view_and_comment", "View and Comment"
    EDITOR = "editor", "Editor"
    OWNER = "owner", "Owner"


def get_allowed_actions(permission_level):
    mapping = {
        BoardAccess.NO_ACCESS: [],
        BoardAccess.VIEW_ONLY: [],
        BoardAccess.VIEW_AND_COMMENT: [],
        BoardAccess.EDITOR: [],
        BoardAccess.OWNER: [],
    }
    return mapping[permission_level]


def check_permission(action, permission_level):
    return action in get_allowed_actions(permission_level)
