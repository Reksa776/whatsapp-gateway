import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableKategori from "../../components/tables/BasicTables/TableKategori";
import Button from "../../components/ui/button/Button";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import FormEdit from "../../components/form/form-kategori/FormEdit";
import FormTambah from "../../components/form/form-kategori/FormTambah";
import { useEffect, useState } from "react";
import { deleteKategori, getKategori } from "../../services/api";
import Swal from "sweetalert2";

export default function DaftarKategori() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const loadDB = async () => {
    try {
      const res = await getKategori(token);
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
          setData((prev) => {
            const newData = prev.filter((item) => item.id != id); // pakai != untuk antisipasi string vs number
            console.log("Data sesudah filter:", newData);
          }); // Hapus dari UI
          await deleteKategori(id, token);
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
        title="Daftar Ketegori"
        description="Daftar Kategori"
      />
      <PageBreadcrumb pageTitle="Daftar Kategori" />

      <div className="space-y-6">
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        ><FormTambah title="Tambah Kategori" onSuccess={handleSuccess}></FormTambah></Modal>
        <ComponentCard title={
          <Button onClick={openModal} size="sm" variant="primary">
            Tambah Kategori
          </Button>
        }>
          <TableKategori data={data} onDelete={handleDelete} onEdit={loadDB} />
        </ComponentCard>
      </div>
    </div>
  );
}
