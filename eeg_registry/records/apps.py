from django.apps import AppConfig


class RecordsConfig(AppConfig):
    """Настройки приложения для учёта ЭЭГ-данных."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "eeg_registry.records"
    verbose_name = "Учёт ЭЭГ"
