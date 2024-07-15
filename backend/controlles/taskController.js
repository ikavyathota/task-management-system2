const pool = require('../connect');

exports.createTask = async (req, res) => {
    const { title, description, dueDate, status,  assignedTo, category, createdBy } = req.body;
    try {
        await pool.execute(
            
            "INSERT INTO tasks (title, description, dueDate, status, assignedTo, category, createdBy) VALUES (?, ?, ?,?, ?, ?, ?)",
    [title, description, dueDate, status, assignedTo, category, createdBy]

        );
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Task creation failed', error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM tasks');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks', error });
    }
};


exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve task', error });
    }
};


exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, status, assignedTo } = req.body;

  
    let formattedDueDate = dueDate;
    if (dueDate) {
        formattedDueDate = new Date(dueDate).toISOString().slice(0, 19).replace('T', ' ');
    }

    const fieldsToUpdate = {};
    if (title) fieldsToUpdate.title = title;
    if (description) fieldsToUpdate.description = description;
    if (formattedDueDate) fieldsToUpdate.dueDate = formattedDueDate;
    if (status) fieldsToUpdate.status = status;
    if (assignedTo) fieldsToUpdate.assignedTo = assignedTo;

    const setClause = Object.keys(fieldsToUpdate)
        .map(key => `${key} = ?`)
        .join(', ');
    const sqlValues = [...Object.values(fieldsToUpdate), taskId];

    if (!setClause) {
        return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    try {
        await pool.execute(
            `UPDATE tasks SET ${setClause} WHERE id = ?`,
            sqlValues
        );
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Task update failed', error: error.message });
    }
};



exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        await pool.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Task deletion failed', error });
    }
};


exports.deleteSelectedTask = async (req, res) => {
    const { taskIds } = req.body;

    if (!Array.isArray(taskIds)) {
        return res.status(400).json({ message: 'Task IDs should be an array.' });
    }

    try {
      
        const placeholders = taskIds.map(() => '?').join(',');
        const query = `DELETE FROM tasks WHERE id IN (${placeholders})`;

        await pool.execute(query, taskIds);

        res.status(200).json({ message: 'Selected tasks deleted successfully.' });
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).json({ message: 'An error occurred while deleting tasks.' });
    }
};
  