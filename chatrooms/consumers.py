import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from datetime import datetime
from .models import Chat, ChatRoom


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.user_id = self.scope['user'].id

        # Find room object
        room = await database_sync_to_async(ChatRoom.objects.get)(name=self.room_name)

        # Create new chat object
        chat = Chat(
            content=message,
            user=self.scope['user'],
            room=room
        )

        await database_sync_to_async(chat.save)()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'author': chat.user.username,
                'posted': f'{chat.timestamp.strftime("%b. %-d, %Y, %-I:%M %p")}'.replace("PM", "p.m.").replace('AM', "a.m."),
                'user_id': self.user_id,
            })

    async def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']
        author = event['author']
        posted = event['posted']

        await self.send(text_data=json.dumps({
            'message': message,
            'author': author,
            'posted': posted,
            'user_id': user_id
        }))
