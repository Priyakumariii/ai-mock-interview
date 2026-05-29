function History() {

  const history = JSON.parse(

    localStorage.getItem("history")

  ) || [];

  return (

    <div className="min-h-screen bg-[#f5f5f5] p-10">

      <h1 className="text-5xl font-bold mb-10">

        Interview History 🚀

      </h1>

      {

        history.length === 0 ? (

          <h2 className="text-2xl">

            No Interview History Found

          </h2>

        ) : (

          history.map((item, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg mb-6"
            >

              <h2 className="text-3xl font-bold capitalize">

                {item.field}

              </h2>

              <div className="mt-5 space-y-2">

                <p className="text-xl">

                  Technical Score:
                  {" "}
                  {item.score}

                </p>

                <p className="text-xl">

                  Communication:
                  {" "}
                  {item.communication}

                </p>

                <p className="text-xl">

                  Confidence:
                  {" "}
                  {item.confidence}

                </p>

                <p className="text-gray-500 mt-4">

                  {item.date}

                </p>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default History;