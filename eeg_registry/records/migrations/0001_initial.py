# Generated manually for курсовой проект: первичная схема таблиц.
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Patient",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("full_name", models.CharField(max_length=200, verbose_name="ФИО пациента")),
                ("birth_date", models.DateField(verbose_name="Дата рождения")),
                (
                    "diagnosis",
                    models.CharField(
                        blank=True,
                        help_text="Диагноз или жалобы, под которые проводилось исследование.",
                        max_length=255,
                        verbose_name="Основной диагноз",
                    ),
                ),
                ("notes", models.TextField(blank=True, verbose_name="Дополнительные сведения")),
            ],
            options={
                "ordering": ["full_name"],
                "verbose_name": "Пациент",
                "verbose_name_plural": "Пациенты",
            },
        ),
        migrations.CreateModel(
            name="EEGSession",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "session_date",
                    models.DateField(default=django.utils.timezone.localdate, verbose_name="Дата исследования"),
                ),
                (
                    "duration_minutes",
                    models.PositiveIntegerField(
                        default=30, help_text="Фактическое время записи сеанса.", verbose_name="Длительность, мин"
                    ),
                ),
                (
                    "electrode_system",
                    models.CharField(
                        choices=[("10-20", "Система 10–20"), ("10-10", "Система 10–10")],
                        default="10-20",
                        max_length=20,
                        verbose_name="Схема электродов",
                    ),
                ),
                (
                    "sampling_rate_hz",
                    models.PositiveIntegerField(
                        default=256, help_text="Укажите частоту, с которой выполнялась запись сигнала.", verbose_name="Частота дискретизации, Гц"
                    ),
                ),
                (
                    "technician",
                    models.CharField(blank=True, help_text="Исполнитель исследования.", max_length=150, verbose_name="Лаборант/врач"),
                ),
                ("notes", models.TextField(blank=True, verbose_name="Комментарий")),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sessions",
                        to="records.patient",
                        verbose_name="Пациент",
                    ),
                ),
            ],
            options={
                "ordering": ["-session_date", "patient__full_name"],
                "verbose_name": "Сеанс ЭЭГ",
                "verbose_name_plural": "Сеансы ЭЭГ",
            },
        ),
        migrations.CreateModel(
            name="EEGAttachment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "description",
                    models.CharField(
                        help_text="Например: EDF, отчёт или скриншот.", max_length=255, verbose_name="Описание файла"
                    ),
                ),
                (
                    "file",
                    models.FileField(
                        blank=True,
                        help_text="Для курсовой можно хранить путь или тестовый файл; в продакшене желательно подключить отдельное файловое хранилище.",
                        null=True,
                        upload_to="eeg_records/",
                        verbose_name="Файл",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")),
                (
                    "session",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="attachments",
                        to="records.eegsession",
                        verbose_name="Сеанс",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "verbose_name": "Вложение",
                "verbose_name_plural": "Вложения",
            },
        ),
    ]
