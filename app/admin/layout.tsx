import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shoepedi Admin Dashboard",
  description: "Admin to manage products",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
