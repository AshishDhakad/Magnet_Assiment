{role === "admin" && (
  <select
    onChange={async (e) => {
      await API.patch(`/tasks/${task._id}/assign`, {
        userId: e.target.value
      });
      fetchTasks(page);
    }}
    defaultValue=""
  >
    <option value="" disabled>Assign user</option>
    {users.map(user => (
      <option key={user._id} value={user._id}>
        {user.name}
      </option>
    ))}
  </select>
)}
