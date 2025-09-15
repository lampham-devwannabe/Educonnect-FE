import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Dot, DotIcon } from "lucide-react";
import efty1 from "../../public/assets/custom-image/Eftyoffice.jpg";
import subscribeImg1 from "../../public/assets/custom-image/bronze1.png";
import subscribeImg2 from "../../public/assets/custom-image/gold2.png";
import subscribeImg3 from "../../public/assets/custom-image/silver3.png";

import Image from "next/image";
import Link from "next/link";

const Subscribe = () => {

  return (
    <div className="container mx-auto px-8 py-8 ">
      <div className="flex justify-center text-center  lg:pt-10 pt-0 pb-10">
        <div>
          <h1 className="font-bold text-3xl lg:text-4xl text-primary">Subscribe Now!</h1>
          <h5 className="text-lg mt-2  text-gray-600">
            Choose a subscription plan and save money!
          </h5>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="w-full rounded-2xl overflow-hidden text-center  transition-all duration-300 hover:shadow-xl hover:scale-95">
          <Link href="">
            <CardHeader className=" items-center mt-3">
              <Image
                src={subscribeImg1}
                alt=""
                className=" w-28 object-cover rounded-tl-2xl rounded-tr-2xl"
              />
            </CardHeader>
            <CardContent className="mt-3 pb-2 px-5">
              <h3 className="text-3xl lg:text-4xl font-bold text-primary uppercase truncate">
                Bronge
              </h3>
              <div className="mt-4">
                <h3 className="text-xl">For Personal</h3>
              </div>
              <h4 className=" items-center text-5xl mt-4 text-cyan-400 font-bold">
                $29
              </h4>
              <div className=" mt-8 text-center text-gray-600 ">
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  15 days of subscription
                </h5>
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  100 subscribes
                </h5>
              </div>
              <button className=" w-full text-2xl py-1 mt-4 mb-4 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                Purchases
              </button>
            </CardContent>
          </Link>
        </Card>
        <Card className="w-full rounded-2xl overflow-hidden text-center  transition-all duration-300 hover:shadow-xl hover:scale-95">
          <Link href="">
            <CardHeader className=" items-center mt-3">
              <Image
                src={subscribeImg2}
                alt=""
                className=" w-28 object-cover rounded-tl-2xl rounded-tr-2xl"
              />
            </CardHeader>
            <CardContent className="mt-3 pb-2 px-5">
              <h3 className="text-3xl lg:text-4xl font-bold text-primary uppercase truncate">
                Gold
              </h3>
              <div className="mt-4">
                <h3 className="text-xl">For Personal</h3>
              </div>
              <h4 className=" items-center text-5xl mt-4 text-cyan-400 font-bold">
                $49
              </h4>
              <div className=" mt-8 text-center text-gray-600 ">
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  15 days of subscription
                </h5>
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  100 subscribes
                </h5>
              </div>
              <button className=" w-full text-2xl py-1 mt-4 mb-4 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                Purchases
              </button>
            </CardContent>
          </Link>
        </Card>
        <Card className="w-full rounded-2xl overflow-hidden text-center  transition-all duration-300 hover:shadow-xl hover:scale-95">
          <Link href="">
            <CardHeader className=" items-center mt-3">
              <Image
                src={subscribeImg3}
                alt=""
                className=" w-28 object-cover rounded-tl-2xl rounded-tr-2xl"
              />
            </CardHeader>
            <CardContent className="mt-3 pb-2 px-5">
              <h3 className="text-3xl lg:text-4xl font-bold text-primary uppercase truncate">
                Silver
              </h3>
              <div className="mt-4">
                <h3 className="text-xl">For Personal</h3>
              </div>
              <h4 className=" items-center text-5xl mt-4 text-cyan-400 font-bold">
                $39
              </h4>
              <div className=" mt-8 text-center text-gray-600 ">
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  15 days of subscription
                </h5>
                <h5 className="flex items-center text-xl font-semibold">
                  <span className="">
                    <DotIcon className="w-8"></DotIcon>
                  </span>{" "}
                  100 subscribes
                </h5>
              </div>
              <button className=" w-full text-2xl py-1 mt-4 mb-4 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                Purchases
              </button>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Subscribe;
