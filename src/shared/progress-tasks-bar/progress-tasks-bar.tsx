// stores/useTaskProgressStore.ts
import { create } from 'zustand';
import { CircularProgress, Heading, Portal, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

type Task = {
  id: string;
  label: string;
  progress?: number; // from 0 to 100
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
};

type TaskStore = {
  tasks: Task[];
  startTask: (task: Omit<Task, 'status'>) => void;
  updateTask: (id: string, update: Partial<Task>) => void;
  completeTask: (id: string) => void;
  failTask: (id: string) => void;
  removeTasks: (ids: string[]) => void;
};

export const useTaskProgressStore = create<TaskStore>(set => ({
  tasks: [],
  startTask: task =>
    set(state => ({
      tasks: [...state.tasks, { ...task, status: 'pending' }]
    })),
  updateTask: (id, update) =>
    set(state => ({
      tasks: state.tasks.map(t => (t.id === id ? { ...t, ...update } : t))
    })),
  completeTask: id =>
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === id ? { ...t, status: 'completed', progress: 100 } : t
      )
    })),
  failTask: id =>
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === id ? { ...t, status: 'failed', progress: 100 } : t
      )
    })),
  removeTasks: (ids: string[]) =>
    set(state => ({
      tasks: state.tasks.filter(t => ids.includes(t.id))
    }))
}));

export function TaskProgressBar() {
  const tasks = useTaskProgressStore(s => s.tasks);
  const removeTasks = useTaskProgressStore(s => s.removeTasks);

  if (tasks.length === 0) return null;

  return (
    <Portal>
      <div className="fixed bottom-12 right-12 w-96 bg-white shadow-2xl z-[999] px-6 py-6">
        <FontAwesomeIcon
          className={'absolute right-8 w-3 h-3 cursor-pointer'}
          icon={faX}
          onClick={() => removeTasks([])}
        />

        <div className={'space-y-4'}>
          <Heading as="h4" size="md">
            Task Progress
          </Heading>

          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="flex space-x-2 items-center justify-between"
            >
              <Text fontSize={'md'}>
                <span>{index + 1}.</span> {task.label}
              </Text>

              <CircularProgress
                size={'24px'}
                value={task.progress}
                color={
                  {
                    failed: 'red',
                    'in-progress': 'blue',
                    completed: 'green',
                    pending: 'grey'
                  }[task.status]
                }
              />
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
}
