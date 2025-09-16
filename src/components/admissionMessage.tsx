"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import earthImg from "../assets/custom-image/earthImg.png";
import starImg from "../assets/custom-image/starImg.png";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  courseName: string;
  message: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AdmissionMessage = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact/admissionMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(`Message sent successfully`, {
          position: "top-right",
          duration: 1500,
          style: {
            backgroundColor: "rgba(124, 255, 100)",
            color: "#fff",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "5px",
          },
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          courseName: "",
          message: "",
        });
      } else {
        toast.error(
          `Failed to send message: ${result.error || "Unknown error"}`,
          {
            position: "top-right",
            duration: 1500,
            style: {
              backgroundColor: "rgba(255, 112, 100 )",
              color: "#fff",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "5px",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 120,
    hours: 2,
    minutes: 1,
    seconds: 10,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="w-full container grid md:grid-cols-2 gap-8 relative">
        {/* Background images */}
        <div className="absolute lg:-right-36 top-10 translate-y-1/4 text-purple-200 opacity-70">
          <img
            className="w-28 h-28"
            src={earthImg}
            width={300}
            height={300}
            alt=""
          />
        </div>
        <div className="absolute left-20 -top-10 translate-y-1/4 text-purple-200 opacity-70">
          <img
            className="w-12 h-12"
            src={starImg}
            width={300}
            height={300}
            alt=""
          />
        </div>
        <div className="absolute lg:-right-20 bottom-10 translate-y-1/4 text-purple-200 opacity-70">
          <img
            className="w-12 h-12"
            src={starImg}
            width={300}
            height={300}
            alt=""
          />
        </div>

        {/* Left side */}
        <div className="flex flex-col justify-center">
          <h5 className="text-sm bg-white w-fit px-5 py-1 text-[--primary] uppercase rounded-full mb-2">
            Contact with us
          </h5>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Contact Now Get Premium Online Admission
          </h1>
          <p className="text-slate-600 mb-8">
            Unlock exclusive access to our Premium Online Admission service,
            designed to make your application process fast and effortless. With
            priority processing, personalized support, and easy access to all
            the resources you need, applying for your desired course has never
            been simpler.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <div className="bg-purple-100 rounded-md p-4 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-slate-800">
                    {item.value}
                  </span>
                </div>
                <div className="bg-slate-800 text-white text-xs text-center py-1 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side form */}
        <div className="flex flex-col justify-center">
          <div className="bg-purple-100 rounded-lg p-6 md:p-8 relative">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Contact For Premium Resources
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                onChange={handleChange}
                type="text"
                name="name"
                value={form.name}
                placeholder="Your Name"
                className="bg-white border-0"
              />
              <Input
                onChange={handleChange}
                type="email"
                name="email"
                value={form.email}
                placeholder="Your Email"
                className="bg-white border-0"
              />
              <Input
                onChange={handleChange}
                type="tel"
                name="phone"
                value={form.phone}
                placeholder="Phone"
                className="bg-white border-0"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="courseName"
                value={form.courseName}
                placeholder="Course Name"
                className="bg-white border-0"
              />
              <Textarea
                onChange={handleChange}
                name="message"
                value={form.message}
                placeholder="Message (Optional)"
                className="bg-white border-0 min-h-[100px]"
              />
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6"
              >
                SUBMIT NOW
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionMessage;
