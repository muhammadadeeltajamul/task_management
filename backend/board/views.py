from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from board.board_access import BoardAccess, is_valid_access_level
from board.models import Board, BoardUsers
from board.serializers import BoardSerializer, BoardUsersSerializer


User = get_user_model()


class BoardViewSet(ModelViewSet):
    serializer_class = BoardSerializer

    def list(self, request, *args, **kwargs):
        board_ids_queryset = BoardUsers.objects.filter(user=self.request.user).values_list('board', flat=True)
        queryset = Board.objects.filter(id__in=board_ids_queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'user': request.user})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'user': request.user})
        return Response(serializer.data)

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
        BoardUsers.objects.create(board=instance, user=request.user, access_level=BoardAccess.OWNER)
        serializer = self.get_serializer(instance, context={'user': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        board_id = kwargs['pk']
        instance = Board.objects.get(id=board_id)
        serializer = self.get_serializer(instance, context={'user': request.user})
        return Response(serializer.data)

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


    @action(detail=True, methods=['get', 'post'], url_path='access')
    def access(self, request, pk):
        if request.method == "GET":
            board = get_object_or_404(Board,pk=pk)
            board_users = BoardUsers.objects.filter(board=board)
            return Response(BoardUsersSerializer(board_users, many=True).data)

        print(request.data)
        new_access_level = request.data.get("access_level")
        email = request.data.get("email")
        if not is_valid_access_level(new_access_level):
            return Response({"message": "Invalid access"}, status=status.HTTP_403_FORBIDDEN)
        board = get_object_or_404(Board, pk=pk)
        user = get_object_or_404(User, email=email)
        defaults = {"access_level": new_access_level}
        obj, created = BoardUsers.objects.get_or_create(defaults=defaults, board=board, user=user)
        if not created:
            obj.access_level = new_access_level
            obj.save()
        return Response(BoardUsersSerializer(obj, many=False).data)
