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
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from apps.markets import views as market_views
from apps.ping import views as ping_views
from apps.users import views as user_views
from apps.lessors import views as lessor_views
from apps.bank_accounts import views as bank_accounts_views
from apps.booths import views as booth_views
from apps.products import views as product_views
from apps.tags import views as tag_views
from apps.reservations import views as reservation_views
from apps.payments import views as payment_views
from apps.reports import views as report_views
from apps.ratings import views as ratings_views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'bank-account', bank_accounts_views.BankAccountInfoViewSet, base_name='bank-account')
router.register(r'become-lessor', lessor_views.BecomeALessorViewSet, base_name='become-lessor')
router.register(r'report', report_views.ReportViewSet, base_name='report')
router.register(r'rating', ratings_views.RatingInfoViewSet, base_name='rating')
router.register(r'rating-star', ratings_views.RatingStarViewSet, base_name='rating-star')
router.register(r'lessor', lessor_views.LessorViewSet, base_name='lessor')
router.register(r'register', user_views.RegistrationViewSet)
router.register(r'vendor-profile', user_views.UserViewSet)
router.register(r'product', product_views.ProduceViewSet, base_name='product')
router.register(r'markets', market_views.MarketViewSet, base_name='markets')
router.register(r'market-search', market_views.MarketSearchFeedViewSet, base_name='search')
router.register(r'booth', booth_views.BoothViewSet, base_name='booth')
router.register(r'tag', tag_views.TagViewSet, base_name='tag')
router.register(r'scene', market_views.SceneViewSet, base_name='scene')
router.register(r'similar-market', market_views.SimilarMarketView, base_name='similar-market')
router.register(r'credit-card', user_views.CreditCardView, base_name='credit-card')
router.register(r'reserve-booth', reservation_views.ReservationViewSet, base_name='reserve-booth')
router.register(r'payment', payment_views.PaymentViewSet, base_name='payment')
router.register(r'upload-receipt', payment_views.UploadReceiptViewSet, base_name='upload-receipt')
router.register(r'verify-receipt', payment_views.VerifyReceiptViewSet, base_name='verify-receipt')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^ping/', ping_views.Ping.as_view()),
    url(r'^validate-email/', user_views.ValidateUserEmailView.as_view()),
    url(r'^market-feed', market_views.CategorizedFeedView.as_view(), name='market-feed'),
    url(r'^login-facebook/', user_views.login_facebook),
    url(r'^login-username/', user_views.login_username),
    url(r'^logout/', user_views.logout),
    url(r'^current-user/', user_views.get_current_user),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^reservation-status/', reservation_views.get_reserved_markets),
    url(r'^approve-reservation/', reservation_views.approve_booths),
    url(r'^unapproved-markets/', reservation_views.get_unapproved_markets),
    url(r'^booths-in-unapproved-market/(?P<pk>[0-9]+)/', reservation_views.get_booths_in_unapproved_market),
    url(r'^payment-status/(?P<pk>[0-9]+)/', payment_views.get_payment_status),
    # JWT
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
