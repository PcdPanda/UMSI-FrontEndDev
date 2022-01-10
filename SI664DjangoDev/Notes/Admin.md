# 6. Admin

**admin.py中定义了每个model的创建和修改权限**

#### 1. 基本admin.py

```python
from django.contrib import admin
# Register your models here.
from .models import Question
admin.site.register(Question) # 管理员可以添加/修改Question
```

### 2. 权限管理

- 管理员

  - 创建账户

    ```sh
    python manage.py createsuperuser
    ```

  - 登录并查看admin UI

    localhost:8000/admin

  - 修改app对应的admin.py

