from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from board.models import Board
from board.serializers import BoardSerializer


class BoardViewSet(ModelViewSet):
    serializer_class = BoardSerializer

    def get_queryset(self):
        return Board.objects.filter(creator=self.request.user)

    def create(self, request):
        name = request.data.get("name")
        if not name:
            raise Exception("Name is required")
        params = {
            'name': name,
            'description': request.data.get("description", ""),
            'creator': request.user,
        }
        instance = Board.objects.create(**params)
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
