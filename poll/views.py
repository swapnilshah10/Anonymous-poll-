# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.decorators import api_view
from rest_framework import status
# Create your views here.


@api_view(["GET" ,"POST"])
def hello(requests):
    if requests.method == "GET":
        qs = Polls.objects.get(author = requests.user)
        print(qs.get_vote_count)
        serializer = PollsSerializer(qs)
        return Response(serializer.data)
        # return Response('Hello', status=HTTP_200_OK)
    elif requests.method == "POST":
        return Response('Hello', status=HTTP_200_OK)