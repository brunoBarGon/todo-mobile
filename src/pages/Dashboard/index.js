import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text } from 'react-native';
import api from '../../services/api';

// import { Title, Resumo } from './styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const tasks_qtd = useMemo(() => tasks.length, [tasks]);

  const tasks_concluded_qtd = useMemo(
    () => {
      const filtered = tasks.filter(task => {
        return task.concluido === true;
      })

      return filtered.length;
    },
    [tasks],
  )

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`tarefas`);
      console.log("tarefas", response.data);
      setTasks(response.data);
    },[],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);


  return (
    <>
      <Text>Dashboard</Text>
    </>
  )
}

export default Dashboard;