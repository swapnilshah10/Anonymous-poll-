# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(["GET", "POST"])
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


@api_view(["GET", "POST"])
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


@api_view(["GET", "POST"])
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


@api_view(["GET", "POST"])
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


@api_view(["GET", "POST"])
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
