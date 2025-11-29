"""Простейшие тесты моделей, подходящие для курсовой работы."""
from datetime import date

from django.test import TestCase

from .models import EEGSession, Patient


class PatientModelTests(TestCase):
    """Проверяем вычисление возраста и строковые представления."""

    def test_age_property_returns_completed_years(self) -> None:
        """Возраст совпадает с ожидаемым количеством полных лет."""

        today = date.today()
        birthday = date(today.year - 30, 12, 31)
        patient = Patient.objects.create(full_name="Тестовый Пациент", birth_date=birthday)

        expected_age = today.year - birthday.year - (
            (today.month, today.day) < (birthday.month, birthday.day)
        )
        self.assertEqual(patient.age, expected_age)

    def test_session_str_includes_patient_and_date(self) -> None:
        """Строковое представление включает пациента и дату."""

        patient = Patient.objects.create(full_name="Тест", birth_date=date(1990, 1, 1))
        session = EEGSession.objects.create(patient=patient)

        self.assertIn("Тест", str(session))
        self.assertIn(str(session.session_date.year), str(session))
