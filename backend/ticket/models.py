import uuid

from django.conf import settings
from django.db import models


class Ticket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, db_index=True)
    board = models.ForeignKey('board.Board', on_delete=models.CASCADE, db_index=True)
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT, null=True)
    title = models.TextField()
    description = models.TextField()
    column_name = models.CharField(max_length=256)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='ticket_creator', on_delete=models.RESTRICT)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
