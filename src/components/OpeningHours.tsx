import { displayOpen } from "@/types/Opentype";

const OpeningHours = ({ display }: { display: displayOpen[] }) => {
  return (
    <>
      <div className=" p-4 min-w-[500px]">
        <h2 className="text-2xl font-bold mb-2">Opening hours</h2>
        <p className="italic pb-2">
          The cinema closes 15 minutes after the screening
        </p>

        <div className="grid grid-cols-3 font-bold">
          <p className="col-start-1 text-xl underline">Weekday</p>
          <p className="col-start-2 text-xl underline">Date</p>
          <p className="col-start-3 text-xl underline">Opening hours</p>
        </div>

        <ul className="">
          {display.map((show, index) => {
            return (
              <li key={index} className="p-1  grid grid-cols-3">
                <span className="col-start-1">{show.day} </span>{" "}
                <span className="col-start-2">{show.date}</span>
                <span className="col-start-3">{show.hours}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default OpeningHours;
