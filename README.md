# LMS tutorial 프로젝트

본 프로젝트는 [Code With Antonio](https://www.codewithantonio.com/) 강의 내용을 기반으로 만들어진 프로젝트입니다.

## 사용 기술

- Next.js 13 (app router)
- next-auth (auth)
- prisma (ORM)
- uploadthing (file upload)
- PlanetScale (database:SQL)
- stripe (payment)
- shadcn-ui (ui)
- tailwindcss (css)
- zustand (state management)

## 각종 명령어 모음

### stripe 결제 시스템 테스트

```bash
 listen --forward-to localhost:3000/api/webhook
```

### prisma 관련 명령어

```bash
npx prisma generate

npx prisma migrate reset

npx prisma db push

node scripts/seed.ts

npm run dev
```

## 오류 발생시

- prisma 타입 인식을 못하는 부분
  - prisma에서 type을 불러오지 못하는 문제
  - next, prisma, typescript 버전 을 모두 변경해보았으나 해결되지 않음
  - 아래 방법으로 해결됨 (사실상 코드에서의 변화는 없으므로, 캐싱 관련 문제로 보임)
  - 해결 방법
    - package.json 을 다른곳에 복사해둠
    - package.json, node_modules, package.lock.json 삭제
    - [수업 내용](https://github.com/AntonioErdeljac/next13-lms-platform)에 있는 package.json 가져와서 프로젝트에 붙여넣기
    - npm i 실행
    - package.json, node_modules, package.lock.json 삭제
    - 기존 복사해두었던 package.json 가져와서 프로젝트에 붙여넣기
    - npm i 실행
    - npx prisma generate 실행
    - 정상 작동함
