"use client"; // Indique que ce composant doit être rendu côté client

import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("repayment");

  const handleCalculate = () => {
    // Logique pour calculer les remboursements ici
    console.log("Calculating repayments...");
    console.log("Mortgage Amount:", mortgageAmount);
    console.log("Mortgage Term:", mortgageTerm);
    console.log("Interest Rate:", interestRate);
    console.log("Mortgage Type:", mortgageType);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-row">
        {" "}
        {/* Espace supprimé ici */}
        <div className="bg-white w-[28rem] h-[32rem] rounded-tl-[1rem] rounded-bl-[1rem] p-6 flex flex-col justify-center items-center">
          <div className="flex justify-between items-center mb-4 w-full">
            <h1 className="font-bold text-xl">Mortgage Calculator</h1>
            <p className="underline text-xs cursor-pointer">Clear All</p>
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="mortgage-amount"
            >
              Mortgage Amount
            </label>
            <input
              id="mortgage-amount"
              type="number"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex mb-4 w-full">
            <div className="w-full mr-2">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="mortgage-term"
              >
                Mortgage Term (Years)
              </label>
              <input
                id="mortgage-term"
                type="number"
                value={mortgageTerm}
                onChange={(e) => setMortgageTerm(e.target.value)}
                placeholder="Enter term in years"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Mortgage Term in years"
              />
            </div>

            <div className="w-full ml-2">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="interest-rate"
              >
                Interest Rate (%)
              </label>
              <input
                id="interest-rate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Interest Rate in percentage"
              />
            </div>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-1">Mortgage Type</label>
            <div className="flex flex-col items-start space-y-3">
              <div className="border w-full px-3 py-2 rounded-md border-slate-200 flex items-center">
                <input
                  type="radio"
                  id="repayment"
                  name="mortgage-type"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="repayment" className="mr-4">
                  Repayment
                </label>
              </div>

              <div className="border w-full px-3 py-2 rounded-md border-slate-200 flex items-center">
                <input
                  type="radio"
                  id="interest-only"
                  name="mortgage-type"
                  value="interest-only"
                  checked={mortgageType === "interest-only"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="interest-only">Interest Only</label>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="rounded-full bg-teal-500 text-white p-2 font-bold hover:bg-teal-600 transition duration-200 text-xs px-5"
          >
            Calculate Repayments
          </button>
        </div>
        <div className="bg-[#122E3F] text-center w-[29rem] text-white rounded-bl-[6rem] rounded-tr-[1rem] rounded-br-[1rem] p-6 flex flex-col justify-center items-center">
          <Image
            className="object-cover w-4/12 mx-auto mt-1"
            src={`/illustration-empty.png`}
            alt="photo profil"
            width={900}
            height={900}
            priority
          />
          <h2 className="font-bold text-xl mb-3 mt-4">Results shown here</h2>
          <p className="text-[0.9rem]">
            {`Complete the form and click "calculate repayments" to`}
            <br />
            see what your monthly repayments would be.
          </p>
        </div>
      </div>
    </main>
  );
}
