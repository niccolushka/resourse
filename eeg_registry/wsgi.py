"""WSGI-конфигурация для развертывания Django."""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eeg_registry.settings")

application = get_wsgi_application()
