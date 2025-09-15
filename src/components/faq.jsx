"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleFAQ = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mb-32">
      <div className="py-24 px-12 max-w-7xl max-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">
            Insurance FAQ
          </p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>
        <ul className="basis-1/2">
          {faqItems.map((item, index) => (
            <li key={index}>
              <button
                className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                aria-expanded={expandedItems.includes(index)}
                onClick={() => toggleFAQ(index)}>
                <span className="flex-1 text-base-content">
                  {item.question}
                </span>
                <svg
                  className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transform transition-transform duration-200 ease-out ${
                    expandedItems.includes(index) ? "rotate-90" : ""
                  }`}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect y="7" width="16" height="2" rx="1"></rect>
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="transform origin-center rotate-90"></rect>
                </svg>
              </button>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  expandedItems.includes(index) ? "max-h-screen" : "max-h-0"
                }`}
                style={{
                  maxHeight: expandedItems.includes(index)
                    ? `${item.answer.length * 2}px`
                    : "0",
                }}>
                <div className="pb-5 leading-relaxed">
                  <div className="space-y-2 leading-relaxed">{item.answer}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "What is Tutor Plans?",
    answer:
      "Tutor Plans is an online platform that connects students with mentors who offer a wide range of skill-enhancing courses. It allows students to learn from their favorite mentors and for mentors to upload and share their expertise through comprehensive courses.",
  },
  {
    question: "How do I sign up for Tutor Plans?",
    answer:
      " Signing up for Tutor Plans is easy. Simply click on the 'Sign Up' button on the homepage, fill in your details, and follow the instructions to create your account. You can then browse courses and enroll in the ones that interest you.",
  },
  {
    question: "What types of courses are available on Tutor Plans?",
    answer:
      "Tutor Plans offers a diverse selection of courses across various subjects and skill levels. Whether you're looking to learn a new language, develop technical skills, enhance your career, or explore a hobby, there's something for everyone.",
  },
  {
    question: " How can I enroll in a course?",
    answer:
      "To enroll in a course, log in to your Tutor Plans account, browse the course catalog, and click on the course you wish to join. Follow the enrollment instructions, and you'll be able to access the course materials and start learning immediately.",
  },
  {
    question: " Do I receive a certificate after completing a course?",
    answer:
      "Yes, upon successfully completing a course, you will receive a certificate of completion. This certificate can be downloaded and shared to showcase your newly acquired skills and knowledge.",
  },
];

export default FAQ;
