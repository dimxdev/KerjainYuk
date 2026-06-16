import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";
import { useTasks } from "../../hooks/useTasks";

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold">Tambah Tugas</h1>
      <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">
        Catat cepat, biar nggak lupa.
      </p>
      <TaskForm
        submitLabel="Simpan Tugas"
        onSubmit={(input) => {
          addTask(input);
          navigate("/");
        }}
        onCancel={() => navigate("/")}
      />
    </section>
  );
}
