from django.urls import include, path
from rest_framework.routers import DefaultRouter

from board.views import BoardViewSet


router = DefaultRouter(trailing_slash=False)
router.register('', BoardViewSet, basename='board')

urlpatterns = [
    path('', include(router.urls))
]
