# -*- coding: utf-8 -*-

"""
A list of functions for sending notification to users.

Refer to page 6 of Requirements Specification for more detials on when to call
each function.
"""

from django.conf import settings
from django.core.mail import send_mail


def _send_notification(subject, content, recipient_list):
	"""
	Send notification email to recipients in recipient_list
	:subject: email subject
	:content: email content
	:recipient_list: a list of string, emails of the recipients
	:return: a number of successfully delivered messages 
	"""

	return send_mail(subject, content, settings.EMAIL_HOST_USER, 
		recipient_list, fail_silently=False)


def send_validation_link(recipient, confirmation_link):
	"""
	Send validatin link to the recipient email
	:recipient: a string indicating an email of the recipient
	:return: 1 if email is successfully deliverd, 0 otherwise 
	"""
	subject = "ยินดีต้อนรับเข้าสู่ Whalemart"
	message = ("เพื่อความปลอดภัยของท่าน กรุณายืนยันอีเมล์นี้ ({}) "
		"เพื่อที่ท่านจะสามารถใช้งาน Whalemart ได้อย่างเต็มประสิทธิภาพ ผ่าน {} \n"
		"ท่านได้รับ email นี้เนื่องจากท่านได้สร้างบัญชี Whalemart ใหม่ "
		"หากท่านไม่ได้สร้าง กรุณาเพิกเฉยต่ออีเมล์ฉบับนี้"
		).format(recipient, confirmation_link)

	return _send_notification(subject, message, [recipient])


def notify_payment_number_updated(recipient, username, account_number, 
		credit_card=False, bank_account=False):
	assert credit_card == True or bank_account == True, "account type must be specified"
	if credit_card:
		account_type = "บัตรเครดิต"
	if bank_account:
		account_type = "บัญชี"

	subject = "ท่านเพิ่ม{}สำเร็จ".format(account_type)
	message = ("ท่าน {} ได้เพิ่ม {} ในระบบ Whalemart ได้สำเร็จ"
		).format(username, account_number)

	return _send_notification(subject, message, [recipient])


def notify_payment_number_deleted(recipient, username, account_number, 
		credit_card=False, bank_account=False):
	assert credit_card == True or bank_account == True, "account type must be specified"
	if credit_card:
		account_type = "บัตรเครดิต"
	if bank_account:
		account_type = "บัญชี"

	subject = "ท่านลบ{}สำเร็จ".format(account_type)
	message = ("ท่าน {} ได้ลบ {} ในระบบ Whalemart ได้สำเร็จ"
		).format(username, account_number)

	return _send_notification(subject, message, [recipient])


def notify_reservation_confirmed(recipient, booth_layout, market_name, due_date):
	subject = "ท่านจองสำเร็จ"
	message = ("ท่าน {} ได้ทำการจอง พื้นที่หมายเลข {} ภายในตลาด {} "
		"ท่านสามารถยกเลิกการจองได้ภายใน {}"
		).format(username, booth_layout, market_name, due_date)

	return _send_notification(subject, message, [recipient])


def notify_reservation_canceled(recipient, booth_layout, market_name, due_date):
	subject = "ท่านยกเลิกจองสำเร็จ"
	message = ("ท่าน {} ได้ยกเลิกการจอง พื้นที่หมายเลข {} ภายในตลาด {} "
		"ท่านสามารถจองพื้นที่ใหม่ได้ภายใน <due date> {}"
		).format(username, booth_layout, market_name, due_date)

	return _send_notification(subject, message, [recipient])


def notify_payment_confirmed(recipient, username, round, account_number, rental_fee):
	subject = "ท่านชำระเงินสำเร็จ"
	message = ("เราได้ทำการยืนยันการชำระเงิน {} ของท่าน {} จากบัญชี {} เป็นจำนวนเงิน {}"
		).format(round, username, account_number, rental_fee)

	return _send_notification(subject, message, [recipient])


