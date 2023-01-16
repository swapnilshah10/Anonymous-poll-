# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  def get(self,request,*args,**kwargs):
    user = User.objects.get(id=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def get_polls(requests):
    if requests.method == "GET":
        try:
            qs = Polls.objects.filter(author=requests.user)
            serializer = PollsSerializer(qs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
    elif requests.method == "POST":
        data = requests.data
        user = requests.user
        serializer = PollsSerializer(data=data)
        if serializer.is_valid():
            serializer.save(author=user)
            data2 = {'poll': serializer.data['id']}
            serializer2 = ChoiceSerializer(data=data2)
            if (serializer2.is_valid()):
                serializer2.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def get_all_polls(requests):
    if requests.method == "GET":
        try:
            qs = Polls.objects.all()
            serializer = PollsSerializer(qs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def get_votes(requests, poll_id):
    try:
        if requests.method == "GET":
            qs = Polls.objects.filter(id=poll_id)
            if qs.exists():
                qs = Vote.objects.filter(poll_id=poll_id)
                if qs.exists():
                    serializer = VoteSerializer(qs, many=True)
                    return Response(serializer.data)
                return Response("No Votes till now", status=status.HTTP_404_NOT_FOUND)
            return Response("No Such poll", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(e, status=status.HTTP_404_NOT_FOUND)

    if requests.method == "POST":
        data = requests.data
        user = requests.user
        qs = Polls.objects.get(id=poll_id)
        if qs.author == user:
            return Response("You Can't vote in poll created by yourself", status=status.HTTP_406_NOT_ACCEPTABLE)
        elif not qs.can_vote(user):
            return Response("You Already Voted", status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = VoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save(poll=poll_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def get_choices(request, poll_id):
    if request.method == "GET":
        try:
            qs = Choices.objects.get(poll=poll_id)
            serializer = OptionSerializer(qs.get_choices(), many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
    elif request.method == "POST":
        try:
            data = request.data
            qs = Choices.objects.filter(poll=poll_id)
            serializer = OptionSerializer(data=data, many=True)
            if serializer.is_valid():
                qs = Polls.objects.get(id=poll_id)
                serializer.save(poll=qs)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)



@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def vote(request, poll_id):
    if request.method == "GET":
        try:
            qs = Vote.objects.get(poll=poll_id, user=request.user)
            serializer = VoteSerializer(qs)
            return Response(serializer.data)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
    elif request.method == "POST":
        try:
            data = request.data
            user = request.user
            qs = Polls.objects.get(id=poll_id)
            if qs.can_vote(user):
                serializer = VoteSerializer(data=data)

                if serializer.is_valid():
                    serializer.save(user=user)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            qs = Vote.objects.get(poll=poll_id, user=request.user)
            c = qs.selected.option
            serializer = OptionSerializer(qs)
            return Response("You already voted "+str(c), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
