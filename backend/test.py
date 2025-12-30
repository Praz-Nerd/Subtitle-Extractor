import requests

url = "http://localhost:5000/extract"

with open("backend/henry.mp4", "rb") as f:
    response = requests.post(
        url,
        files={"file": ("henry.mp4", f, "video/mp4")}
    )

print(response.status_code)
print(response.text)
