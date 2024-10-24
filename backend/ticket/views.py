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
