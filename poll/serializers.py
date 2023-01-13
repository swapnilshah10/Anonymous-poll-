from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name')

class PollsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polls
        fields = '__all__' 

    def to_representation(self, instance):
        data = super().to_representation(instance)
        del data['author']
        return data

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'
    def to_representation(self, instance):
        data = super().to_representation(instance)
        del data['user']
        return data

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choices
        fields = '__all__'