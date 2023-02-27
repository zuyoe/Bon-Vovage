import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import MyPageLayOut from "../../Layout/MyPageLayOut";
import instance from "../../api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScheduleCard from "./ScheduleCard";

const MySchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user);

  const getWishList = async () => {
    await instance
      .get("/api/travel/member/like", {
        params: {
          miseq: user.miSeq,
        },
      })
      .then((res) => setWishList(res.data));
  };

  const getSchedule = async () => {
    await instance
      .get("/api/schedule/member/list", {
        params: {
          miseq: user.miSeq,
        },
      })
      .then((res) => {
        setSchedule(res.data);
      });
  };

  const getPlaceList = async () => {
    await instance
      .get("/api/zone/allcate")
      .then((res) => setPlaceList(res.data.list));
  };
  useEffect(() => {
    getWishList();
    getPlaceList();
  }, []);
  useEffect(() => {
    getSchedule();
  }, [count]);

  console.log(placeList);
  console.log(schedule);

  return (
    <MyPageLayOut title={"나의 일정"}>
      <section className="border rounded-xl p-9 pt-0 accent-[#424242] flex-col">
        {/* 일정카드 */}
        {schedule.map((list) => (
          <ScheduleCard
            list={list}
            key={list.tsSeq}
            placeList={placeList}
            setCount={setCount}
          />
        ))}
      </section>
      {/* 찜목록 */}
      <div className="flex items-center gap-1 text-xl mt-20 mb-8">
        <FiHeart size={24} />
        <h3 className="font-bold">내가 좋아하는 여행지</h3>
      </div>
      {/* 카드리스트 */}
      <div className="grid grid-cols-4 gap-4 mb-16">
        {wishList.map((list) => (
          <section
            className="shadow rounded-lg overflow-hidden flex flex-col"
            key={list.tlSeq}
          >
            <img
              src={list.place.tpImage}
              className="flex-1 max-h-[147px]"
              alt={list.place.tpName}
            />
            <p className="text-end p-2.5 truncate">{list.place.tpName}</p>
          </section>
        ))}
      </div>
    </MyPageLayOut>
  );
};

export default MySchedule;
