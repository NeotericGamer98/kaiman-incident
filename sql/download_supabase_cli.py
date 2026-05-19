import urllib.request, json, ssl, os, tarfile

ctx = ssl.create_default_context()
print("Getting latest release...")
req = urllib.request.Request(
    "https://api.github.com/repos/supabase/cli/releases/latest",
    headers={"Accept": "application/json", "User-Agent": "python"}
)
resp = urllib.request.urlopen(req, context=ctx, timeout=30)
data = json.loads(resp.read().decode())
for asset in data["assets"]:
    name = asset["name"]
    if "windows_amd64.tar.gz" in name:
        url = asset["browser_download_url"]
        print("Downloading " + name + "...")
        req2 = urllib.request.Request(url, headers={"User-Agent": "python"})
        resp2 = urllib.request.urlopen(req2, context=ctx, timeout=120)
        content = resp2.read()
        tarpath = os.path.join(os.environ["TEMP"], "supabase.tar.gz")
        with open(tarpath, "wb") as f:
            f.write(content)
        print("Downloaded to " + tarpath)
        with tarfile.open(tarpath, "r:gz") as tar:
            tar.extractall(path=os.environ["TEMP"])
        exe = os.path.join(os.environ["TEMP"], "supabase.exe")
        if os.path.exists(exe):
            print("Supabase CLI at " + exe)
        break
