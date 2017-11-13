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

from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from apps.markets import views as market_views
from apps.ping import views as ping_views
from apps.users import views as user_views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'markets', market_views.MarketViewSet, base_name='markets')
router.register(r'market-feed', market_views.MarketFeedViewSet, base_name='feed')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
                  url(r'^', include(router.urls)),
                  url(r'^ping/', ping_views.Ping.as_view()),
                  url(r'^validate-email/', user_views.ValidateUserEmailView.as_view()),
                  url(r'^admin/', admin.site.urls),
                  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
                  # JWT
                  url(r'^api-token-auth/', obtain_jwt_token),
                  url(r'^api-token-refresh/', refresh_jwt_token),
                  url(r'^api-token-verify/', verify_jwt_token),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
