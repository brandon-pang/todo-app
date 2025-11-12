# 📂 프로젝트 구조 상세 가이드

## 전체 디렉토리 구조

```
todo-nextjs-app/
│
├── 📱 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root Layout (메타데이터, HTML 구조)
│   ├── page.tsx                     # 메인 페이지 (모든 컴포넌트 통합)
│   └── globals.css                  # Tailwind CSS + 커스텀 스타일
│
├── 🧩 components/                   # React 컴포넌트
│   ├── Header.tsx                   # 헤더 + 통계 대시보드
│   ├── TodoInput.tsx                # 할 일 입력 폼
│   ├── TodoFilters.tsx              # 필터, 정렬, 검색
│   ├── TodoItem.tsx                 # 개별 할 일 카드
│   └── TodoList.tsx                 # 할 일 목록 컨테이너
│
├── 🪝 hooks/                        # Custom React Hooks
│   └── useTodos.ts                  # 할 일 관리 로직
│
├── 📚 lib/                          # 유틸리티 & 라이브러리
│   ├── storage.ts                   # LocalStorage 관리
│   └── utils.ts                     # 헬퍼 함수들
│
├── 📝 types/                        # TypeScript 타입 정의
│   └── todo.ts                      # Todo 인터페이스 & 타입
│
├── ⚙️ 설정 파일들
│   ├── package.json                 # 의존성 & 스크립트
│   ├── tsconfig.json                # TypeScript 설정
│   ├── tailwind.config.js           # Tailwind CSS 설정
│   ├── postcss.config.js            # PostCSS 설정
│   ├── next.config.js               # Next.js 설정
│   └── .gitignore                   # Git 무시 파일
│
└── 📖 문서
    └── README.md                    # 프로젝트 문서
```

## 컴포넌트 의존성 그래프

```
page.tsx (메인)
    │
    ├─── Header.tsx
    │      └─── stats (통계 데이터)
    │
    ├─── TodoInput.tsx
    │      ├─── categories (카테고리 목록)
    │      └─── existingTags (기존 태그)
    │
    ├─── TodoFilters.tsx
    │      ├─── filter, sortBy, searchQuery (상태)
    │      ├─── categories (카테고리)
    │      └─── onExport, onImport (액션)
    │
    └─── TodoList.tsx
           └─── TodoItem.tsx (개별 아이템)
                  ├─── todo (할 일 데이터)
                  └─── onToggle, onDelete, onUpdate (액션)
```

## 데이터 흐름

```
useTodos Hook (중앙 상태 관리)
    │
    ├─── LocalStorage
    │       ├─── loadTodos() → 초기 로드
    │       └─── saveTodos() → 자동 저장
    │
    ├─── State
    │       ├─── todos (할 일 목록)
    │       ├─── filter (필터 상태)
    │       ├─── sortBy (정렬 방식)
    │       └─── searchQuery (검색어)
    │
    ├─── Actions
    │       ├─── addTodo()
    │       ├─── updateTodo()
    │       ├─── toggleTodo()
    │       ├─── deleteTodo()
    │       ├─── deleteCompleted()
    │       └─── duplicateTodo()
    │
    └─── Computed
            ├─── getFilteredTodos()
            ├─── stats
            ├─── categories
            └─── tags
```

## 파일별 상세 설명

### 📱 app/layout.tsx
**역할**: 애플리케이션 루트 레이아웃
- HTML 구조 정의
- 메타데이터 설정 (제목, 설명, 키워드)
- 전역 스타일 임포트
- 다국어 설정 (lang="ko")

**주요 코드**:
```typescript
export const metadata: Metadata = {
  title: 'Todo App - 할 일 관리',
  description: 'Next.js와 TypeScript로 만든 강력한 할 일 관리 앱',
}
```

### 📱 app/page.tsx
**역할**: 메인 페이지 컴포넌트
- 모든 컴포넌트 통합
- useTodos 훅 사용
- 이벤트 핸들러 정의
- 데이터 흐름 관리

**주요 기능**:
- 할 일 추가/수정/삭제 처리
- 내보내기/가져오기 로직
- 로딩 상태 관리

### 📱 app/globals.css
**역할**: 전역 스타일
- Tailwind CSS 임포트
- 커스텀 애니메이션
- 스크롤바 스타일
- 포커스 스타일

---

### 🧩 components/Header.tsx
**Props**:
```typescript
interface HeaderProps {
  stats: TodoStats;
}
```

**기능**:
- 앱 타이틀 표시
- 통계 카드 (전체/완료/높은 우선순위/지연)
- 그라데이션 배경
- 반응형 그리드

**Tailwind 클래스**:
- `bg-gradient-to-r from-purple-600 to-indigo-600`
- `grid grid-cols-2 md:grid-cols-4`

---

### 🧩 components/TodoInput.tsx
**Props**:
```typescript
interface TodoInputProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  categories: string[];
  existingTags: string[];
}
```

