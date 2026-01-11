// Guestbook 관련 타입 정의

export interface GuestbookEntry {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
  is_hidden: boolean;
}

// API 응답용 (비밀번호 제외)
export interface GuestbookPublic {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
}

// 작성 입력
export interface GuestbookInput {
  nickname: string;
  password: string;
  message: string;
}

// 삭제 요청
export interface GuestbookDeleteRequest {
  id: string;
  password: string;
}
