document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(taskForm);
      const taskData = {};
      formData.forEach((value, key) => {
        taskData[key] = value;
      });
  
      fetch('/courses/' + taskData.courseId + '/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
      .then(response => response.json())
      .then(data => {
        taskList.innerHTML = '';
        data.forEach(task => {
          const taskItem = document.createElement('div');
          taskItem.innerHTML = `
            <p><strong>Task Name:</strong> ${task.taskName}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Additional Details:</strong> ${task.additionalDetails}</p>
            <hr>
          `;
          taskList.appendChild(taskItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  