"""Настройки Django Admin для удобного ведения ЭЭГ-данных."""
from django.contrib import admin

from .models import EEGAttachment, EEGSession, Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    """Упрощённое отображение списка пациентов."""

    list_display = ("full_name", "birth_date", "age", "diagnosis")
    list_filter = ("birth_date",)
    search_fields = ("full_name", "diagnosis")
    ordering = ("full_name",)
    fieldsets = (
        (
            "Основные данные",
            {
                "fields": ("full_name", "birth_date", "diagnosis"),
                "description": "ФИО, дата рождения и клинический запрос.",
            },
        ),
        ("Примечания", {"fields": ("notes",), "classes": ("collapse",)}),
    )


class EEGAttachmentInline(admin.TabularInline):
    """Быстрое добавление файлов прямо со страницы сеанса."""

    model = EEGAttachment
    extra = 1
    fields = ("description", "file")


@admin.register(EEGSession)
class EEGSessionAdmin(admin.ModelAdmin):
    """Отображение сеансов с базовыми фильтрами и поиском."""

    list_display = (
        "session_date",
        "patient",
        "electrode_system",
        "duration_minutes",
        "sampling_rate_hz",
    )
    list_filter = ("session_date", "electrode_system")
    search_fields = ("patient__full_name", "technician", "notes")
    inlines = [EEGAttachmentInline]
    autocomplete_fields = ("patient",)
    fieldsets = (
        (
            "Общие параметры",
            {
                "fields": (
                    "patient",
                    "session_date",
                    "technician",
                    "electrode_system",
                    "sampling_rate_hz",
                    "duration_minutes",
                )
            },
        ),
        ("Комментарий", {"fields": ("notes",)}),
    )


@admin.register(EEGAttachment)
class EEGAttachmentAdmin(admin.ModelAdmin):
    """Просмотр и поиск вложенных файлов."""

    list_display = ("description", "session", "created_at")
    search_fields = ("description", "session__patient__full_name")
    autocomplete_fields = ("session",)
    readonly_fields = ("created_at",)
