"""ASGI-конфигурация для асинхронных серверов."""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eeg_registry.settings")

application = get_asgi_application()
