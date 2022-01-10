# 2. Model

**models.py定义了app中使用到的data model,类似于数据库表格的schema**

#### 1. 初始化database配置

修改settings.py中的DATABASES

- ENGINE: Database使用的数据库
- NAME: 数据库名

#### 2. 修改models.py

- 基本model, model可以包含字段和方法

  ```python
  from django.db import models
  
  class Question(models.Model): # 需要继承models.Model
  	question_test = models.CharField(max_length=200) # 类似sql定义列
      pub_date = models.DateTimeField('data published')
      figures = models.BinaryField(null=True, editable=True) # 添加图片
      def method(self):
          print("This is a method")
      
      def __str__(self):
          return self.question_test # 使Question可以展示
      
  class Choice(models.Model): # 同样需要继承models.Model
      question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choice") 
      # 每一个choice必须引用一个Question, 可以通过Question.<related_namexxx>方法索引到对应的choice
      choice_text = models.CharField(max_length=200)
      votes = models.IntegerField(default=0)
      def __str__(self):
          return self.choice_text
  ```

#### 3. 激活Data model

```sh
python manage.py makemigrations <appname> # 创建migrations文件
python manage.py sqlmigrate polls 0001 # 可选,输出migrations文件中的sql指令
python manage.py migrate # 应用migrations到当前app
```

#### 4. 增删改查models.py

- 增加一个对象

  ```python
  from app.models import Choice, Question # 导入model
  q = Question(question_test="my question", pub_date=timezone.now()) # 创建一个question(相当于一行)
  q.save() # 保存question (相当于更新)
  q.choice_set.create(choice_text="First Choice", vote=0) # 基于外键创建choice,choice_set基于related_name生成
  ```

- 查找对象

  ```python
  Question.objects.all() # 读取所有question model
  Question.objects.count() # 计数
  Question.object.filter(id=1) # 过滤对象
  q = Question.object.get(question_test="my question") # 查找对象
  q.method() # 调用方法
  q.question_text # 查看字段
  q.choice_set.all() # 可以通过外键访问
  ```

- 修改对象

  ```python
  q.question_text = "updated question text"
  ```

- 删除对象

  ```python
  q.delete()
  ```

#### 5. Many to Many Relationship

通过使用junction table维持多组one-to-many关系来实现many-to-many关系

- junction table

  有两组foreign key,表示对外的两组one-to-many关系

  ```python
  class Authored(models.Model):
      book = models.ForeignKey(Book, on_delete=models.CASCADE)
      author = models.ForeignKey(Author, on_delete=models.CASCADE)
  ```

- data table

  通过through参数来和junction table建立关系

  ```python
  class Book(models.Model):
      title = models.CharField(max_length=200)
      authors = models.ManyToManyField('Author', through='Authored')
  
  class Author(models.Model):
      name = models.CharField(max_length=200)
      books = models.ManyToManyField('Book', through='Authored')
  ```

  



