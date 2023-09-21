from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name')




class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option 
        fields = '__all__'

class PollsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polls
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        del data['author']
        return data

    # def create(self, validated_data):
    #     tracks_data = validated_data.pop('tracks')
    #     poll = Polls.objects.create(**validated_data)
    #     for track_data in tracks_data:
    #         Option.objects.create(poll = poll, **track_data)
    #     return poll

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
