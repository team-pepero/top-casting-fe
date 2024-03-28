import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HardBaitImage from "./hardbait2.png";
import SoftBaotImage from "./softbait2.png";
import Metalzig from "./1.png";
import Scartbait from "./3.png";
import Banner from "./4.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
        {
          params: { maincategory: categoryId },
        }
      );
      // 성공적으로 데이터를 받아온 후, 상품 목록 페이지로 네비게이션합니다.
      // 이 때, 상품 데이터를 상태로 전달할 수 있습니다.
      navigate("/itemList", { state: { items: response.data } });
    } catch (error) {
      console.error("카테고리 상품 불러오기 에러", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/itemPage?keyword=${searchKeyword}`);
  };

  return (
    <>
      {/*슬라이드 섹션 start */}
      <div class="2xl:mx-auto 2xl:container mx-4 py-16">
        <div class="w-full relative flex items-center justify-center">
          <img
            src={Banner}
            alt="banner"
            class="w-full h-full absolute z-0 hidden xl:block"
          />
          <img
            src={Banner}
            alt="dining"
            class="w-full h-full absolute z-0 hidden sm:block xl:hidden"
          />
          <img
            src={Banner}
            alt="dining"
            class="w-full h-full absolute z-0 sm:hidden"
          />
          <div class="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
            <h1 class="text-4xl font-semibold leading-9 text-white text-center">
              TOP CASTING에 오신 것을 환영합니다
            </h1>
            <p class="text-base leading-normal text-center text-white mt-6">
              루어, 바다, 중층 등 전문 낚시 전문쇼핑몰 <br />
              궁금한 상품이 있으시다면 검색창에 상품을 검색해 보세요!
            </p>
            <div class="sm:border border-white flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0">
              <input
                type="text"
                class="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white"
                placeholder="찾으시는 상품명을 입력해주세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                onClick={handleSearch}
                class="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 슬라이드 섹션 end , 상품 섹션 start */}
      <div class="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center mx-72">
        <div class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center ">
          <div onClick={() => fetchProductsByCategory(1)}>
            {" "}
            {/* 카테고리 ID 1로 가정 */}
            <img
              class="group-hover:opacity-60 transition duration-500"
              src={HardBaitImage}
              alt="하드베이트"
            />
          </div>
          <div class="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2 ">
            <div>
              <div class="flex flex-col justify-center">
                <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                  Hard Bait
                </h1>
                <p class="text-base lg:text-xl text-gray-800 dark:text-white">
                  Floating, Metal Jig
                </p>
              </div>
            </div>
            <div>
              <p class="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800 dark:text-white"></p>
            </div>
          </div>
          <div class="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2"></div>
          <div class="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </div>

        <div class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center">
          <div onClick={() => fetchProductsByCategory(2)}>
            {" "}
            {/* 카테고리 ID 5로 가정 */}
            <img
              class="group-hover:opacity-60 transition duration-500"
              src={SoftBaotImage}
              alt="소프트베이트"
            />
          </div>
          <div class="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
            <div>
              <div class="flex flex-col justify-center">
                <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                  Soft Bait
                </h1>
                <p class="text-base lg:text-xl text-gray-800 dark:text-white">
                  Shad, Hog
                </p>
              </div>
            </div>
            <div>
              <p class="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800 dark:text-white"></p>
            </div>
          </div>
          <div class="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2"></div>
          <div class="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </div>

        <div class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center">
          <div onClick={() => fetchProductsByCategory(3)}>
            {" "}
            {/* 카테고리 ID 8로 가정 */}
            <img
              class="group-hover:opacity-60 transition duration-500"
              src={Metalzig}
              alt="sofa-4"
            />
          </div>
          <div class="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
            <div>
              <div class="flex flex-col justify-center">
                <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                  Metal Jig
                </h1>
              </div>
            </div>
            <div>
              <p class="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800 dark:text-white"></p>
            </div>
          </div>
          <div class="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2"></div>
          <div class="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </div>

        <div class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center">
          <div onClick={() => fetchProductsByCategory(4)}>
            <img
              class="group-hover:opacity-60 transition duration-500"
              src={Scartbait}
              alt="sofa-5"
            />
          </div>
          <div class="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
            <div>
              <div class="flex flex-col justify-center">
                <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                  Skirt Bait
                </h1>
                <p class="text-base lg:text-xl text-gray-800 dark:text-white">
                  Spinner Bait, spinner
                </p>
              </div>
            </div>
            <div>
              <p class="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800 dark:text-white"></p>
            </div>
          </div>
          <div class="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2"></div>
          <div class="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div class="absolute top-4 right-6"></div>
        </div>
      </div>
      {/* 페이지 */}
      <div class="flex justify-end items-end mt-12">
        <div class="flex flex-row items-center justify-center space-x-8">
          <button class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800">
            <p>1</p>
          </button>
          <button class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800">
            <p>2</p>
          </button>
          <button class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800">
            <p>3</p>
          </button>
          <button class="flex justify-center items-center">
            <svg
              class="dark:text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
