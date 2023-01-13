from django.urls import path
from .import views
urlpatterns = [
    path('user_polls/' , views.get_polls),
    path('polls/' , views.get_all_polls),
    path('<poll_id>/votes/' , views.get_votes),
    path('<poll_id>/choices/', views.get_choices),
    path('<poll_id>/vote/', views.vote)
]