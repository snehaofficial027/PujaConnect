import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";
import { getPanditReviews } from "../../api/reviewApi";

const PanditReviews = () => {
  const pandit =
    JSON.parse(localStorage.getItem("pandit")) || {};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [breakdown, setBreakdown] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await getPanditReviews(
        pandit._id || pandit.id
      );

      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || 0);
      setTotalReviews(res.data.totalReviews || 0);
      setBreakdown(res.data.breakdown || {});
    } catch (err) {
      console.log(err);
    }
  };

  const filteredReviews = useMemo(() => {
    let data = [...reviews];

    if (search.trim()) {
      data = data.filter((r) =>
        r.userName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sort === "highest") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (sort === "lowest") {
      data.sort((a, b) => a.rating - b.rating);
    } else {
      data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return data;
  }, [reviews, search, sort]);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <PanditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">

        <PanditTopbar
          pandit={pandit}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-8">

          <h1 className="text-4xl font-black">
            Reviews & Ratings
          </h1>

          <p className="text-gray-500 mt-2">
            See what devotees say about you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="bg-white rounded-3xl shadow border p-6">

              <h2 className="font-bold text-xl">
                Average Rating
              </h2>

              <div className="flex items-center gap-3 mt-4">

                <Star
                  className="text-yellow-500"
                  fill="orange"
                />

                <span className="text-5xl font-black">
                  {averageRating}
                </span>

              </div>

              <p className="mt-3 text-gray-500">
                {totalReviews} Reviews
              </p>

            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl shadow border p-6">

  {[5,4,3,2,1].map((n)=>{

    const total = totalReviews || 1;

    const percent =
      ((breakdown[n] || 0) / total) * 100;

    return(

      <div
        key={n}
        className="flex items-center gap-4 mb-4"
      >

        <div className="w-12 font-semibold">
          {n} ⭐
        </div>

        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-yellow-400 rounded-full"
            style={{
              width:`${percent}%`,
            }}
          />

        </div>

        <div className="w-8 text-right font-bold">
          {breakdown[n] || 0}
        </div>

      </div>

    )

  })}

</div>

          </div>

          <div className="flex items-center gap-4 mt-8">

  <div className="flex-1">

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search User..."
    className="w-full h-14 px-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
  />

</div>

  </div>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="h-14 min-w-[170px] rounded-xl border border-gray-300 bg-white px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
  >
    <option value="newest">Newest</option>
    <option value="highest">Highest Rating</option>
    <option value="lowest">Lowest Rating</option>
  </select>

</div>

          <div className="space-y-5 mt-8">

            {filteredReviews.map((item)=>(
              <div
                key={item._id}
                className="bg-white rounded-3xl border shadow-sm p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.userName}
                    </h3>

                    <div className="flex mt-2">

                      {[1,2,3,4,5].map((s)=>(
                        <Star
                          key={s}
                          size={18}
                          fill={
                            s<=item.rating
                              ? "orange"
                              : "white"
                          }
                          color="orange"
                        />
                      ))}

                    </div>

                  </div>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.review}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
  );
};

export default PanditReviews;