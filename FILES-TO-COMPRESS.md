# SCM WEBSITE — Senarai Fail/Folder Untuk Di-Compress

## 📦 SENARAI LENGKAP UNTUK UPLOAD KE CPANEL

### ✅ FOLDER YANG PERLU (9 folders)

1. **`.next`** — ⚠️ PENTING! Build output dari Next.js (FULL FOLDER)
2. **`app`** — App Router pages dan layouts
3. **`components`** — React components
4. **`lib`** — Utilities dan helper functions
5. **`public`** — Static assets (images, fonts, etc)
6. **`node_modules`** — ⚠️ OPTIONAL (boleh skip, install di server nanti)

### ✅ FAIL YANG PERLU (13 files)

7. **`server.js`** — ⚠️ CRITICAL! Startup script untuk cPanel
8. **`package.json`** — Dependencies list
9. **`package-lock.json`** — Dependencies lock file
10. **`next.config.ts`** — Next.js configuration
11. **`tsconfig.json`** — TypeScript configuration
12. **`.env.production`** — Production environment variables
13. **`.htaccess`** — Apache proxy configuration
14. **`postcss.config.mjs`** — PostCSS configuration (untuk Tailwind)
15. **`next-env.d.ts`** — Next.js TypeScript declarations
16. **`eslint.config.mjs`** — ESLint configuration (optional)
17. **`tsconfig.tsbuildinfo`** — TypeScript build info (optional)
18. **`README.md`** — Documentation (optional)
19. **`DEPLOYMENT-CPANEL.md`** — Deployment guide (optional)

---

## 🎯 CARA COMPRESS (Manual)

### OPTION 1: Compress Semua Sekali (Recommended)
```
1. Pilih semua folder dan file di atas
2. Right-click → Send to → Compressed (zipped) folder
3. Atau gunakan WinRAR/7-Zip: Add to archive
4. Nama: scmwebsite-upload.zip
```

### OPTION 2: Compress Tanpa node_modules (Smaller, Install Nanti)
```
1. Compress semua KECUALI folder node_modules
2. Upload ke cPanel
3. Di cPanel terminal, run: npm install --production
```

---

## 📋 CHECKLIST SEBELUM COMPRESS

- [ ] **.next folder** ada dan lengkap (build output)
- [ ] **server.js** ada (startup script)
- [ ] **package.json** dan **package-lock.json** ada
- [ ] **.env.production** ada dengan environment variables yang betul
- [ ] **.htaccess** ada (untuk Apache proxy)
- [ ] **next.config.ts** ada dengan `output: 'standalone'`

---

## ⚠️ PENTING: Jangan Include Ini

❌ `.git` folder (version control, tak perlu)
❌ `.env.local` atau `.env.development.local` (development only)
❌ `AGENTS.md`, `CLAUDE.md` (documentation, tak perlu di server)
❌ `deploy.ps1` (deployment script, Windows only)
❌ `app.zip` (old zip file)

---

## 📤 LEPAS COMPRESS

1. **Upload ke cPanel** via File Manager
2. **Extract** di folder `/home/malaysiadev/scm.malaysiadev.com`
3. **Set Node.js App** startup file to: `server.js`
4. **Environment Variables** dalam cPanel Node.js App:
   ```
   NODE_ENV=production
   PORT=3000
   ```
5. **Restart** application
6. **Test** di browser: https://scm.malaysiadev.com

---

## 🔍 VERIFY AFTER UPLOAD

Di cPanel Terminal:
```bash
cd /home/malaysiadev/scm.malaysiadev.com
ls -la | grep -E "server.js|package.json|.next"
```

Pastikan:
- ✅ `server.js` ada
- ✅ `package.json` ada
- ✅ `.next` folder ada
- ✅ `node_modules` ada (atau install dengan `npm install`)

---

## 📊 SIZE ESTIMATION

- **With node_modules**: ~500 MB - 1 GB
- **Without node_modules**: ~50 MB - 200 MB (recommended untuk upload lebih cepat)

Jika tanpa node_modules, run di server:
```bash
source /home/malaysiadev/nodevenv/scm.malaysiadev.com/24/bin/activate
npm install --production
```

---

## 💡 TIPS

1. **Gunakan WinRAR atau 7-Zip** untuk compress - lebih cepat dari Windows built-in
2. **Set compression level to "Normal"** - balance between size dan speed
3. **Kalau upload lambat**, compress tanpa node_modules, install di server
4. **Test locally dulu** sebelum upload: `npm run build` then `npm run start`

---

## 🆘 JIKA ADA MASALAH

### White screen lepas upload:
```bash
# Check build ID
cat .next/BUILD_ID

# Check static files
ls -la .next/static/

# Check server log
tail -f ~/logs/scm.malaysiadev.com.log
```

### 404 errors pada CSS/JS:
- Pastikan `.next` folder lengkap
- Pastikan `.htaccess` ada
- Restart Node.js App di cPanel

### Port already in use:
- Restart application di cPanel Node.js interface
- Atau tukar PORT environment variable

---

**Siap untuk compress dan upload! 🚀**
