// Guestbook 관련 타입 정의

export interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
  is_hidden: boolean;
}

// API 응답용 (비밀번호 제외)
export interface GuestbookPublic {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
}

// 답글 타입 (Admin 전용)
export interface GuestbookReplyType {
  id: number;
  guestbook_id: number;
  message: string;
  created_at: string;
}

// 답글 포함된 방명록
export interface GuestbookWithReplies extends GuestbookPublic {
  replies: GuestbookReplyType[];
}

// 작성 입력
export interface GuestbookInput {
  nickname: string;
  pin: string;
  message: string;
}

// 삭제 요청
export interface GuestbookDeleteRequest {
  id: string;
  pin: string;
}
