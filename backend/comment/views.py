from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from comment.models import Comments
from comment.serializers import CommentsSerializer


class CommentsViewSet(ModelViewSet):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comments.objects.all()

    def list(self, request, *args, **kwargs):
        ticket_id = request.GET.get("ticket_id")
        if not ticket_id:
            raise ValidationError("Invalid ticket id")
        queryset = self.get_queryset().filter(ticket_id=ticket_id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'user': request.user})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'user': request.user})
        return Response(serializer.data)
