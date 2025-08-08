import subprocess
import time
import datetime

TOKEN_FILE = "iam_token.txt"
UPDATE_INTERVAL_HOURS = 11  

def log(msg):
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg}")

def get_token():
    try:
        result = subprocess.run(
            ["yc", "iam", "create-token"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        token = result.stdout.strip()
        return token
    except subprocess.CalledProcessError as e:
        log("❌ Ошибка при получении токена")
        log(e.stderr)
        return None

def save_token(token):
    with open(TOKEN_FILE, "w") as f:
        f.write(token)
    log("✅ Токен сохранён в iam_token.txt")

def main():
    while True:
        log("🔄 Обновление токена...")
        token = get_token()
        if token:
            save_token(token)
        else:
            log("⚠️ Повторная попытка через 5 минут")
            time.sleep(300)
            continue

        log(f"🕒 Ожидание {UPDATE_INTERVAL_HOURS} ч до следующего обновления...\n")
        time.sleep(UPDATE_INTERVAL_HOURS * 3600)

if __name__ == "__main__":
    main()
