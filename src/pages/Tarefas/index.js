import React, { useState, useEffect, useCallback } from 'react';
import { Text } from 'react-native';
// import { FiCircle, FiCheckCircle, FiDelete } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

// import { 
// } from './styles';

const Tarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`tarefas`);
      setTasks(response.data);
    },[],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = useCallback(
    async (event) => {
      event.preventDefault();

      if(newTask === "") {
        setErrorMessage("Digite a tarefa a ser adicionada");
        return;
      }

      setErrorMessage("");

      const params = {
        descricao: newTask,
        concluido: false
      };

      try {
        await api.post(`tarefas`, params);  
        
        loadTasks();
        setNewTask("");
      } catch (error) {
        console.log("error handleAddTask:", error);

        setErrorMessage("Ocorreu um erro ao adicionar tarefa");
      }
    },[loadTasks, newTask],
  );

  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        concluido: !task.concluido
      }
  
      await api.put(`tarefas/${task.id}`, params);
  
      loadTasks();
    },[loadTasks],
  );

  const removeTask = useCallback(
    async (task) => {
      await api.delete(`tarefas/${task.id}`);

      loadTasks();
    },[loadTasks],
  );

  return (
    <>
      <Text>Tarefas</Text>
    </>
  )
}

export default Tarefas;