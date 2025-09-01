import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FormTambah from "../../components/form/form-user/FormTambah";
import TableUser from "../../components/tables/BasicTables/TableUser";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { deleteUser, getUser } from "../../services/api";
import Swal from "sweetalert2";

export default function DataUser() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const loadDB = async () => {
    try {
      const res = await getUser(token);
      setData(res.data);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    loadDB();
  }, []);

  const handleSuccess = () => {
    closeModal();   // Tutup modal tambah
    loadDB();       // Refresh tabel
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Ingin Menghapus User?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          console.log("ID yang ingin dihapus:", id);
          console.log("Semua data sebelum filter:", data);
          setData((prev) => {
            const newData = prev.filter((item) => item.id != id); // pakai != untuk antisipasi string vs number
            console.log("Data sesudah filter:", newData);
          }); // Hapus dari UI
          await deleteUser(id, token);
          loadDB();
          Swal.fire("Berhasil Menghapus!", "", "success");
        } catch (error) {
          Swal.fire("Gagal menghapus!", "", "error");
          loadDB();
          console.error("Gagal menghapus:", error);
        }
      }
    });

  };
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Data User" />
      <div className="space-y-6">
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <FormTambah title="Tambah User" onSuccess={handleSuccess} />
        </Modal>
        <ComponentCard
          title={
            <Button onClick={openModal} size="sm" variant="primary">
              Tambah User
            </Button>
          }
        >
          <TableUser data={data} onDelete={handleDelete} onEdit={loadDB} />
        </ComponentCard>
      </div>
    </div>
  );
}
