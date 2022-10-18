import { v4 as uuid } from "uuid";
import { getConnection } from "../database.js";

export const getTasks = (req, res) => {
  const db = getConnection();

  res.json(db.data.tasks);
};

export const createTask = async (req, res) => {
  const newTask = {
    id: uuid().slice(0, 4),
    name: req.body.name,
  };

  try {
    const db = getConnection();

    db.data.tasks.push(newTask);
    await db.write();

    res.json(newTask);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getTask = (req, res) => {
  const taskFound = getConnection().data.tasks.find(
    (el) => el.id === req.params.id
  );
  if (!taskFound) return res.sendStatus(404);
  res.json(taskFound);
};

export const count = (req, res) => {
  const allTasks = getConnection().data.tasks.length;

  res.send(`Cantidad de tareas: ${allTasks}`);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const db = getConnection();
  const taskFound = db.data.tasks.find((t) => t.id === id);
  if (!taskFound) return res.sendStatus(404);

  taskFound.name = name;

  db.data.tasks.map((t) => (t.id === id ? taskFound : t));

  await db.write();

  res.json(taskFound);
};

export const deleteTask = async (req, res) => {
  const db = getConnection();
  const taskFound = db.data.tasks.find((t) => t.id === req.params.id);
  if (!taskFound) return res.sendStatus(404);

  const newTasks = db.data.tasks.filter((t) => t.id !== req.params.id);
  db.data.tasks = newTasks;

  await db.write();

  res.send("Task delete");
};
