from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Chat(models.Model):
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey('ChatRoom', on_delete=models.CASCADE)

    def get_previous_user(self):
        objects = list(Chat.objects.all())

        if objects.index(self) != 0:
            previous = objects[objects.index(self)-1].user
        else:
            previous = None
        print(previos)
        return previous


class ChatRoom(models.Model):
    name = models.CharField(max_length=255)
