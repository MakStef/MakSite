from django.urls import path
from .views import Index, Room, DeleteRoom, CreateRoom

app_name = 'chat'

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('<str:room_name>/', Room.as_view(), name='room'),
    path('create/<str:room_name>/', CreateRoom.as_view(), name='create_room'),
    path('delete/<str:room_name>/', DeleteRoom.as_view(), name='delete_room'),
]
