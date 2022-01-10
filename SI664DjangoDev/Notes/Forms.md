# 5. Forms

#### 1. 基本forms

```python
from django.forms import ModelForm
from autos.models import Make
# Create the form class.
class MakeForm(ModelForm):
    class Meta: # 基于data model创建form
        model = Make
        fields = '__all__' # 包含Make的所有字段
```

#### 2. forms template

```jinja2
{% extends "base_bootstrap.html" %}

{% block content %}
  <form action="" method="post">
    {% csrf_token %}
    <table>
    {{ form.as_table }} {# 把form里的数据作为表格打印#}
    </table>
    <input type="submit" value="Submit"> {# 提交数据按钮 #}
    <input type="submit" onclick="window.location='{% url 'autos:all' %}' ; return false;" value="Cancel"> {# 取消数据按钮 #}
  </form>
{% endblock %}
```

