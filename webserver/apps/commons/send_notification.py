from django.conf import settings
from django.core.mail import send_mail


def send_notification(subject, content, recipient_list):
	"""
	Send notification email to recipients in recipient_list
	:subject: email subject
	:content: email content
	:recipient_list: a list of string, emails of the recipients
	:return: a number of successfully delivered messages 
	"""

	return send_mail(subject, content, settings.EMAIL_HOST_USER, 
		recipient_list, fail_silently=False)