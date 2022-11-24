import requests

url_token = "http://127.0.0.1:8000/api-token-auth/"
url_projects = "http://127.0.0.1:8000/api/projects/"
data_admin = {"username": "admin", "password": "admin"}
# data_dev01 = {'username': 'developer01', 'password': 'master'}
response = requests.post(url_token, data=data_admin)
print(response.json().get("token"))
token = response.json().get("token")
response_projects = requests.get(url_projects, headers={"Authorization": f"Token {token}"})

print(response_projects.status_code)
print(response_projects.json())

# import config.settings as settings
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
# from django.conf import settings

# if settings.DEBUG:
#     for user in User.objects.all():
#         Token.objects.get_or_create(user=user)
