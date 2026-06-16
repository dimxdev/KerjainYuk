import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";
import { useTasks } from "../../hooks/useTasks";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const { getTask, editTask } = useTasks();
  const navigate = useNavigate();

  const task = id ? getTask(id) : undefined;

  if (!task) {
    return (
      <section className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold">Tugas tidak ditemukan</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Tugas mungkin sudah dihapus atau dipindah ke riwayat.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Kembali ke Dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold">Edit Tugas</h1>
      <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">
        Ubah detail tugasmu.
      </p>
      <TaskForm
        initial={{
          title: task.title,
          categoryId: task.categoryId,
          deadline: task.deadline,
        }}
        submitLabel="Simpan Perubahan"
        onSubmit={(input) => {
          editTask(task.id, input);
          navigate("/");
        }}
        onCancel={() => navigate("/")}
      />
    </section>
  );
}
