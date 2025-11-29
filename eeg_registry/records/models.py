"""Модели предметной области для учёта ЭЭГ-записей."""
from django.db import models
from django.utils import timezone


class Patient(models.Model):
    """Карточка пациента, для которого ведутся ЭЭГ-исследования."""

    full_name = models.CharField("ФИО пациента", max_length=200)
    birth_date = models.DateField("Дата рождения")
    diagnosis = models.CharField(
        "Основной диагноз",
        max_length=255,
        blank=True,
        help_text="Диагноз или жалобы, под которые проводилось исследование.",
    )
    notes = models.TextField("Дополнительные сведения", blank=True)

    class Meta:
        verbose_name = "Пациент"
        verbose_name_plural = "Пациенты"
        ordering = ["full_name"]

    def __str__(self) -> str:  # pragma: no cover - удобочитаемое представление
        return f"{self.full_name} ({self.birth_date:%d.%m.%Y})"

    @property
    def age(self) -> int:
        """Возвращает возраст пациента на текущую дату."""

        today = timezone.localdate()
        years = today.year - self.birth_date.year
        if (today.month, today.day) < (self.birth_date.month, self.birth_date.day):
            years -= 1
        return years


class EEGSession(models.Model):
    """Экземпляр ЭЭГ-исследования с метаданными."""

    TEN_TWENTY = "10-20"
    TEN_TEN = "10-10"
    ELECTRODE_CHOICES = [
        (TEN_TWENTY, "Система 10–20"),
        (TEN_TEN, "Система 10–10"),
    ]

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="sessions",
        verbose_name="Пациент",
    )
    session_date = models.DateField("Дата исследования", default=timezone.localdate)
    duration_minutes = models.PositiveIntegerField(
        "Длительность, мин",
        default=30,
        help_text="Фактическое время записи сеанса.",
    )
    electrode_system = models.CharField(
        "Схема электродов",
        max_length=20,
        choices=ELECTRODE_CHOICES,
        default=TEN_TWENTY,
    )
    sampling_rate_hz = models.PositiveIntegerField(
        "Частота дискретизации, Гц",
        default=256,
        help_text="Укажите частоту, с которой выполнялась запись сигнала.",
    )
    technician = models.CharField(
        "Лаборант/врач",
        max_length=150,
        blank=True,
        help_text="Исполнитель исследования.",
    )
    notes = models.TextField("Комментарий", blank=True)

    class Meta:
        verbose_name = "Сеанс ЭЭГ"
        verbose_name_plural = "Сеансы ЭЭГ"
        ordering = ["-session_date", "patient__full_name"]

    def __str__(self) -> str:  # pragma: no cover - удобочитаемое представление
        return f"{self.patient.full_name}: {self.session_date:%d.%m.%Y}"


class EEGAttachment(models.Model):
    """Файл с сигналом или отчётом, прикреплённый к ЭЭГ-сеансу."""

    session = models.ForeignKey(
        EEGSession,
        on_delete=models.CASCADE,
        related_name="attachments",
        verbose_name="Сеанс",
    )
    description = models.CharField(
        "Описание файла", max_length=255, help_text="Например: EDF, отчёт или скриншот."
    )
    file = models.FileField(
        "Файл",
        upload_to="eeg_records/",
        blank=True,
        null=True,
        help_text=(
            "Для курсовой можно хранить путь или тестовый файл; в продакшене "
            "желательно подключить отдельное файловое хранилище."
        ),
    )
    created_at = models.DateTimeField("Дата добавления", auto_now_add=True)

    class Meta:
        verbose_name = "Вложение"
        verbose_name_plural = "Вложения"
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover - удобочитаемое представление
        return f"{self.description} ({self.created_at:%d.%m.%Y})"
