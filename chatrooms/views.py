from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied

from .models import Chat, ChatRoom


class Index(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'chatrooms/index.html')


class Room(LoginRequiredMixin, View):
    def get(self, request, room_name):
        room = ChatRoom.objects.filter(name=room_name).first()
        chats = []
        if room:
            chats = Chat.objects.filter(room=room)
        else:
            room = ChatRoom(name=room_name, creator=request.user)
            room.save()

        if room.creator:
            admin = (room.creator.id == request.user.id)
        else:
            admin = False

        context = {
            'room_name': room_name,
            'chats': chats,
            'admin': admin
        }

        return render(request, 'chatrooms/room.html', context)


class DeleteRoom(LoginRequiredMixin, View):
    def get(self, request, room_name):
        room = get_object_or_404(ChatRoom, name=room_name)
        if not request.user.id == room.creator.id:
            return PermissionDenied(f"You do not have permission to delete room {room_name}")
        else:
            room.delete()
            return redirect("chat:index")
