import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FormTambah from "../../components/form/form-balas-otomatis/FormTambah";
import TableBalasOtomatis from "../../components/tables/BasicTables/TableBalasOtomatis";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { getBalasOtomatis, deleteBalasOtomatis } from "../../services/api";
import Swal from "sweetalert2";

export default function BalasOtomatis() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const loadDB = async () => {
    try {
      const res = await getBalasOtomatis(token);
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

  const handleDelete = async (id: number) => {
    Swal.fire({
          title: "Ingin Menghapus User?",
          showCancelButton: true,
          confirmButtonText: "Hapus",
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            try {
              setData((prev) => {
                const newData = prev.filter((item) => item.id != id); // pakai != untuk antisipasi string vs number
                console.log("Data sesudah filter:", newData);
              }); // Hapus dari UI
              await deleteBalasOtomatis(id, token);
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
      <PageMeta title="Balas Otomatis" description="Manajemen balasan otomatis" />
      <PageBreadcrumb pageTitle="Balas Otomatis" />
      <div className="space-y-6">
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <FormTambah title="Tambah Balas Otomatis" onSuccess={handleSuccess} />
        </Modal>

        <ComponentCard
          title={
            <Button onClick={openModal} size="sm" variant="primary">
              Tambah Balas Otomatis
            </Button>
          }
        >
          <TableBalasOtomatis data={data} onDelete={handleDelete} onEdit={loadDB} />
        </ComponentCard>
      </div>
    </div>
  );
}