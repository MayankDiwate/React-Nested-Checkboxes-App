const UserDetails = () => {
  const userData = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userData!);

  return (
    <div className="bg-slate-50 p-2 rounded-md">
      <div className="font-bold text-lg">{parsedUserData.name}</div>
      <div className="text-sm">{parsedUserData.email}</div>
      <div className="text-sm">{parsedUserData.phone}</div>
    </div>
  );
};

export default UserDetails;
