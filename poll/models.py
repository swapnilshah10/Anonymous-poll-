from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Polls(models.Model):
    title = models.CharField(max_length=300)
    author = models.ForeignKey(User, on_delete=models.CASCADE ,blank= True)
    pub_date = models.DateTimeField(default=timezone.now)
    active = models.BooleanField(default=True)

    def can_vote(self, user):
        user_votes = user.vote_set.all()
        qs = user_votes.filter(poll=self)
        if qs.exists():
            return False
        return True

    @property
    def get_vote_count(self):
        votes = Vote.objects.filter(poll = self)
        return len(votes)
        
    def __str__(self):
        return self.title


class Option(models.Model):
    poll = models.ForeignKey(Polls, on_delete=models.CASCADE, default=None)
    option = models.CharField(max_length=100)

    def __str__(self):
        return self.option[0:100]


class Choices(models.Model):

    poll = models.ForeignKey(Polls, on_delete=models.CASCADE, default=None)

    def get_choices(self):
        Options = Option.objects.filter(poll=self.poll)
        return Options

    def __str__(self):
        return self.poll.title+' '


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    poll = models.ForeignKey(Polls, on_delete=models.CASCADE, default=None)
    selected = models.ForeignKey(
        Option, on_delete=models.CASCADE, default=None)
