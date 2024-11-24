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

    def partial_update(self, request, pk=None):
        if not "description" in request.data.keys():
            raise ValidationError("Invalid field")
        if not request.data['description']:
            raise ValidationError("Error validating field")
        instance = Comments.objects.get(pk=pk)
        if request.user != instance.author:
            raise ValidationError("You don't have permission to update comment")
        setattr(instance, 'description', str(request.data['description']))
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request):
        ticket_id = request.GET.get("ticket_id")
        if not ticket_id:
            raise ValidationError("Invalid ticket id")
        description = str(request.data.get('description', "")).strip()
        if not description:
            raise ValidationError("Description cannot be empty")
        comment = Comments.objects.create(
            author=request.user,
            ticket_id=ticket_id,
            description=description
        )
        return Response(self.get_serializer(comment).data)
