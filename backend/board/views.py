from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from board.models import Board
from board.serializers import BoardSerializer
from ticket.models import Ticket


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

    def partial_update(self, request, pk):
        key = request.data.get("key")
        value = request.data.get("value")
        if not (key and value):
            raise Exception("Need key and value to update")
        if key not in ['name', 'description', 'columns', 'private']:
            raise Exception(f"Invalid field {key}")
        obj = get_object_or_404(Board, pk=pk)
        setattr(obj, key, value)
        obj.save()
        return Response({key: value}, status=status.HTTP_200_OK)
