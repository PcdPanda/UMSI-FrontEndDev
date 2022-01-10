from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView

from django_tsugi.views import LaunchView
from django_tsugi.decorators import no_cookies

app_name='final'
urlpatterns = [
    path('', views.ScoreView.as_view()),
    path('code', views.CodeView.as_view(), name='code'),
    path('p00', views.P00View.as_view()),
    path('p10/<int:value>', views.P10View.as_view()),
    path('p20', views.P20View.as_view()),
    path('p31', views.P31View.as_view()),
    path('p40', views.P40View.as_view()),
    path('p50', views.P50View.as_view()),
    path('p61', views.P61View.as_view()),
    path('secrets', views.SecretsView.as_view()),
    path('p70/<str:parm>', views.P70View.as_view()),
    path('p82', views.P82View.as_view()),
    path('p91', views.P91View.as_view()),
    path('boss', views.BossView.as_view()),

]