# Netlify 배포 가이드

## 🚀 배포 방법

### 옵션 1: GitHub 연동 (추천)

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push
   ```

2. **Netlify에서 새 사이트 생성**
   - https://app.netlify.com/ 접속
   - [Add new site] → [Import an existing project] 클릭
   - GitHub 연결 및 저장소 선택 (`bubilife1202/dailylog`)
   - 브랜치 선택: `claude/life-debugger-planning-011CURvdbRfZquqUUcyhNEGk`

3. **빌드 설정 확인**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (netlify.toml이 있으므로 자동 설정됨)

4. **[Deploy site]** 클릭!

### 옵션 2: Netlify CLI로 배포

1. **Netlify CLI 설치**
   ```bash
   npm install -g netlify-cli
   ```

2. **로그인**
   ```bash
   netlify login
   ```

3. **배포**
   ```bash
   # 첫 배포
   netlify deploy --prod

   # 또는 수동으로 dist 폴더 업로드
   npm run build
   netlify deploy --dir=dist --prod
   ```

---

## 🌐 커스텀 도메인 설정 (lifecode)

### 1. Netlify에서 도메인 추가

1. Netlify 대시보드 → 사이트 선택
2. **Domain management** 클릭
3. **Add a domain** 클릭
4. `lifecode.yourdomain.com` 입력

### 2. DNS 설정

#### 서브도메인 (lifecode.yourdomain.com)

도메인 관리 페이지에서 DNS 레코드 추가:

**CNAME 레코드:**
```
Name: lifecode
Type: CNAME
Value: [your-netlify-site-name].netlify.app
TTL: 3600 (또는 Auto)
```

예시:
```
lifecode.yourdomain.com → cozac-lifecode.netlify.app
```

#### 확인 대기
- DNS 전파는 최대 48시간 소요 (보통 10-30분)
- `nslookup lifecode.yourdomain.com`으로 확인

### 3. HTTPS 활성화 (자동)

Netlify는 Let's Encrypt를 사용하여 자동으로 HTTPS를 설정합니다.
- 도메인 연결 후 자동으로 SSL 인증서 발급
- 몇 분 내에 `https://lifecode.yourdomain.com` 접속 가능

---

## 📋 배포 체크리스트

### 배포 전
- [x] 프로덕션 빌드 테스트 (`npm run build`)
- [x] TypeScript 오류 수정
- [x] Tailwind CSS v3로 다운그레이드
- [x] netlify.toml 설정 파일 작성
- [ ] 환경 변수 확인 (현재는 없음)
- [ ] 민감 정보 제거 확인

### 배포 후
- [ ] 사이트 접속 테스트
- [ ] 온보딩 → Base Code → Daily Log 플로우 테스트
- [ ] localStorage 동작 확인
- [ ] 데이터 백업/복구 기능 테스트
- [ ] 모바일 반응형 테스트
- [ ] 리포트 복사 기능 테스트
- [ ] 브라우저 호환성 테스트 (Chrome, Safari, Firefox)

### 도메인 연결 후
- [ ] `https://lifecode.yourdomain.com` 접속 확인
- [ ] SSL 인증서 확인 (자물쇠 아이콘)
- [ ] 리다이렉트 확인 (http → https)
- [ ] 모든 페이지 라우팅 확인

---

## 🔧 문제 해결

### 빌드 실패 시

**문제:** `npm run build` 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

**문제:** Tailwind CSS 오류
```bash
# Tailwind v3 확인
npm list tailwindcss

# 재설치
npm uninstall tailwindcss
npm install -D tailwindcss@^3
```

### 404 에러

**문제:** `/daily-log` 같은 라우트 접속 시 404

**해결:** netlify.toml의 리다이렉트 규칙 확인
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### DNS 전파 안 됨

**문제:** 도메인이 연결되지 않음

**확인:**
```bash
# DNS 레코드 확인
nslookup lifecode.yourdomain.com

# 또는
dig lifecode.yourdomain.com
```

**해결:**
- CNAME 레코드가 제대로 설정되었는지 확인
- 24-48시간 대기
- DNS 캐시 초기화: `ipconfig /flushdns` (Windows) 또는 `sudo dscacheutil -flushcache` (Mac)

---

## 🎯 배포 후 최적화

### 1. Netlify 기능 활용

**빌드 훅 (Build Hooks):**
- 자동 배포 트리거 URL 생성 가능

**환경 변수:**
- 필요 시 API 키 등 설정
- (현재는 100% 클라이언트 사이드라 불필요)

**Split Testing:**
- A/B 테스트 가능

### 2. 성능 최적화

**Asset Optimization (Netlify 자동 적용):**
- Minification
- Gzip/Brotli 압축
- CDN 캐싱

**이미지 최적화:**
- public/ 폴더에 이미지가 있다면 최적화
- WebP 포맷 사용 권장

### 3. 분석 추가 (선택)

**Netlify Analytics:**
- 월 $9 (유료)
- 서버 사이드 분석 (광고 차단기 우회)

**Google Analytics (무료):**
- GA4 스크립트 추가
- index.html에 삽입

---

## 📊 예상 성능

### Lighthouse 점수 목표
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 95+

### 번들 크기
- index.html: ~0.5KB
- CSS: ~20KB (gzip: ~4KB)
- JS: ~260KB (gzip: ~82KB)

**총 초기 로드:** ~90KB (gzip)

---

## 🔐 보안 체크리스트

- [x] localStorage만 사용 (서버 없음)
- [x] HTTPS 강제 (Netlify 자동)
- [x] XSS 방어 (React 기본 제공)
- [x] CORS 정책 (클라이언트 사이드라 해당 없음)
- [ ] Content Security Policy (선택, 추후 추가 가능)

---

## 📞 지원

### 문제 발생 시
1. Netlify 빌드 로그 확인: https://app.netlify.com/[site-name]/deploys
2. 브라우저 콘솔 확인 (F12)
3. GitHub Issues에 문의

### 유용한 링크
- Netlify 문서: https://docs.netlify.com/
- Netlify 상태 페이지: https://www.netlifystatus.com/
- Vite 문서: https://vitejs.dev/guide/

---

**배포 완료 후 이 문서 업데이트:**
- [ ] 실제 Netlify 사이트 URL 기록
- [ ] 커스텀 도메인 URL 기록
- [ ] 배포 날짜 기록
