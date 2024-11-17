from rest_framework.serializers import ModelSerializer, SerializerMethodField

from board.models import Board, BoardUsers


class BoardSerializer(ModelSerializer):
    access_level = SerializerMethodField()
    class Meta:
        model = Board
        fields = '__all__'
    
    def get_access_level(self, obj):
        user = self.context.get('user')
        board_user = BoardUsers.objects.get(board=obj, user=user)
        return BoardUsersSerializer(board_user, many=False).data['access_level']


class BoardUsersSerializer(ModelSerializer):
    class Meta:
        model = BoardUsers
        fields = '__all__'
