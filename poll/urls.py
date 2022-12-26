from django.urls import path
from .import views
urlpatterns = [
    path('polls/' , views.get_polls),
    path('<poll_id>/votes/' , views.get_votes),
    path('<poll_id>/choices/', views.get_choices)
]