def notify_reservation_deadline(recipient, username, booth_layout, market_name,
		round, link):
	subject = "เหลืออีกเพียง 2 วัน"
	message = ("ท่าน {} ได้รับการคัดเลือกให้ใช้พื้นที่หมายเลข {} ภายในตลาด {} "
		"ท่านเหลือเวลาอีก 2 วันเพื่อทำการชำระเงินเพื่อทำการ {} "
		"ท่านสามารถทำการชำระเงินได้ที่ {}"
		).format(username, booth_layout, market_name, round, link)

	return _send_notification(subject, message, [recipient])


def notify_reservation_approved(recipient, username, booth_layout, market_name,
		link, due_date):
	subject = "ท่านได้รับการคัดเลือก"
	message = ("ท่าน {} ได้รับการคัดเลือกให้ใช้พื้นที่หมายเลข {} "
		"ภายในตลาด {} ท่านสามารถทำการชำระเงินได้ที่ {} ภายในวันที่ {}"
		).format(username, booth_layout, market_name, link, due_date)

	return _send_notification(subject, message, [recipient])


def notify_lessor_registration_approved(recipient, username, link):
	subject = "ท่านได้เป็นผู้ให้เช่าแล้ว"
	message = ("ท่าน {} ได้เป็นผู้ให้เช่าแล้ว "
		"ท่านสามารถสำรวจฟังก์ชันการใช้งานต่างๆ ได้ที่ {}"
		).format(username, link)

	return _send_notification(subject, message, [recipient])


def notify_lessor_reservation_deadline(recipient, username, market_name,
		due_date, link):
	subject = "เหลืออีกเพียง 2 วัน"
	message = ("ท่าน {} เวลาในการจอง {} กำลังจะหมดลงในอีก 2 วัน "
		"โปรดเข้าไปคัดเลือกผู้เช่าที่ท่านต้องการภายในวัน {} "
		"ท่านสามารถทำการคัดเลือกได้ที่ {}"
		).format(username, market_name, due_date, link)

	return _send_notification(subject, message, [recipient])


def notify_reservation_period_ended(recipient, username, market_name,
		due_date, link):
	subject = "ถึงเวลาแล้ว"
	message = ("ท่าน {} เวลาในการจอง {} ได้หมดลงแล้ว "
		"โปรดเข้าไปคัดเลือกผู้เช่าที่ท่านต้องการภายในวัน {} "
		"ท่านสามารถทำการคัดเลือกได้ที่ {}"
		).format(username, market_name, due_date, link)

	return _send_notification(subject, message, [recipient])


def notify_vendor_selection_period_deadline(recipient, username, market_name,
		due_date, link):
	subject = "ถึงเวลาแล้ว"
	message = ("ท่าน {} เวลาในการคัดเลือกผู้เช่าใน {} กำลังจะหมดลงในอีก 2 วัน "
		"โปรดเข้าไปคัดเลือกผู้เช่าที่ท่านต้องการภายในวัน {} "
		"ท่านสามารถทำการคัดเลือกได้ที่ {}"
		).format(username, market_name, due_date, link)

	return _send_notification(subject, message, [recipient])


def send_approved_booth_report(recipient, booth_list):
	"""
	:booth_list: list of booths in format (booth_no, booth_name, description, detail)
	"""
	subject = "สรุป Booth ที่ได้รับการยืนยัน"
	message = ""
	for i, (booth_no, booth_name, description, detail) in enumerate(booth_list):
		message = message + str(i+1) + ". "
		message = message + booth_no + " " + description + " " + detail + "\n"

	return _send_notification(subject, message, [recipient])


def send_receipt(recipient, product_list):
	"""
	:product_list: list of products in format (product, price)
	"""
	subject = "ใบเสร็จรับเงิน"
	message = "รายการ\tราคา\n"
	total_price = 0
	for (product, price) in product_list:
		message = message + product + "\t" + str(price) + "\n"
		total_price = total_price + price

	message = message + "รวม\t" + str(total_price) + "\n"

	return _send_notification(subject, message, [recipient])
