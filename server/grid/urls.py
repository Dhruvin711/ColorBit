from django.urls import path
from .views import generateGrid

urlpatterns = [
    path('', generateGrid, name="Generate Grid"),
]
