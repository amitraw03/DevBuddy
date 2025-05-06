import React, { useState } from "react";

function Premium() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const silverPrice = billingPeriod === "monthly" ? 99 : 1069;
  const goldPrice = billingPeriod === "monthly" ? 199 : 2149;

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      {/* Guarantee Header */}
      <div className="text-center mb-12">
        <div className="bg-base-100 rounded-full py-3 px-6 inline-flex items-center gap-2 shadow-sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-green-500" 
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
          </svg>
          <strong className="font-semibold">30-Day Money-Back Guarantee</strong>
        </div>
        
        <h1 className="text-5xl font-bold mt-8 mb-4">
          Supercharge Your Dev Career <br className="hidden md:block"/> 
          for <span className="underline decoration-primary">₹99</span>/mo
        </h1>
        
        <p className="text-lg text-base-content/70 mb-8">
          Accelerate your career with <strong>priority visibility</strong>, 
          <strong> premium features</strong>, and <strong>exclusive tools</strong>.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="join bg-base-100 rounded-box shadow-sm">
          <button
            className={`join-item btn ${billingPeriod === "monthly" ? "btn-primary" : ""}`}
            onClick={() => setBillingPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`join-item btn ${billingPeriod === "yearly" ? "btn-primary" : ""}`}
            onClick={() => setBillingPeriod("yearly")}
          >
            Yearly <span className="ml-2 badge badge-success">10% OFF</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Silver Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4">Silver</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹{silverPrice}</span>
              <span className="text-base-content/70 ml-2">
                /{billingPeriod === "monthly" ? "month" : "year"}
                {billingPeriod === "yearly" && (
                  <span className="line-through text-sm ml-2">₹{99*12}</span>
                )}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"/> 
                Unlimited connection requests
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"/>
                Message read receipts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"/>
                Priority profile visibility
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"/>
                Custom developer status
              </li>
            </ul>
            <button className="btn btn-primary w-full">Get Silver</button>
          </div>
        </div>

        {/* Gold Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border-2 border-secondary">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4">Gold</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹{goldPrice}</span>
              <span className="text-base-content/70 ml-2">
                /{billingPeriod === "monthly" ? "month" : "year"}
                {billingPeriod === "yearly" && (
                  <span className="line-through text-sm ml-2">₹{199*12}</span>
                )}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"/> 
                Featured in developer searches
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"/>
                Premium developer matching
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"/>
                Advanced connection filters
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"/>
                Early access to features
              </li>
            </ul>
            <button className="btn btn-secondary w-full">Get Gold</button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center mt-12 text-base-content/70">
        All plans include our 30-day satisfaction guarantee. Cancel anytime.
      </p>
    </div>
  );
}

export default Premium;