import AdminSidebar from '../_components/AdminSidebar';
import AdminHeader from '../_components/AdminHeader';
import styles from '../admin.module.scss';

export const metadata = {
  title: 'Admin | whosbax',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <div className={styles.headerWrapper}>
          <AdminHeader />
        </div>
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
}
