"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PiCalculatorFill } from "react-icons/pi";

export default function Page() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("repayment");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [teamClicked, setTeamClicked] = useState(false);
  const [showResult, setShowResult] = useState(false); // État pour contrôler l'affichage du résultat

  const handleCalculate = () => {
    setError("");
    const amount = parseFloat(mortgageAmount);
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate);

    if (!amount || !term || !rate || amount <= 0 || term <= 0 || rate <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      setShowResult(false); // Masquer le résultat si une erreur est présente
      return;
    }

    let monthlyRepayment;
    if (mortgageType === "repayment") {
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;
      monthlyRepayment =
        (amount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    } else {
      monthlyRepayment = (amount * (rate / 100)) / 12;
    }

    setResult(`Monthly Repayment: $${monthlyRepayment.toFixed(2)}`);
    setShowResult(true); // Afficher le résultat après le calcul
  };

  // Handle clear action
  const handleClear = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("repayment");
    setResult("");
    setError("");
    setTeamClicked(false);
    setShowResult(false); // Masquer le résultat lors de la réinitialisation
  };

  // Handle team button click
  const handleTeamClick = () => {
    setTeamClicked(!teamClicked);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-row">
        {/* Calculator Form */}
        <div className="bg-white w-[28rem] h-[32rem] rounded-tl-[1rem] rounded-bl-[1rem] p-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-4 w-full">
            <h1 className="font-bold text-xl">Mortgage Calculator</h1>
            <p
              onClick={handleClear}
              className="underline text-xs cursor-pointer"
            >
              Clear All
            </p>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Mortgage Amount Input */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 mb-1 text-xs"
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
              aria-describedby="mortgage-amount-description"
            />
          </div>

          {/* Mortgage Term and Interest Rate Inputs */}
          <div className="flex mb-4 w-full">
            <div className="w-full mr-2">
              <label
                className="block text-gray-700 mb-1 text-xs"
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
                aria-describedby="mortgage-term-description"
              />
            </div>

            <div className="w-full ml-2">
              <label
                className="block text-gray-700 mb-1 text-xs"
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
                aria-describedby="interest-rate-description"
              />
            </div>
          </div>

          {/* Mortgage Type Selection */}
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-1 text-xs">
              Mortgage Type
            </label>
            <div className="flex flex-col items-start space-y-3">
              <label className="border w-full cursor-pointer px-3 py-2 rounded-md border-slate-200 flex items-center">
                <input
                  type="radio"
                  id="repayment"
                  name="mortgage-type"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                <span className="mr-4 font-[500] text-base">Repayment</span>
              </label>

              <label className="border cursor-pointer w-full px-3 py-2 rounded-md border-slate-200 flex items-center">
                <input
                  type="radio"
                  id="interest-only"
                  name="mortgage-type"
                  value="interest-only"
                  checked={mortgageType === "interest-only"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                <span className="mr-4 font-[500] text-sm">Interest Only</span>
              </label>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="rounded-full w-52 h-8 bg-[#dfe787] text-slate-700 p-2 font-bold hover:bg-teal-600 transition duration-200 text-xs px-5 mt-5 flex items-center"
            aria-live="assertive"
          >
            <PiCalculatorFill className="text-lg mr-2" />
            Calculate Repayments
          </button>

          {/* Result Display */}
          {result && (
            <div className="mt-4 text-green-500" role="alert">
              <p>{result}</p>
            </div>
          )}
        </div>

        <div className="bg-[#122E3F] text-center w-[29rem] text-white rounded-bl-[6rem] rounded-tr-[1rem] rounded-br-[1rem] p-6 flex flex-col justify-center items-center">
          <Image
            className="object-cover w-4/12 mx-auto mt-1"
            src={`/illustration-empty.png`}
            alt="illustration"
            width={900}
            height={900}
            priority
          />
          <h2 className="font-bold text-xl mb-3 mt-4">Results shown here</h2>
          <p className="text-[0.9rem]">
            {`Complete the form and click "calculate repayments" to see what your
            monthly repayments would be. `}
          </p>

          {showResult &&
            result && ( // Afficher le résultat uniquement si showResult est vrai
              <div className="mt-4 text-green-500" role="alert">
                <p>Your results</p>
                <p>{result}</p>
              </div>
            )}

          <button
            onClick={handleTeamClick}
            className={`mt-4 px-4 py-2 rounded-md ${
              teamClicked ? "bg-green-500" : "bg-blue-500"
            } text-white`}
          >
            Mortgage Team
          </button>
        </div>
      </div>
    </main>
  );
}
