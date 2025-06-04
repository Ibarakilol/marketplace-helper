#!/bin/bash

# Переход в папку api
cd ./marketplace-helper-api

# Установка uv, пакетный менеджер для Python (аналог npm/yarn для JS)
pip install uv

# Установка зависимостей для api
uv sync

# Запуск виртуального окружения
if [[ "$OSTYPE" == "win32" ]]; then
  source .venv/Scripts/activate
else
  source .venv/bin/activate
fi

# Запуск сервера
alembic upgrade head && fastapi dev
