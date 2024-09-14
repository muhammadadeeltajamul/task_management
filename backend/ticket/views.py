from rest_framework.viewsets import ModelViewSet

from ticket.models import Ticket
from ticket.serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self):
        return Ticket.objects.all()
