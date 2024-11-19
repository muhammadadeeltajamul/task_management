from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from ticket.models import Ticket
from ticket.serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self):
        board_id = self.request.GET.get('board_id')
        if board_id:
            return Ticket.objects.filter(board=board_id)
        return Ticket.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        title = request.data.get("title")
        if not title:
            raise Exception("Title is required")
        board_id = request.data.get("board_id")
        if not board_id:
            raise Exception("board_id is required")
        column_name = request.data.get("column_name")
        if not column_name:
            raise Exception("column_name is required")
        params = {
            'title': title,
            'description': request.data.get("description", ""),
            'board_id': board_id,
            'column_name': column_name,
            'creator': request.user,
        }
        instance = Ticket.objects.create(**params)
        serializer = self.get_serializer(instance, context={'user': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)
