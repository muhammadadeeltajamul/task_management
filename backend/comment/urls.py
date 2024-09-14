from django.urls import include, path
from rest_framework.routers import DefaultRouter

from comment.views import CommentsViewSet


router = DefaultRouter(trailing_slash=False)
router.register('', CommentsViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls))
]
