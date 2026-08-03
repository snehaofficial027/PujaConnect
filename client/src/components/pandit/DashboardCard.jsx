const DashboardCard = ({
  title,
  value,
  icon,
  color = "orange",
}) => {

  const colors = {
    orange:
      "bg-orange-100 text-orange-600",

    green:
      "bg-green-100 text-green-600",

    blue:
      "bg-blue-100 text-blue-600",

    yellow:
      "bg-yellow-100 text-yellow-600",

    purple:
      "bg-purple-100 text-purple-600",

    emerald:
      "bg-emerald-100 text-emerald-600",
  };

  return (

    <div className="bg-white rounded-3xl shadow-sm border p-6 hover:shadow-lg transition duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-black mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>

  );

};

export default DashboardCard;