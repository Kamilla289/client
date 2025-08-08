from django.urls import path
from .views import YandexImageGenerateView

urlpatterns = [
    path('generate/', YandexImageGenerateView.as_view(), name='generate_image'),
]
