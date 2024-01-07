from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_ents/$', views.get_ents, name='get_ents'),
]