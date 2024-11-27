from rest_framework.serializers import ModelSerializer, SerializerMethodField

from board.board_access import get_allowed_actions
from board.models import Board, BoardUsers


class BoardSerializer(ModelSerializer):
    access_level = SerializerMethodField()
    permissions = SerializerMethodField()

    class Meta:
        model = Board
        fields = '__all__'
    
    def get_access_level(self, obj):
        user = self.context.get('user')
        if hasattr(self, '_cached_board_user'):
            board_user = self._cached_board_user
        else:
            board_user = BoardUsers.objects.get(board=obj, user=user)
            setattr(self, '_cached_board_user', board_user)
        return BoardUsersSerializer(board_user, many=False).data['access_level']

    def get_permissions(self, obj):
        return get_allowed_actions(self.get_access_level(obj))


class BoardUsersSerializer(ModelSerializer):
    class Meta:
        model = BoardUsers
        fields = '__all__'
