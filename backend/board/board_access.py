from django.db.models import TextChoices
from django.core.exceptions import PermissionDenied


class Actions:
    VIEW_BOARD = "view_board"
    UPDATE_BOARD = "update_board"
    VIEW_MEMBERS = "view_members"
    UPDATE_MEMBERS = "update_members"
    CREATE_TICKET = "create_ticket"
    VIEW_TICKET = "view_ticket"
    UPDATE_TICKET = "update_ticket"

    READ_COMMENTS = "read_comments"
    COMMENT = "comment"
    EDIT_TICKET = "edit_ticket"
    CHANGE_BOARD = "change_board"


class BoardAccess(TextChoices):
    NO_ACCESS = "no_access", "No Access"
    VIEW_ONLY = "view_only", "View Only"
    VIEW_AND_COMMENT = "view_and_comment", "View and Comment"
    EDITOR = "editor", "Editor"
    OWNER = "owner", "Owner"


VALID_CHOICES = [choice[0] for choice in BoardAccess.choices]


def is_valid_access_level(access_level):
    return access_level in VALID_CHOICES


def get_allowed_actions(permission_level):
    mapping = {
        BoardAccess.NO_ACCESS: [],
        BoardAccess.VIEW_ONLY: [Actions.VIEW_BOARD, Actions.VIEW_TICKET],
        BoardAccess.VIEW_AND_COMMENT: [Actions.VIEW_BOARD, Actions.VIEW_TICKET],
        BoardAccess.EDITOR: [
            Actions.VIEW_BOARD, Actions.UPDATE_BOARD, Actions.VIEW_MEMBERS,
            Actions.CREATE_TICKET, Actions.VIEW_TICKET, Actions.UPDATE_TICKET
        ],
        BoardAccess.OWNER: [
            Actions.VIEW_BOARD, Actions.UPDATE_BOARD, Actions.VIEW_MEMBERS,
            Actions.UPDATE_MEMBERS, Actions.CREATE_TICKET, Actions.VIEW_TICKET,
            Actions.UPDATE_TICKET
        ],
    }
    return mapping[permission_level]


def check_permission(action, permission_level, raise_exception=True):
    """
    Raises django.core.exceptions.PermissionDenied error
    """
    allowed = action in get_allowed_actions(permission_level)
    if not allowed and raise_exception:
        raise PermissionDenied(f"You don't have access to perform action {action}")
    return allowed
