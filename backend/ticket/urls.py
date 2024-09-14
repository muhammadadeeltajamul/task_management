from django.urls import include, path
from rest_framework.routers import DefaultRouter

from ticket.views import TicketViewSet


router = DefaultRouter(trailing_slash=False)
router.register('', TicketViewSet, basename='ticket')

urlpatterns = [
    path('', include(router.urls))
]
