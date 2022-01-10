# 4. View

**view.py中的函数接受用户的url request,返回对应的http页面**

#### 1. 基本view

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("You're at the index") # 返回最基本的http页面

def detail(request, question_id): # 解析url中的变量输出
    return HttpResponse("You're looking at question {}."format(question_id))
```

#### 2. 使用模板

1. 在views.py中使用template

   ```python
   from django.shortcuts import render, get_object_or_404
   from .models import Question
   
   def index(request):
       latest_question_list = Question.objects.order_by('-pub_date')[:5]
       # 传入latest_question_list到template中
       return render(request, 'polls/index.html', {'latest_question_list': latest_question_list}) # 调用template
   
   def detail(request, question_id):
       question = get_object_or_404(Question, pk=question_id) 
       # 如果没有对应的question可以输出404
       return render(request, 'polls/detail.html', {'question': question})
   ```

2. 在\<appname\>/templates/下定义template,路径传入views.py

   ```jinja2
   {% if latest_question_list %} {# latest_question_list会被作为参数传入 #}
       <ul>
       {% for question in latest_question_list %}
           <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
       {% endfor %}
       </ul>
   {% else %}
       <p>No polls are available.</p>
   {% endif %}
   ```

#### 3. 用户提交内部数据

```jinja2
<h1>{{ question.question_text }}</h1>
{% if error_message %}
	<p><strong>
		{{ error_message }}
	</strong></p>
{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post"> {# 提交数据,并定向到vote的view #}
{% csrf_token %} {# 说明会引用内部url #}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
{% endfor %}
<input type="submit" value="Vote">
</form>
```

- 提交数据用post，用户点击后会跳转到对应的url并调用view函数
- 引用内部url需要加csrf_token
- 使用{% url '\<app\>:\<name\>' param %}可以反向引用urls.py中对应name的url并填充参数

### 4. 提交后重定向

- 通过reverse可以根据name引用urls.py中定义的url并传入参数
- request.POST/request.GET可以获得http请求中的参数
- Post必须配合Redirect,可以防止用户点击back反复post

```python
from django.http import HttpResponse, HttpResponseRedirect
def vote(request, question_id):
    choice = request.POST["choice"] # 获取用户传入的数据
    question = get_object_or_404(Question, pk=question_id)
    selected_choice.votes += 1
    selected_choice.save()
    return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

#### 5. Generic View

**可以通过继承,在django.view.generic的基础上开发建议的view函数**

- 显示类的view
  - ListView: 显示一系列对象
  - DetailView: 显示特定对象
- 输入类的view
  - CreateView
  - DeleteView
  - UpdateView
- 基本view
  - view:用来普通继承
  - LoginRequiredMixin: 需要用户输入登录信息

```python
from django.views import generic
from .models import Choice, Question

class IndexView(generic.ListView): # ListView用来显示一系列对象
    template_name = 'polls/index.html' # 定义使用的template
    context_object_name = 'latest_question_list' # 定义传入template中的参数名字

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]

class DetailView(generic.DetailView): # DetailView用来显示对象中的细节
    model = Question
    template_name = 'polls/detail.html'
    
class AutoCreate(LoginRequiredMixin, CreateView):
    model = Auto
    fields = '__all__'
    success_url = reverse_lazy('autos:all')

class MakeCreate(LoginRequiredMixin, View):
    template = 'autos/make_form.html'
    success_url = reverse_lazy('autos:all')

    def get(self, request):
        form = MakeForm() # 调用form
        ctx = {'form': form}
        return render(request, self.template, ctx)

    def post(self, request):
        form = MakeForm(request.POST)
        if not form.is_valid():
            ctx = {'form': form}
            return render(request, self.template, ctx)

        make = form.save()
        return redirect(self.success_url)
```

