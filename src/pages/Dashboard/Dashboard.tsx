import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../../components/task/TaskList";
import MotivationBanner from "../../components/motivation/MotivationBanner";
import StatsSummary from "../../components/statistics/StatsSummary";
import { formatDateFull } from "../../utils/formatter";

export default function Dashboard() {
  const { tasks, history, deleteTask, completeTask } = useTasks();
  const navigate = useNavigate();

  function handleDelete(id: string) {
    if (window.confirm("Hapus tugas ini?")) {
      deleteTask(id);
    }
  }

  const completedCount = history.filter((h) => h.status === "completed").length;
  const missedCount = history.filter((h) => h.status === "missed").length;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">📅</span>
        <p className="text-sm font-medium capitalize text-slate-600 dark:text-slate-300">
          {formatDateFull(new Date().toISOString())}
        </p>
      </div>

      <MotivationBanner />

      <StatsSummary
        activeCount={tasks.length}
        completedCount={completedCount}
        missedCount={missedCount}
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tugas Aktif</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {tasks.length > 0
              ? `${tasks.length} tugas menunggu diselesaikan.`
              : "Belum ada tugas aktif."}
          </p>
        </div>
        <Link
          to="/add"
          className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-fuchsia-500/30 transition-all hover:shadow-md hover:brightness-110"
        >
          + Tambah
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/70">
          <p className="text-4xl">📝</p>
          <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
            Belum ada tugas
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Yuk catat tugas pertamamu sekarang!
          </p>
          <Link
            to="/add"
            className="mt-4 inline-block rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-fuchsia-500/30 transition-all hover:shadow-md hover:brightness-110"
          >
            Tambah Tugas
          </Link>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onComplete={completeTask}
          onEdit={(id) => navigate(`/edit/${id}`)}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
