from django.urls import path
from .import views
from rest_framework.authtoken import views as v

urlpatterns = [
    path('api-auth/', v.obtain_auth_token),
    path('register/',views.RegisterUserAPIView.as_view()),
    path('get-details/',views.UserDetailAPI.as_view()),
    path('user_polls/' , views.get_polls),
    path('polls/' , views.get_all_polls),
    path('<poll_id>/votes/' , views.get_votes),
    path('<poll_id>/choices/', views.get_choices),
    path('<poll_id>/vote/', views.vote)
]