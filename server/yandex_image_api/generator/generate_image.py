import requests
import json
import time
import base64
import subprocess
import random
import os

FOLDER_ID = 'b1gm6n4o41rjlou67901'
MODEL_URI = f'art://{FOLDER_ID}/yandex-art/latest'
API_URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/imageGenerationAsync"
IAM_TOKEN_FILE = "iam_token.txt"

def get_iam_token():
    if not os.path.exists(IAM_TOKEN_FILE):
        raise FileNotFoundError("Файл iam_token.txt не найден. Запусти токен-обновлятор (token_refresher.py).")
    with open(IAM_TOKEN_FILE, 'r', encoding='utf-8') as f:
        return f.read().strip()

def send_image_generation_request(prompt_data):
    iam_token = get_iam_token()
    headers = {
        "Authorization": f"Bearer {iam_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(API_URL, headers=headers, data=json.dumps(prompt_data))
    if response.status_code == 200:
        response_data = response.json()
        return response_data['id']
    else:
        return {"error": response.text}

def get_result_url(request_id):
    return f"https://llm.api.cloud.yandex.net:443/operations/{request_id}"

def check_status(request_id):
    iam_token = get_iam_token()
    headers = {
        "Authorization": f"Bearer {iam_token}",
        "Content-Type": "application/json"
    }
    RESULT_URL = get_result_url(request_id)
    response = requests.get(RESULT_URL, headers=headers)
    if response.status_code == 200:
        response_data = response.json()
        if 'response' in response_data and 'image' in response_data['response']:
            return {"image_data": response_data['response']['image']}
        else:
            return {"status": "Image not ready"}
    else:
        return {"error": response.text}

def generate_cover_image(title):
    prompt_data = {
        "modelUri": MODEL_URI,
        "generationOptions": {
            "seed": "500", 
            "aspectRatio": {
                "widthRatio": "3",
                "heightRatio": "3"
            }
        },
        "messages": [
            {
                "weight": "1",
                "text": f"{title}, HD-разрешение, высокая детализация, сложные текстуры, глубокие цвета, динамическая композиция, реалистичная перспектива, высокий динамический диапазон, точная фокусировка."
            }
        ]
    }

    request_id = send_image_generation_request(prompt_data)

    if isinstance(request_id, dict) and "error" in request_id:
        return {"error": request_id['error']}

    max_attempts = 12
    for attempt in range(max_attempts):
        image_result = check_status(request_id)
        if "image_data" in image_result:
            return {"image_data": image_result["image_data"]}
        print(f"Попытка {attempt + 1}/{max_attempts}: изображение ещё не готово, ждём 12 секунд...")
        time.sleep(12)

    return {"error": "Генерация изображения не удалась после нескольких попыток"}

if __name__ == "__main__":
    title = input("Введите описание для обложки: ")
    result = generate_cover_image(title)

    if "image_data" in result:
        with open("cover_image.png", "wb") as f:
            f.write(base64.b64decode(result["image_data"]))
        print("✅ Картинка сохранена в cover_image.png")
    else:
        print("❌ Ошибка:", result.get("error", "Неизвестная ошибка"))
