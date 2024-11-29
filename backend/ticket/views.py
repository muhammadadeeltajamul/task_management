from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from board.utils import check_permission_for_user
from board.board_access import Actions
from ticket.models import Ticket
from ticket.serializers import TicketSerializer


User = get_user_model()


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self):
        board_id = self.request.GET.get('board_id')
        if board_id:
            return Ticket.objects.filter(board=board_id)
        return Ticket.objects.all()

    def list(self, request, *args, **kwargs):
        board_id = self.request.GET.get('board_id')
        check_permission_for_user(Actions.VIEW_TICKET, request.user, board_id)
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
        check_permission_for_user(Actions.CREATE_TICKET, request.user, board_id)
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

    def partial_update(self, request, pk):
        key = request.data.get("key")
        value = request.data.get("value")
        if key == "assigned_to":
            obj = get_object_or_404(Ticket, pk=pk)
            setattr(obj, key, User.objects.get(email=value) if value else None)
        elif not (key and value):
            raise Exception("Need key and value to update")
        elif key not in ['title', 'description', 'column_name']:
            raise Exception(f"Invalid field {key}")
        else:
            obj = get_object_or_404(Ticket, pk=pk)
            setattr(obj, key, value)
        obj.save()
        return Response({key: value}, status=status.HTTP_200_OK)
