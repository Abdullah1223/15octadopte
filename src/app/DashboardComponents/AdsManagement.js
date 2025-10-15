"use client";
import React, { useState, useRef } from "react";
import AdManagementJobTab from "./AdsManagementJobTab";
import AdsManagementBannerTab from "./AdsManagementBannerTab";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import Toast from "../Components/Toast";
import LoadingSpinner from "../Components/LoadingSpinner";
import PaymentConfirmationDialog from "../Components/PaymentConfimationBox";
const stripePromise = loadStripe(
  "pk_test_51Qxa80A06SnHPm61sgE67UW9CnfKl4NIZ67AA46kbk63VaI9NfV1D363UWWAcQdRaZucYsPt8R03Ob0wF7PSkjl3001GBq3hDq"
);

const AdManagementSystem = ({bannerAds}) => {
  const [activeTab, setActiveTab] = useState("banner");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [durationType, setDurationType] = useState("");
  const [duration, setDuration] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastData, setToastData] = useState();
  const [toastType, setToastType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log('adsmanagersystem' , bannerAds)

  const LoadingSpinnerDialog = () => {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <LoadingSpinner size={50}></LoadingSpinner>
          </div>
        </div>
      </div>
    );
  };

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0f172a",
        colorBackground: "#ffffff",
        colorText: "#1e293b",
        colorDanger: "#dc2626",
        fontFamily: "Inter, system-ui, sans-serif",
        spacingUnit: "6px",
        borderRadius: "12px",
      },
      rules: {
        ".Input": {
          border: "2px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        ".Input:focus": {
          border: "2px solid #0f172a",
          boxShadow: "0 0 0 3px rgb(15 23 42 / 0.1)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {isLoading ? <LoadingSpinnerDialog></LoadingSpinnerDialog> : null}
      {isToastOpen ? (
        <Toast
          type={toastType}
          message={toastData}
          isVisible={isToastOpen}
          onClose={() => setIsToastOpen(false)}
        ></Toast>
      ) : null}
      {isOpen ? (
        <PaymentConfirmationDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            setIsOpen(false);
            setIsPaid(true);
          }}
          amount={amount}
          duration={duration}
          durationType={durationType}
          clientSecret={clientSecret}
        ></PaymentConfirmationDialog>
      ) : null}

      {isPaid ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            setIsPaid={setIsPaid}
            setIsToastOpen={setIsToastOpen}
            setToastData={setToastData}
            setToastType={setToastType}
          />
        </Elements>
      ) : null}

      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Advertisement Management</h1>
              <p className="text-slate-600 text-lg mt-1">Manage and optimize your advertising campaigns</p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-slate-200 bg-slate-50/50">
            <div className="px-8 py-6">
              <nav className="flex space-x-1 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("banner")}
                  className={`flex-1 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === "banner"
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Banner Advertisements
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`flex-1 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === "jobs"
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Job Advertisements
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "banner" && (
              <AdsManagementBannerTab
                setIsToastOpen={setIsToastOpen}
                setToastType={setToastType}
                setToastData={setToastData}
                setIsOpen={setIsOpen}
                setAmount={setAmount}
                setDurationType={setDurationType}
                setDuration={setDuration}
                setClientSecret={setClientSecret}
                setIsLoading={setIsLoading}
                bannerAdsProp={bannerAds}
              ></AdsManagementBannerTab>
            )}

            {activeTab === "jobs" && <AdManagementJobTab
              setIsToastOpen={setIsToastOpen}
              setToastType={setToastType}
              setToastData={setToastData}
              setIsOpen={setIsOpen}
              setAmount={setAmount}
              setDurationType={setDurationType}
              setDuration={setDuration}
              setClientSecret={setClientSecret}
              setIsLoading={setIsLoading}
            ></AdManagementJobTab>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdManagementSystem;
