from django.contrib import admin

from board.models import Board, BoardUsers


admin.site.register(Board)
admin.site.register(BoardUsers)
