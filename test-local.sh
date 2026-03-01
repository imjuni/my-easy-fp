#!/bin/bash

echo "🧪 로컬 패키지 테스트 시작"

# 1. 패키지 빌드
echo "📦 패키지 빌드 중..."
npm run bundle

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

# 2. npm pack으로 로컬 패키지 생성
echo "📦 npm pack으로 로컬 패키지 생성 중..."
npm pack

if [ $? -ne 0 ]; then
    echo "❌ npm pack 실패"
    exit 1
fi

# 3. 테스트 프로젝트로 이동
cd test-project

# 4. 기존 의존성 정리
echo "🧹 기존 의존성 정리 중..."
rm -rf node_modules package-lock.json
rm -f my-easy-fp-*.tgz

# 5. 로컬 패키지 복사 및 설치
echo "📦 로컬 패키지 설치 중..."
cp ../my-easy-fp-*.tgz ./
PACKAGE_FILE=$(ls my-easy-fp-*.tgz)
npm install "./$PACKAGE_FILE"

if [ $? -ne 0 ]; then
    echo "❌ 로컬 패키지 설치 실패"
    cd ..
    exit 1
fi

# 6. npm 패키지 테스트
echo "🧪 npm 패키지 테스트 중..."
npm run test-npm

if [ $? -ne 0 ]; then
    echo "❌ npm 패키지 테스트 실패"
    cd ..
    exit 1
fi

# 7. 정리
cd ..
rm -f my-easy-fp-*.tgz
rm -f test-project/my-easy-fp-*.tgz

echo "✅ 로컬 패키지 테스트 완료!"