**기능**:
- 제목 입력 (필수)
- 설명 입력 (선택)
- 고급 옵션 토글
  - 마감일 선택
  - 카테고리 입력 (자동완성)
  - 태그 추가/제거
- 우선순위 선택
- 폼 검증

**State**:
- `title`, `description`
- `priority`, `dueDate`
- `category`, `tags`
- `showAdvanced`

---

### 🧩 components/TodoFilters.tsx
**Props**: 필터링, 정렬, 검색 관련 모든 상태와 핸들러

**기능**:
- 검색 바
- 필터 버튼 (전체/진행중/완료)
- 정렬 드롭다운
- 카테고리 선택
- 액션 버튼 (내보내기/가져오기/완료 항목 삭제)

**UI 특징**:
- 반응형 레이아웃
- 활성 필터 강조
- 아이콘 통합 (Lucide React)

---

### 🧩 components/TodoItem.tsx
**Props**:
```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDuplicate: (id: string) => void;
}
```

**기능**:
- 보기 모드 / 수정 모드 전환
- 완료 체크박스
- 인라인 수정
- 우선순위 배지
- 마감일 알림 (지연/임박)
- 카테고리 & 태그 표시
- 액션 버튼 (수정/복사/삭제)

**State**:
- `isEditing`
- `editTitle`, `editDescription`
- `editPriority`, `editDueDate`

**시각적 표시**:
- 완료 항목: 투명도 감소, 취소선
- 지연: 빨강 강조
- 임박: 주황 강조

---

### 🧩 components/TodoList.tsx
**Props**:
```typescript
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDuplicate: (id: string) => void;
  searchQuery: string;
}
```

**기능**:
- TodoItem 렌더링
- 빈 상태 처리
- 애니메이션 효과

---

### 🪝 hooks/useTodos.ts
**반환값**:
```typescript
{
  todos,              // 필터링/정렬된 할 일
  allTodos,           // 전체 할 일
  filter,             // 현재 필터
  setFilter,
  sortBy,             // 현재 정렬
  setSortBy,
  searchQuery,        // 검색어
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isLoading,
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  deleteAll,
  duplicateTodo,
  stats,              // 통계 객체
  categories,         // 카테고리 목록
  tags,               // 태그 목록
}
```

**내부 로직**:
1. LocalStorage에서 로드
2. 상태 변경 시 자동 저장
3. 필터링 & 정렬 적용
4. 통계 계산

---

### 📚 lib/storage.ts
**함수**:
- `loadTodos()`: LocalStorage에서 로드
- `saveTodos(todos)`: LocalStorage에 저장
- `clearAllTodos()`: 모든 데이터 삭제
- `exportTodos(todos)`: JSON 파일로 내보내기
- `importTodos(file)`: JSON 파일에서 가져오기

**저장 키**: `'todos'`

---

### 📚 lib/utils.ts
**유틸리티 함수**:
- `getPriorityColor()`: 우선순위 색상 클래스
- `getPriorityTextColor()`: 우선순위 텍스트 색상
- `getPriorityLabel()`: 우선순위 라벨 (한글)
- `isOverdue()`: 마감일 지연 여부
- `isDueSoon()`: 마감일 임박 여부 (3일 이내)
- `formatDate()`: 날짜 포맷팅 (오늘/내일/날짜)
- `filterTodos()`: 필터링 로직
- `sortTodos()`: 정렬 로직
- `generateId()`: 고유 ID 생성

---

### 📝 types/todo.ts
**타입 정의**:
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

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'createdAt' | 'dueDate' | 'priority';
type PriorityType = 'high' | 'medium' | 'low';

interface TodoStats {
  total: number;
  completed: number;
  active: number;
  highPriority: number;
  overdue: number;
}
```

---

## 설정 파일 설명

### package.json
**의존성**:
- `next`: Next.js 프레임워크
- `react`, `react-dom`: React 라이브러리
- `lucide-react`: 아이콘
- `typescript`: TypeScript
- `tailwindcss`: CSS 프레임워크

**스크립트**:
- `dev`: 개발 서버
- `build`: 프로덕션 빌드
- `start`: 프로덕션 서버

### tsconfig.json
TypeScript 컴파일러 옵션
- strict 모드 활성화
- path alias: `@/*`

### tailwind.config.js
Tailwind CSS 커스터마이징
- 커스텀 색상
- 커스텀 애니메이션

---

## 코드 컨벤션

### 파일명
- 컴포넌트: PascalCase (Header.tsx)
- 유틸리티: camelCase (storage.ts)
- 타입: camelCase (todo.ts)

### 컴포넌트
- 함수형 컴포넌트
- TypeScript Props 인터페이스
- 명확한 함수명

### 스타일링
- Tailwind CSS 유틸리티 클래스
- 반응형: sm:, md:, lg: 접두사

### 상태 관리
- Custom Hooks
- useState, useEffect
- useCallback, useMemo (최적화)

---

이 구조는 확장 가능하고 유지보수하기 쉽게 설계되었습니다! 🚀
