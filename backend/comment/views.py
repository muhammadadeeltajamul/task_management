from rest_framework.viewsets import ModelViewSet

from comment.models import Comments
from comment.serializers import CommentsSerializer


class CommentsViewSet(ModelViewSet):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comments.objects.all()
