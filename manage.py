#!/usr/bin/env python
"""
Точка входа для административных команд Django.
"""
import os
import sys


def main():
    """Запускает служебные команды Django."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eeg_registry.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Не удалось импортировать Django. Убедитесь, что пакет установлен "
            "и доступен в активном виртуальном окружении."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
