# 1. Django概览

#### 1. 初始化流程

1. 初始化并创建项目和app

      ```sh
      django-admin startproject myproj # 创建myproj项目
      cd myproj # 创建
      python manage.py runserver <localhost:8000> # 测试django是否正确
      python manage.py startapp <appname> #创建app目录
      ```

3. 在mysite/settings.py中添加INSTALLED_APPS 

   ```python
   INSTALLED_APPS = ['<appname>/apps/<appconfig>']
   # appconfig定义在app目录下的apps.py中
   ```

3. 定义models.py

      - 添加mysite/settings.py下的DATABASE
      - 创建\<appname\>/models.py
      - 运行manager.py创建migrations并migrate

4. 定义urls.py

      - 使用include修改mysite/urls.py
      - 在\<appname\>/urls.py,创建url和对应的view函数

5. 定义view.py 

      - 在\<appname\>/view.py创建返回的html页面的view函数
      - 部分使用generic view

6. 定义admin.py

      - 在admin.py中注册各个model类的权限
      - 使用manager.py创建superuser

7. 使用manager.py进行check

#### 2. 目录结构

目录结构 /django_projects/\<project\>/*

- mysite下保存了项目整体文件

  - setting.py: 包括激活的app,数据库,时区,host等配置

  - urls.py: proj使用的各个url (通常include app的url)

  - manage.py: 相当于terminal,可以通过

    ```sh
    python manage.py <command> <params> # 执行命令
    python manage.py shell # 运行django中的python
    ```

- \<app\>存放了对应app的各种文件

  - view.py: app的欢迎界面
  - urls.py: app界面用的url路径
  - models.py: app使用的数据模型(表结构)
  - migrations/*.py: 保存了每次的改动日志
  - form.py: 定义了html上的表单,用来链接html和model
  - admin.py: 权限管理文件,决定model的创建和修改权限

