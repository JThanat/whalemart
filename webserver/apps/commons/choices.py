class ReservationStatus(object):
    PENDING = 0
    APPROVED = 1
    REJECTED = 2
    CANCELED = 3
    CHOICES = (
        (PENDING, 'Pending'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
        (CANCELED, 'Canceled')
    )
