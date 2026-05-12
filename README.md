# 🎯 git-demo-app — Mini Team Landing Page

> **Mục đích:** App này là **prop demo** cho buổi thuyết trình tuần 1 về **Scrum + Git**.
> Không phải sản phẩm thật — code đơn giản nhất có thể, mọi thứ được thiết kế để **demo các thao tác Git một cách trực quan**.

---

## 📁 Cấu trúc project

```
git-demo-app/
├── index.html                # Khung HTML — gọi 8 file CSS + 5 module JS
├── README.md                 # File bạn đang đọc
├── .gitignore
├── css/                      # 8 file CSS (split theo section)
│   ├── reset.css
│   ├── variables.css         # 👈 file thường gây conflict (đổi --primary)
│   ├── layout.css
│   ├── header.css
│   ├── hero.css              # 👈 file thường gây conflict (đổi background)
│   ├── members.css
│   ├── tech.css
│   └── footer.css
├── js/                       # 5 module JS
│   ├── main.js               # Entry point
│   ├── nav.js                # Mobile menu + active link
│   ├── members-data.js       # Mảng members (data)
│   ├── members-render.js     # Render member cards (DOM + XSS sanitize)
│   └── animations.js         # IntersectionObserver fade-in
├── docs/
│   └── sourcetree-guide.md   # Hướng dẫn dùng SourceTree
└── scripts/                  # Helper scripts cho demo
    ├── reset.sh              # Reset repo về sạch để re-run demo
    ├── setup-conflict.sh     # Tự tạo state conflict cho Demo 3
    └── mess-up-files.sh      # Tự "fake sửa" 10 file cho Demo 4
```

**Tổng: 14 file source + 1 README + 1 docs + 3 scripts.**

---

## 🚀 Cách chạy app

App là HTML/CSS/JS thuần, **KHÔNG cần `npm install`**.

### Cách 1 — Live Server (khuyên dùng)
1. Mở project trong VS Code.
2. Cài extension **Live Server** (Ritwick Dey).
3. Click chuột phải vào `index.html` → **Open with Live Server**.
4. Trang mở ở `http://127.0.0.1:5500/`.

### Cách 2 — Python http.server
```bash
cd git-demo-app
python3 -m http.server 8000
# Mở browser: http://localhost:8000
```

### Cách 3 — Mở thẳng file (không khuyên)
Mở `index.html` bằng browser → **không hoạt động** vì JS dùng ES Module (`import`)
mà ES Module yêu cầu HTTP origin. Buộc phải dùng cách 1 hoặc 2.

---

## 🎬 5 Demo Scenarios (theo `week1.txt`)

> ⚠️ **Trước mỗi demo:** chạy `bash scripts/reset.sh` để repo về trạng thái sạch.

### Demo 1 — Clone source code Quân đã push
```bash
# Trên máy của Vũ (lần đầu)
git clone https://github.com/<quan>/git-demo-app.git
cd git-demo-app
# Mở Live Server → trang chạy → audience thấy app hoạt động
```

### Demo 2 — Sửa code, push, tạo PR, merge
```bash
git checkout -b feature/update-hero-title

# Sửa css/hero.css — đổi color/background
# Sửa index.html — đổi text trong <h1>

git status                           # xem file đã sửa
git diff                             # xem nội dung sửa
git add .
git commit -m "feat(hero): update title and color"
git push -u origin feature/update-hero-title

# Trên GitHub: tạo Pull Request → Quân review → Merge
git checkout main
git pull origin main
```

### Demo 3 — Conflict & xử lý
```bash
# Setup tự động (giả lập Quân và Vũ cùng sửa h1):
bash scripts/setup-conflict.sh

# Vũ pull main về branch mình → CONFLICT
git merge main
# → CONFLICT (content): Merge conflict in index.html

# Mở index.html, thấy markers <<<<<<< ======= >>>>>>>
# Sửa thủ công (chọn 1 phía hoặc gộp cả 2)
git add index.html
git commit                          # hoàn tất merge
```

### Demo 4 — Sửa nhiều file, chỉ giữ 3 file
```bash
# Setup tự động (sửa 10 file):
bash scripts/mess-up-files.sh

git status                          # 10 file modified

# Cách A: git restore — bỏ thay đổi 7 file không cần
git restore css/reset.css css/variables.css css/layout.css \
            css/header.css css/tech.css css/footer.css \
            js/animations.js js/nav.js

git status                          # còn 3 file: hero.css, members.css, members-data.js

# Cách B (alternative): git stash — cất tạm 7 file
# git stash push -m "backup-7-files" -- <file1> <file2> ...

# Commit 3 file đã giữ
git add .
git commit -m "feat: keep only 3 valid changes"
git push
```

### Demo 5 — SourceTree GUI
Xem `docs/sourcetree-guide.md`.

---

## 🌿 Branch & Commit Convention

**Branch:**
- `main` — branch chính, có protection
- `feature/<short-desc>` — feature mới (vd: `feature/update-hero-title`)
- `fix/<short-desc>` — bug fix
- `demo/<scenario-name>` — branch chỉ phục vụ demo

**Commit message** (Conventional Commits):
```
<type>(<scope>): <subject>

Types: feat | fix | docs | style | refactor | chore
Scopes: hero | members | tech | header | footer | css | js
```

Ví dụ: `feat(hero): update title and primary color`

---

## 🔧 Helper Scripts

| Script | Công dụng |
|---|---|
| `scripts/reset.sh` | Đưa repo về trạng thái sạch (để chạy lại demo). ⚠️ Xoá mọi thay đổi local. |
| `scripts/setup-conflict.sh` | Tự tạo conflict cho Demo 3 (giả lập 2 người sửa cùng dòng). |
| `scripts/mess-up-files.sh` | Tự "fake sửa" 10 file cho Demo 4. |

---

## 📋 Cheat Sheet — Lệnh Git hay dùng trong demo

```bash
# Cơ bản
git status                          # Xem trạng thái
git log --oneline --graph --all     # Xem lịch sử dạng cây
git diff                            # Xem thay đổi chưa stage
git diff --staged                   # Xem thay đổi đã stage

# Thao tác
git add <file>                      # Stage 1 file
git add .                           # Stage tất cả
git commit -m "message"             # Commit
git push                            # Push lên remote
git pull                            # Pull về

# Branch
git checkout -b <branch>            # Tạo + chuyển branch
git checkout <branch>               # Chuyển branch
git branch -D <branch>              # Xoá branch local

# Cứu hộ
git restore <file>                  # Bỏ thay đổi 1 file
git restore --staged <file>         # Unstage 1 file
git stash                           # Cất tạm tất cả
git stash pop                       # Lấy lại
git merge --abort                   # Huỷ merge giữa chừng
git reset --hard HEAD               # Reset cứng (cẩn thận!)
```

---

## 🎤 Lưu ý cho Vũ khi trình bày

1. **Phóng to font terminal** lên cỡ 18-20pt để audience đọc được.
2. **Nói chậm + giải thích trước khi gõ** — đừng gõ liền tù tì.
3. Sau mỗi commit lớn, gõ `git log --oneline --graph` để audience thấy "cây".
4. Khi conflict, **mở file bằng VS Code** và phóng to — colorize giúp audience dễ thấy markers.
5. Có **slide cheat sheet** cạnh terminal phòng khi quên lệnh.
6. **Pre-record fallback** — nếu mạng phòng yếu, có sẵn video chạy thẳng.
