'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/shared/lib/supabase-browser';
import CustomModal from './CustomModal';
import styles from './secretAdminCopyright.module.scss';

export default function SecretAdminCopyright() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      router.push('/admin');
    } else {
      setIsOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    router.push('/admin');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span className={styles.copyright} onClick={handleClick}>
        © whosbax
      </span>

      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Admin Access"
        message="관리자 페이지로 이동하시겠습니까?"
        cancelText="취소"
        confirmText="이동"
      />
    </>
  );
}
