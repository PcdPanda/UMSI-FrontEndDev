# 3. URL

**根据用户传入的url,找到view.py中对应的函数来处理**

#### 1. mysite/url.py

主页的url解析,通常会截取后面的部分传入app解析

```python
from django.urls import include, path
urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')) # 截取app后的url传入到对应的app/url.py中解析
]
```

#### 2. \<appname\>/url.py

app的url解析,通常会解析其中的变量传入到view.py中输出html页面

```python
from django.urls import path
from . import views

app_name = "polls" # 给url添加namespace
urlpatterns=[
    path('', views.index, name="index") # 当这层url为空时调用view.index输出
    path('owner', views.owner, name='owner'), # 当这层url为owner时调用view.owner输出
    path('<int:question_id>/', views.detail, name='detail'), # name可以被template调用
    path('<int:question_id>/vote/', views.vote, name="vote") # 当这层url可以用/<int>/vote解析时,调用views.vote输出,且int数字会作为question_id参数输入
]
```

#### 3. generic view

可以使用django的generic view库,套用一些现成的view功能

具体的实现方式在view.py中

```python
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'), # index
    path('<int:pk>/', views.DetailView.as_view(), name='detail'), # detail
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'), # results
]
```

