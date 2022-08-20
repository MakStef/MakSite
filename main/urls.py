from django.urls import path

from .views import (
    IndexView,
    HelpView,
    PortfolioJsonListView,
)

app_name = 'main'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('help/', HelpView.as_view(), name='help'),
    path('load-more/<int:num_portfolios>/', PortfolioJsonListView.as_view()),
]
