from rest_framework.viewsets import ModelViewSet

from board.models import Board
from board.serializers import BoardSerializer


class BoardViewSet(ModelViewSet):
    serializer_class = BoardSerializer

    def get_queryset(self):
        return Board.objects.all()
