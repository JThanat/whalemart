"""webserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from django.contrib.auth.views import logout

from apps.ping import views as ping_views
from apps.users import views as user_views
from apps.lessors import views as lessor_views
from apps.bank_accounts import views as bank_accounts_views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'bank-account', bank_accounts_views.BankAccountInfoViewSet, base_name='bank-account')
router.register(r'become-lessor', lessor_views.BecomeALessorViewSet, base_name='become-lessor')
router.register(r'lessor', lessor_views.LessorViewSet, base_name='lessor')
router.register(r'register', user_views.RegistrationViewSet)
router.register(r'vendor-profile', user_views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^ping/', ping_views.Ping.as_view()),
    url(r'^validate-email/', user_views.ValidateUserEmailView.as_view()),
    url(r'^login-facebook/', user_views.login_facebook),
    url(r'^login-username/', user_views.login_username),
    url(r'^logout/', logout),
    url(r'^current-user/', user_views.get_current_user),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # JWT
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
]
