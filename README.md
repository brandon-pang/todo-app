# 🚀 Next.js Todo App

TypeScript와 Tailwind CSS를 사용한 현대적인 할 일 관리 애플리케이션

## ✨ 주요 기능

### 핵심 기능
- ✅ **완전한 CRUD 작업**: 할 일 생성, 읽기, 수정, 삭제
- 🎯 **우선순위 관리**: 높음, 보통, 낮음 3단계
- 📅 **마감일 설정**: 날짜 선택 및 지연 알림
- 📁 **카테고리 분류**: 할 일을 카테고리별로 구분
- 🏷️ **태그 시스템**: 여러 태그로 할 일 분류
- ✏️ **인라인 수정**: 즉시 수정 가능한 UI

### 고급 기능
- 🔍 **실시간 검색**: 제목, 설명, 태그 검색
- 🎨 **필터링**: 전체/진행중/완료 상태별 필터
- 📊 **정렬**: 생성일, 마감일, 우선순위 기준 정렬
- 📈 **통계 대시보드**: 실시간 진행 상황 확인
- 💾 **로컬 저장소**: 브라우저 LocalStorage 자동 저장
- 📤 **내보내기/가져오기**: JSON 형식으로 데이터 백업
- 🔄 **할 일 복사**: 템플릿처럼 재사용
- 🗑️ **일괄 삭제**: 완료된 항목 한번에 삭제

### UX 기능
- 🎭 **애니메이션**: 부드러운 전환 효과
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- ⌨️ **키보드 단축키**: Enter로 빠른 추가
- 🔔 **시각적 피드백**: 마감일 임박 알림
- 🎨 **색상 코딩**: 우선순위별 색상 구분

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (Custom Hooks)
- **Storage**: Browser LocalStorage

## 📦 프로젝트 구조

```
todo-nextjs-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header with statistics
│   ├── TodoInput.tsx       # Input form with advanced options
│   ├── TodoFilters.tsx     # Filters and search
│   ├── TodoItem.tsx        # Individual todo item
│   └── TodoList.tsx        # Todo list container
├── hooks/
│   └── useTodos.ts         # Custom hook for todo management
├── lib/
│   ├── storage.ts          # LocalStorage utilities
│   └── utils.ts            # Helper functions
├── types/
│   └── todo.ts             # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

1. 저장소 클론 또는 프로젝트 다운로드

2. 의존성 설치:
```bash
npm install
# 또는
yarn install
```

3. 개발 서버 실행:
```bash
npm run dev
# 또는
yarn dev
```

4. 브라우저에서 열기: `http://localhost:3000`

### 빌드

프로덕션 빌드:
```bash
npm run build
npm start
```

## 📱 사용 방법

### 할 일 추가
1. 상단 입력 폼에 할 일 제목 입력
2. (선택) "고급 옵션"을 클릭하여 추가 정보 입력
   - 설명
   - 마감일
   - 카테고리
   - 태그
3. 우선순위 선택
4. "추가" 버튼 클릭 또는 Enter 키

### 할 일 관리
- **완료 표시**: 체크박스 클릭
- **수정**: "수정" 버튼 클릭
- **삭제**: "삭제" 버튼 클릭 (확인 필요)
- **복사**: "복사" 버튼으로 유사한 할 일 생성

### 필터링 및 검색
- **상태 필터**: 전체/진행중/완료됨 버튼
- **정렬**: 생성일순/마감일순/우선순위순
- **카테고리**: 드롭다운에서 선택
- **검색**: 검색창에 키워드 입력

### 데이터 관리
- **내보내기**: 모든 할 일을 JSON 파일로 저장
- **가져오기**: JSON 파일에서 할 일 불러오기
- **완료 항목 삭제**: 완료된 모든 항목 일괄 삭제

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.js`에서 색상 테마 수정:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 원하는 색상 값 입력
      },
    },
  },
}
```

### 저장소 변경
현재는 LocalStorage를 사용하지만, `lib/storage.ts`를 수정하여 다음으로 변경 가능:
- IndexedDB
- Backend API
- Firebase
- Supabase

## 📊 데이터 구조

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
```

## 🔧 향후 개선 사항

- [ ] 다크 모드
- [ ] 드래그 앤 드롭 정렬
- [ ] 반복 작업 (recurring tasks)
- [ ] 사용자 인증 및 클라우드 동기화
- [ ] 팀 협업 기능
- [ ] 알림 기능 (브라우저 알림)
- [ ] 작업 시간 추적
- [ ] 할 일 공유 기능
- [ ] PWA (Progressive Web App) 지원
- [ ] 다국어 지원

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 💡 팁

- **키보드 단축키**: Enter 키로 빠르게 할 일 추가
- **검색 팁**: 태그로 검색할 때 '#' 포함 가능
- **데이터 백업**: 정기적으로 내보내기 기능 사용 권장
- **성능**: 100개 이상의 항목이 있으면 완료된 항목 정리 권장

## 🐛 알려진 이슈

현재 알려진 주요 이슈는 없습니다. 문제 발견 시 이슈를 등록해주세요.

## 📞 연락처

프로젝트 관련 문의나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Happy Coding! 🎉**
