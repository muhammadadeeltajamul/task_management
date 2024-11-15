import uuid

from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError

from .board_access import BoardAccess


class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, db_index=True)
    description = models.TextField(default="")
    name = models.CharField(max_length=512, db_index=True)
    columns = models.JSONField(default=list)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT, db_index=True)
    private = models.BooleanField(default=True)

    def add_column(self, column_name):
        if column_name in self.columns:
            raise ValidationError("Column name already exist")
        self.columns.append(column_name)

    def remove_column(self, column_name):
        if column_name not in self.columns:
            raise ValidationError("Column doesn't exist")
        self.columns.remove(column_name)


class BoardUsers(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, db_index=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=36, choices=BoardAccess.choices, default=BoardAccess.NO_ACCESS)
