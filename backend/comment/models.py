import uuid

from django.conf import settings
from django.db import models


class Comments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, db_index=True)
    description = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT, db_index=True)
    ticket = models.ForeignKey('ticket.Ticket', on_delete=models.CASCADE)
    reactions = models.JSONField(default=list)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
