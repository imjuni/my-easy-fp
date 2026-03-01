// JSR 패키지 테스트
import { atOrThrow, chunk, last, populate } from 'jsr:@imjuni/my-easy-fp';

console.log('=== JSR 패키지 테스트 ===');

try {
  // 기본 함수들 테스트
  const array = [1, 2, 3, 4, 5];

  console.log('Original array:', array);
  console.log('atOrThrow(array, 2):', atOrThrow(array, 2));
  console.log('last(array):', last(array));
  console.log('chunk(array, 2):', chunk(array, 2));
  console.log('populate(5):', populate(5));

  console.log('✅ JSR 패키지 테스트 성공!');
} catch (error) {
  console.error('❌ JSR 패키지 테스트 실패:', error);
}